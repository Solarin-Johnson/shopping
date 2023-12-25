import "./invoice.scss";
export default function Invoice() {
  return (
    <div className="invoice-container">
      <div className="invoice-head"></div>
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
          <InvoiceItems />
          <InvoiceItems />
          <InvoiceItems />
          <InvoiceItems />
          <InvoiceItems />
        </div>
      </div>
      <div className="invoice-line" />
      <div className="invoice-total">
        <span>Sum Total</span>
        <span>{(2000).toFixed(2).toLocaleString()}</span>
      </div>
    </div>
  );
}

export function InvoiceItems({ name = "Product Name", price = 800, qty = 2 }) {
  return (
    <>
      <div className="invoice-items-container">
        <div className="invoice-items-name">Product Name</div>
        <div className="invoice-items-price">
          {price.toFixed(2).toLocaleString()}
        </div>
        <div className="invoice-items-qty">{qty}</div>
        <div className="invoice-items-total">{price * qty}</div>
      </div>
      <div className="invoice-line invoice-table-line invoice-items-line" />
    </>
  );
}
