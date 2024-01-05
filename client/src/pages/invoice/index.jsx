import { useState } from "react";
import "./invoice.scss";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import { copyText } from "../../components/utils";
import { useNavigate } from "react-router-dom";

export default function Invoice() {
  const navigate = useNavigate();
  const cartDB = JSON.parse(localStorage.getItem("cart")) || [];
  const priceDB = JSON.parse(sessionStorage.getItem("prices")) || [];
  const [loading, setLoading] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [tip, setTip] = useState(false);
  const [showMethod, setShowMethod] = useState(false);
  const [link, setLink] = useState();
  const [completed, setCompleted] = useState();

  useEffect(() => {
    setTimeout(() => {
      setShowBtn(true);
    }, 1200);
  }, [showBtn]);

  useEffect(() => {
    if (link) {
      setCompleted(true);
      setTimeout(() => {
        window.open(link, "_blank");
      }, 100);
    }
  }, [link]);

  // useEffect(() => {
  //   if (completed) {
  //     setTimeout(() => {
  //     }, 10000);
  //   }
  // }, [completed]);

  // useEffect(() => {
  //   console.log(imageURL);
  //   // if (/WhatsApp/i.test(navigator.userAgent) && imageURL !== "") {
  //   //   // Create a shareable link
  //   //   const shareLink = document.createElement("a");
  //   //   shareLink.href = imageURL;
  //   //   shareLink.download = "screenshot.png";
  //   //   shareLink.click();
  //   // } else {
  //   //   alert(
  //   //     "WhatsApp is not detected on this device. Please share the image manually."
  //   //   );
  //   // }

  //   if (imageURL !== "") {
  //     //   const whatsappLink = `https://wa.me/?text=Check%20out%20this%20image!%20${encodeURIComponent(imageURL)}`;
  //     //   window.open(whatsappLink, "_blank");
  //   }
  // }, [imageURL]);

  if (priceDB && !loading) {
    const total = priceDB.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return (
      <div className="invoice-container">
        {link && (
          <div className="invoice-loader-spin">
            <div className="purchase-completed">
              <div className="purchase-completed-icon">
                <i class="fa-solid fa-circle-check fa-bounce"></i>
              </div>
              <div className="purchase-completed-title">
                Your purchase order was successful
              </div>
              <div
                className="purchase-completed-body"
                onClick={() => window.location.replace("/")}
              >
                Click to return home
              </div>
            </div>
          </div>
        )}
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
            {cartDB.map(
              (data, i) =>
                total !== 0 && (
                  <InvoiceItems
                    name={data.name}
                    qty={priceDB[i] / data.price}
                    price={Number(data.price)}
                  />
                )
            )}
          </div>
        </div>
        <div className="invoice-line" />
        <div className="invoice-total">
          <span>Grand Total</span>
          <span>{"NGN " + parseFloat(total.toFixed(2)).toLocaleString()}</span>
        </div>
      </div>
    );
  } else if (priceDB.length > 0) {
    const proceed = () => {
      // setLoading(false);
      // setTimeout(() => {
      //   capture();
      // }, 1000);
      setShowMethod(true);
    };

    const share = (url, type) => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const msg = `I've placed an order and would like to inquire about its status. Here's the link to the purchase order details: ${url}. Thank you.`;
      if (type === "whatsapp") {
        if (isMobile) {
          setLink(
            `https://wa.me/+2348179835234?text=${encodeURIComponent(msg)}`
          );
          // window.open(
          //   `https://wa.me/+2348179835234?text=${encodeURIComponent(msg)}`,
          //   "_blank"
          // );
        } else {
          setLink(
            `https://web.whatsapp.com/send?phone=+2348179835234&text=${encodeURIComponent(
              msg
            )}`
          );
          // window.open(
          //   `https://web.whatsapp.com/send?phone=+2348179835234&text=${encodeURIComponent(
          //     msg
          //   )}`,
          //   "_blank"
          // );
        }
      } else if (type === "mail") {
        const emailAddress = "recipient@example.com";
        const subject = "E-Vendor Purchase Order";
        // window.open(
        //   `mailto:${emailAddress}?subject=${encodeURIComponent(
        //     subject
        //   )}&body=${encodeURIComponent(msg)}`,
        //   "_blank"
        // );
        setLink(
          `mailto:${emailAddress}?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(msg)}`
        );
      } else {
        copyText(msg);
        const pageUsername = "chelsea-lives-core";
        // window.open(`https://m.me/${pageUsername}`, "_blank");
        setLink(`https://m.me/${pageUsername}`);
      }
    };

    const capture = (type) => {
      setLoading(false);
      setTimeout(async () => {
        try {
          // Get the target HTML element
          const targetElement =
            document.querySelectorAll(".invoice-container")[0];
          // Use html2canvas to capture the target element as a base64 PNG image
          const canvas = await html2canvas(targetElement);
          const base64ImageData = canvas.toDataURL("image/png");
          // Convert base64 data to a Blob
          const imageDataBlob = dataURItoBlob(base64ImageData);
          // Create a FormData object to send the image
          const formData = new FormData();
          formData.append("image", imageDataBlob);
          // Make a POST request to ImgBB API using Axios
          const response = await axios.post(
            "https://api.imgbb.com/1/upload?key=3f631e771032d54699c80ad7d5a18520",
            formData
          );
          const { url } = response.data.data;
          setImageURL(url);
          share(url, type);
          console.log("Image uploaded. URL:", url);
          sessionStorage.setItem("prices", JSON.stringify([]));
          localStorage.setItem("cart", JSON.stringify([]));
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }, 1000);
    };

    // Convert data URI to Blob
    const dataURItoBlob = (dataURI) => {
      const byteString = atob(dataURI.split(",")[1]);
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    };
    return (
      <>
        {!showMethod && (
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
        )}
        {showMethod && (
          <div className="invoice-method">
            <div className="invoice-method-title">
              How do you want to place order?
            </div>
            <div
              className="invoice-method-type"
              onMouseOut={() => setTip(false)}
            >
              <span>
                <i
                  class="fa-brands fa-whatsapp"
                  onMouseEnter={(e) =>
                    setTip([
                      "Ensure you have WhatsApp Web if you're on pc else install Whatsapp App for mobile",
                      e.currentTarget.getBoundingClientRect().left,
                      e.currentTarget.getBoundingClientRect().top,
                    ])
                  }
                  onClick={() => capture("whatsapp")}
                ></i>
              </span>
              <span>
                <i
                  class="fa-regular fa-envelope"
                  onMouseEnter={(e) =>
                    setTip([
                      "Ensure you have a valid email address or create one at gmail.com",
                      e.currentTarget.getBoundingClientRect().left,
                      e.currentTarget.getBoundingClientRect().top,
                    ])
                  }
                  onClick={() => capture("mail")}
                ></i>
              </span>
              <span>
                <i
                  class="fa-brands fa-facebook-messenger"
                  onMouseEnter={(e) =>
                    setTip([
                      "Ensure you have Messenger account or visit messenger.com then paste the message that will be copied and send to the page",
                      e.currentTarget.getBoundingClientRect().left,
                      e.currentTarget.getBoundingClientRect().top,
                    ])
                  }
                  onClick={() => capture("messenger")}
                ></i>
              </span>
            </div>
            {tip && (
              <div
                className="invoice-method-tip"
                style={{ left: tip[1] - 80, top: tip[2] + 55 }}
              >
                {tip[0]}
              </div>
            )}
          </div>
        )}
      </>
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
