import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsAsync } from "../../features/product/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { PulseLoader } from "react-spinners";

const ShopProducts = () => {
  const getProducts = useSelector((state) => state.products.productList);
  const isLoading = useSelector((state) => state.products.isLoading);
  const dispatch = useDispatch();

  const a = getProducts.slice().sort((a, b) => {
    return a.price - b.price;
  });

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  return (
    <>
      {isLoading ? (
        // <div>Loading...</div>
        <PulseLoader css={{ position: "absolute", top: "50%", left: "50%" }} />
      ) : (
        <section className="product-right-container">
          <div className="product-items">
            <div className="search-result-container">
              <div className="search-result-title">
                <h4>{getProducts.length} products listed</h4>
              </div>
              {/* <div className="search-result-filter">
                <select name="cars" id="cars">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div> */}
            </div>

            {getProducts.map((product) => (
              <div
                className="product"
                key={product.id}
                // style={{ border: "4px solid grey" }}
              >
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
                        <b>{product.price} $</b>
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="product-buttons">
                  <button
                    type="button"
                    className="btn-cart"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    <b>Add to Cart</b>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center" }}>pagination 1 2 3 4</p>
        </section>
      )}
    </>
  );
};

export default ShopProducts;
