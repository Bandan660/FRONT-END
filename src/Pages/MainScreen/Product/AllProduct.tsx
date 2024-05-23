import React, { ChangeEvent, Fragment, useState, useEffect } from "react";
import { useGetcategoryQuery } from "../../../Redux/api/categoryAPI";
import { useGetProductsQuery } from "../../../Redux/api/productAPI";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Product, Category } from "../../../Types/types";
import { useNavigate } from "react-router-dom";

const AllProduct: React.FC = () => {
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { data: categoryData, isLoading: categoryLoading } =
    useGetcategoryQuery({});
  const { data: productData, isLoading: productLoading } = useGetProductsQuery(
    {}
  );

  const allProducts: Product[] = productData?.product || [];
  const categories: Category[] = categoryData?.categories || [];

  // Filter products based on selected categories and price range
  useEffect(() => {
    let filtered = allProducts;

    if (selectedValue.length > 0) {
      filtered = filtered.filter((product) =>
        selectedValue.includes(product.category)
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [selectedValue, priceRange, allProducts]);

  // Handle checkbox change
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setSelectedValue((prevSelectedValues) => {
      if (checked) {
        return [...prevSelectedValues, value];
      } else {
        return prevSelectedValues.filter((item) => item !== value);
      }
    });
  };

  // Handle price range change
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  if (categoryLoading || productLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <main className="main">
        <div className="container">
          <div className="row">
            <aside className="sidebar-shop col-lg-2">
              <div className="sidebar-wrapper">
                <div className="category p-2">
                  <h6>CATEGORIES</h6>
                  <ul className="px-2">
                    {categories.map((item) => (
                      <div className="form-check" key={item.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.title}
                          id={item.id}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor={item.id}>
                          {item.title}
                        </label>
                      </div>
                    ))}
                  </ul>
                </div>
                <div className="price-filter p-2">
                  <h6>PRICE RANGE</h6>
                  <Slider
                    range
                    min={0}
                    max={10000}
                    defaultValue={priceRange}
                    onChange={handlePriceChange}
                  />
                  <div className="price-range-values">
                    <span>Min: ₹{priceRange[0]}</span> -{" "}
                    <span>Max: ₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </aside>
            <div className="col-lg-9">
              <div className="row">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() =>
                      navigate(`/product/${product.category}/${product._id}`)
                    }
                    className="productCard col-6 col-sm-4 col-md-3 col-xl-2 my-3 d-flex flex-column align-items-center"
                  >
                    <div className="w-100 position-relative">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="productImg position-relative w-100"
                      />
                    </div>
                    <div className="product-details mt-3">
                      <h3 className="productName">{product.name}</h3>
                      <p className="productPrice">₹ {product.price}</p>
                      <p className="productDescription">
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default AllProduct;
