import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync } from "../../features/product/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { addToFavorites } from "../../features/favorites/favoritesSlice";
import Navbar from "../../components/navbar/Navbar";
import { BsSuitHeart } from "react-icons/bs";

const Detail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const getProduct = useSelector((state) => state.products.product);

  const { productName, price, description, mainImageUrl } = getProduct;

  useEffect(() => {
    dispatch(getProductAsync(productId));
  }, [productId]);

  return (
    <>
      <Navbar />
      <section className="product-details-container">
        <div className="product-details-left-container">
          <div className="product-image-slider">
            <div className="product-small-image">
              {/* <img src={nese} alt="" style={{ width: "100px" }} />
              <img src={nese} alt="" style={{ width: "100px" }} />
              <img src={nese} alt="" style={{ width: "100px" }} />
              <img src={nese} alt="" style={{ width: "100px" }} />
              <img src={nese} alt="" style={{ width: "100px" }} /> */}
            </div>
            <div className="product-main-image">
              <img src={mainImageUrl} alt="" style={{ width: "519px" }} />
            </div>
          </div>
        </div>

        <div className="product-details-right-container">
          <div className="product-info">
            <div className="product-name">
              <h1>{productName}</h1>
            </div>

            <div className="product-price">
              <span>{price}$</span>
            </div>

            <div className="product-description">
              <span>{description}</span>
            </div>

            <div className="product-btn-group">
              <div className="">
                <button
                  className="btn-favorites"
                  onClick={() => dispatch(addToFavorites(getProduct))}
                >
                  <BsSuitHeart />
                </button>
              </div>

              <div className="">
                <button
                  type="button"
                  className="btn-cart"
                  onClick={() => dispatch(addToCart(getProduct))}
                >
                  <b>Add to Cart</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
