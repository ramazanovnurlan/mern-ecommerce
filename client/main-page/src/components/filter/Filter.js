const Filter = () => {
  return (
    <section className="product-left-container">
      <div className="filter-widget">
        <div className="aside">
          <div className="aside-title">
            <h5>Bunlari da hazirla hem sol teref hem de centerdeki, qiymete gore </h5>
            <h4>Brand</h4>
          </div>

          <div id="" className="aside-content">
            <label className="main">
              Apple
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>

            <label className="main">
              Samsung
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>

            <label className="main">
              Xiaomi
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>

            <label className="main">
              Realme
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>
          </div>
        </div>

        <div className="aside">
          <div className="aside-title">
            <h4>Color</h4>
          </div>

          <div id="" className="aside-content">
            <label className="main">
              Black
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>

            <label className="main">
              Red
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>

            <label className="main">
              Yellow
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>

            <label className="main">
              Green
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>

            <label className="main">
              White
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>

            <label className="main">
              Purple
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>

            <label className="main">
              Blue
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>

            <label className="main">
              Orange
              <input type="checkbox" />
              <span className="newCheckbox"></span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filter;
