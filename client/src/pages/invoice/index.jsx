import "./invoice.scss";
export default function Invoice() {
  return (
    <div className="invoice-container">
      <div className="invoice-head"></div>
      <h1 className="invoice-title">Purchase Order</h1>
      <div className="invoice-line" />
    </div>
  );
}
