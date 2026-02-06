import { useCart } from "./context/CartContext.jsx";
import "./cart.css";
import { getImageUrl } from "../../services/imageService";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="cart-page">
      <h1 className="cart-title">Vaša korpa</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Vaša korpa je prazna.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, i) => {
              const sizeStock =
                item.product.sizes?.find((s) => s.sizeLabel === item.size)
                  ?.stock || 0;

              return (
                <div key={i} className="cart-card">
                  <img
                    src={getImageUrl(item.product.image)}
                    alt={item.product.name}
                    className="cart-image"
                  />
                  <div className="cart-details">
                    <h3 className="cart-name">{item.product.name}</h3>
                    <p className="cart-size">
                      Veličina: <strong>{item.size}</strong>
                    </p>

                    <div className="quantity-container">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={sizeStock}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            Math.min(Number(e.target.value), sizeStock)
                          )
                        }
                      />
                      <button
                        className="qty-btn"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <p className="cart-price">
                      {(item.product.priceOverride || item.product.price) *
                        item.quantity}{" "}
                      KM
                    </p>

                    <button
                      className="btn-remove"
                      onClick={() =>
                        removeFromCart(item.product.id, item.size)
                      }
                    >
                      Ukloni
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h2>Ukupno: {totalPrice} KM</h2>
            <button className="btn-checkout">Idi na plaćanje</button>
          </div>
        </>
      )}
    </div>
  );
}
