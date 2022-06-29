import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../../features/favorites/favoritesSlice";
import { addToCart } from "../../features/cart/cartSlice";
import Navbar from "../../components/navbar/Navbar";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const Favorites = () => {
  const getFavoritesItems = useSelector(
    (state) => state.favorites.favoritesItems
  );
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Navbar />
      <section className="product-favorites-container">
        <h1>Favorites</h1>

        {getFavoritesItems.length === 0 ? (
          <div className="favorites-empty">
            <span>Your favorites is currently empty</span>
            <Link to="/shop">
              <BsArrowLeft />
              <span className="start-shopping">Start Shopping</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="search-result-container">
              <div className="search-result-title">
                <h4>{getFavoritesItems.length} favorites listed</h4>
              </div>
            </div>

            <div className="product-items">
              {getFavoritesItems.map((product) => (
                <div
                  className="product"
                  key={product.id}
                  // style={{ border: "4px solid grey" }}
                >
                  <span onClick={() => dispatch(removeFromFavorites(product))}>
                    <AiOutlineClose />
                  </span>
                  <Link to={`/products/${product.id}`}>
                    <div className="product-content">
                      <div className="product-img">
                        <img src={product.mainImageUrl} alt="" />
                      </div>
                    </div>

                    <div className="product-info">
                      <div className="product-name">
                        <p className="text-overflow">
                          <abbr
                            title={product.productName}
                            style={{ textDecoration: "none" }}
                          >
                            {product.productName}
                          </abbr>
                        </p>
                      </div>
                      <div className="product-price">
                        <span>
                          <b>{product.price}$</b>
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="product-buttons">
                    <button
                      type="button"
                      className="btn-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <b>Add to Cart</b>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Favorites;
