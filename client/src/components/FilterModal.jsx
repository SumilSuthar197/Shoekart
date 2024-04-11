import { useRef } from "react";
import MultiSelectBox from "./MultiSelectBox";
const FilterModal = ({
  onClose,
  filters,
  changeFilter,
  FilterOptions,
  requestData,
}) => {
  const modelRef = useRef();
  const closeModal = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };

  const sortOptions = [
    { value: "createdAt_asc", label: "Latest First" },
    { value: "createdAt_desc", label: "Oldest First" },
    { value: "price_asc", label: "Low to High Price" },
    { value: "price_desc", label: "High to Low Price" },
  ];
  const sizes = [];
  for (let i = 3; i <= 14; i++) {
    sizes.push({ value: i, label: i });
  }
  return (
    <div ref={modelRef} onClick={closeModal} className="modal">
      <div className="modal-container">
        <div className="modal-div">
          <h4>Sort By</h4>
          <div className="select-main-box">
            <MultiSelectBox
              multiple={false}
              options={sortOptions}
              value={filters.sortBy}
              onChange={(e) => changeFilter({ sortBy: e })}
            />
          </div>
        </div>
        <div className="modal-div">
          <h4>
            Size
            <br /> (in UK)
          </h4>
          <div className="select-main-box">
            <MultiSelectBox
              multiple={true}
              options={sizes}
              value={filters.size}
              onChange={(e) => changeFilter({ size: e })}
            />
          </div>
        </div>
        <div className="modal-div">
          <h4>Color</h4>
          <div className="select-main-box">
            <MultiSelectBox
              multiple={true}
              options={FilterOptions.colors.map((color) => ({
                value: color,
                label: color,
              }))}
              value={filters.color}
              onChange={(e) => changeFilter({ color: e })}
            />
          </div>
        </div>
        <div className="modal-div">
          <h4>Brand</h4>
          <div className="select-main-box">
            <MultiSelectBox
              multiple={true}
              options={FilterOptions.brands.map((brand) => ({
                value: brand,
                label: brand,
              }))}
              value={filters.brand}
              onChange={(e) => changeFilter({ brand: e })}
            />
          </div>
        </div>
        <div className="modal-div">
          <h4>Category</h4>
          <div className="select-main-box">
            <MultiSelectBox
              multiple={true}
              options={FilterOptions.category.map((item) => ({
                value: item,
                label: item,
              }))}
              value={filters.category === "" ? [] : filters.category.split(",")}
              onChange={(e) => changeFilter({ category: e.join(",") })}
            />
          </div>
        </div>
        <div className="modal-div price-div-title">
          <h4 className="price-div-title">Price Range</h4>
        </div>
        <div className="modal-div price-div">
          <div className="price-field">
            <span>Min</span>
            <input
              type="number"
              value={filters.price.minPrice}
              className="price-input"
              placeholder="0"
              min={0}
              onChange={(e) =>
                changeFilter({
                  price: {
                    ...filters.price,
                    minPrice: Number(e.target.value) || 0,
                  },
                })
              }
            />
          </div>
          <div className="separator">-</div>
          <div className="price-field">
            <span>Max</span>
            <input
              type="number"
              value={filters.price.maxPrice}
              className="price-input"
              placeholder="Infinity"
              min={0}
              onChange={(e) =>
                changeFilter({
                  price: {
                    ...filters.price,
                    maxPrice: Number(e.target.value) || Infinity,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="modal-div ">
          <div className="filter-modal-btn">
            <button
              className="btn-filter "
              onClick={() => {
                onClose();
              }}
            >
              Close
            </button>
            <button
              className="btn-filter"
              onClick={() => {
                requestData();
                onClose();
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
