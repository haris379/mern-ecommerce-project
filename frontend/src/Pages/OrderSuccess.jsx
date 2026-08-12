import { useParams } from "react-router";

const OrderSuccess = () => {
  const { id } = useParams();
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="page-shell max-w-xl text-center">
      <div className="card chip-notch p-10">
        <div className="w-14 h-14 rounded-full bg-teal-light text-teal flex items-center justify-center text-2xl mx-auto">
          ✓
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy mt-5">
          Order placed successfully
        </h1>

        <p className="mt-3 text-ink-soft">
          Your order ID is{" "}
          <span className="price-mono font-semibold text-ink">{id}</span>
        </p>

        <button onClick={goHome} className="btn-primary mt-7 !px-8">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
