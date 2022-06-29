import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseProduct,
  increaseProduct,
  getTotals,
  removeFromCart,
  clearCart,
} from "../../features/cart/cartSlice";
import Navbar from "../../components/navbar/Navbar";
import { BsArrowLeft } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";

const Cart = () => {
  const getCartItems = useSelector((state) => state.cart.cartItems);
  const getCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDecreaseProduct = (product) => {
    dispatch(decreaseProduct(product));
  };

  const handleincreaseProduct = (product) => {
    dispatch(increaseProduct(product));
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [getCart, dispatch]);

  return (
    <>
      <Navbar />
      <section className="product-cart-container">
        <h1>Shopping Cart</h1>

        {getCartItems.length === 0 ? (
          <div className="cart-empty">
            <span>Your cart is currently empty</span>
            <Link to="/shop">
              <BsArrowLeft />
              <span className="start-shopping">Start Shopping</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-wrapper-title">
              <div className="cart-wrapper-title-left">
                <h5 className="product-title">Product</h5>
                <h5 className="product-title">Product Name</h5>
                <h5 className="price">Description</h5>
                <h5 className="quantity">Quantity</h5>
                <h5 className="total">Total</h5>
              </div>
              <div className="cart-wrapper-title-right">
                <div className="cart-checkout-container">
                  <div className="cart-checkout">
                    <div className="subtotal">
                      <span>Subtotal</span>
                      <span className="amount">{getCart.cartTotalAmount}$</span>
                    </div>
                    <p>Taxes and shipping calculated at checkout</p>
                    <button>Checkout</button>
                    <div className="continue-shopping">
                      <Link to="/shop">
                        <BsArrowLeft />
                        <span>Continue Shopping</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <button
                  className="clear-btn"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="cart-wrapper">
              <div className="cart-items">
                {getCartItems.map((product) => (
                  <div className="cart-item" key={product.id}>
                    <div className="cart-item-header"></div>
                    <div className="cart-item-body">
                      <div className="cart-item-image">
                        <Link to={`/products/${product.id}`}>
                          <img
                            src={product.mainImageUrl}
                            alt=""
                            // style={{ width: "100px" }}
                          />
                        </Link>
                      </div>
                      <div className="cart-item-name">
                        <Link to={`/products/${product.id}`}>
                          {product.productName}
                        </Link>
                      </div>
                      <div className="cart-item-description">
                        {product.description}
                      </div>
                      <div className="product-counter-group">
                        <div className="product-counter">
                          <button
                            className="decrement"
                            onClick={() => handleDecreaseProduct(product)}
                          >
                            -
                          </button>
                          <input
                            className="counter"
                            type="text"
                            value={product.cartQuantity}
                            readOnly
                          />
                          <button
                            className="increment"
                            onClick={() => handleincreaseProduct(product)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="cart-item-price">
                        <b>{product.price * product.cartQuantity}$</b>
                      </div>
                      <div className="cart-item-remove">
                        <RiDeleteBin5Line
                          className="delete-icon"
                          onClick={() => dispatch(removeFromCart(product))}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
