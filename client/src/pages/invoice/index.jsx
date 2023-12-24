import "./invoice.scss";
export default function Invoice() {
  return (
    <div className="invoice-container">
      <div className="invoice-head"></div>
      <h1 className="invoice-title">Purchase Order</h1>
      <div className="invoice-line" />
      <div className="invoice-table"></div>
      <div className="invoice-line" />
      <div className="invoice-total">
        <span>Sum Total</span>
        <span>{`NGN ${(2000).toLocaleString()}`}</span>
      </div>
    </div>
  );
}
