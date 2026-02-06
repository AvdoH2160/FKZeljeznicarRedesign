import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Cart from "../../../../assets/svg/cart.svg";
import "./floatingCart.css";
import { getImageUrl } from "../../services/imageService";

export default function FloatingCart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <div className="floating-cart-container">
      <button className="floating-cart-button" onClick={toggleCart}>
        <img src={Cart}></img> {cartItems.length}
      </button>

      {isOpen && (
        <div className="floating-cart-popup">
          <h2>Vaša korpa</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart">Korpa je prazna.</p>
          ) : (
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
                    />
                    <div className="cart-details">
                      <h3>{item.product.name}</h3>
                      <p className="size">
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
                      <p className="price">
                        {(item.product.priceOverride || item.product.price) *
                          item.quantity}{" "}
                        KM
                      </p>
                      <button
                        className="btn-remove"
                        onClick={() => removeFromCart(item.product.id, item.size)}
                      >
                        UKLONI
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="cart-summary">
              <h3 className="total">UKUPNO: {totalPrice} KM</h3>
              <Link to="shop/cart" className="btn-cart" onClick={() => setIsOpen(false)}>KORPA</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
