import { useState } from "react";
import "./invoice.scss";
import { useEffect } from "react";
import html2canvas from "html2canvas";
export default function Invoice() {
  const cartDB = JSON.parse(localStorage.getItem("cart")) || [];
  const priceDB = JSON.parse(sessionStorage.getItem("prices")) || [];
  const [loading, setLoading] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowBtn(true);
    }, 1200);
  }, [showBtn]);

  useEffect(() => {
    console.log(imageURL);
    // if (/WhatsApp/i.test(navigator.userAgent) && imageURL !== "") {
    //   // Create a shareable link
    //   const shareLink = document.createElement("a");
    //   shareLink.href = imageURL;
    //   shareLink.download = "screenshot.png";
    //   shareLink.click();
    // } else {
    //   alert(
    //     "WhatsApp is not detected on this device. Please share the image manually."
    //   );
    // }

    if (imageURL !== "") {
    //   const whatsappLink = `https://wa.me/?text=Check%20out%20this%20image!%20${encodeURIComponent(imageURL)}`;
    //   window.open(whatsappLink, "_blank");
    }
  }, [imageURL]);

  if (priceDB && !loading) {
    const total = priceDB.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return (
      <div className="invoice-container">
        <div className="invoice-head">
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="" />
        </div>
        <h1 className="invoice-title">Purchase Order</h1>
        <div className="invoice-line" />
        <div className="invoice-table">
          <div className="invoice-table-head">
            <div>Name</div>
            <div>Price (NGN)</div>
            <div>Qty</div>
            <div>Total (NGN)</div>
          </div>
          <div className="invoice-line invoice-table-line" />
          <div className="invoice-items">
            {cartDB.map((data, i) => (
              <InvoiceItems
                name={data.name}
                qty={priceDB[i] / data.price}
                price={Number(data.price)}
              />
            ))}
          </div>
        </div>
        <div className="invoice-line" />
        <div className="invoice-total">
          <span>Grand Total</span>
          <span>{"NGN " + parseFloat(total.toFixed(2)).toLocaleString()}</span>
        </div>
      </div>
    );
  } else {
    const proceed = () => {
      setLoading(false);
      setTimeout(() => {
        capture();
      }, 2000);
    };

    const capture = () => {
      const elementToCapture =
        document.querySelectorAll(".invoice-container")[0];
      html2canvas(elementToCapture).then((canvas) => {
        const dataUrl = canvas.toDataURL();
        setImageURL(dataUrl);
      });
    };
    return (
      <div className="invoice-loader">
        <img src={process.env.PUBLIC_URL + "/logo.png"} alt="" />
        <div
          onClick={proceed}
          className="invoice-loader-btn"
          id={showBtn && "show-btn"}
        >
          Proceed
        </div>
      </div>
    );
  }
}

export function InvoiceItems({ name, price, qty }) {
  return (
    <>
      <div className="invoice-items-container">
        <div className="invoice-items-name">{name || "Product Name"}</div>
        <div className="invoice-items-price">
          {parseFloat((price || 0).toFixed(2)).toLocaleString()}
        </div>
        <div className="invoice-items-qty">{parseInt(qty) || 1}</div>
        <div className="invoice-items-total">
          {parseFloat((price * (qty || 1)).toFixed(2)).toLocaleString()}
        </div>
      </div>
      <div className="invoice-line invoice-table-line invoice-items-line" />
    </>
  );
}
