import React, { Fragment } from "react";
import Carousel from "react-bootstrap/Carousel";
import CategoryCarousel from "../../Components/CategoryCarousel";
import ProductCard from "../../Components/ProductCard";
import { useGetProductsQuery } from "../../Redux/api/productAPI";
import { Product } from "../../types/types";

const Home = () => {
  const addToCart = () => {};
  const { data: product, isLoading, isError } = useGetProductsQuery({});
  const data = product?.product;

  

  return (
    <Fragment>
      <section className="hero-section">
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/slider/slide1.jpg"
              alt="First slide"
            />
            <Carousel.Caption className="carousel-content">
              <h2 className="hero-title">Summer Fashion Sale</h2>
              <h3 className="text-uppercase mb-0">Get up to 30% off</h3>
              <h4 className="m-b-4">on Jackets</h4>
              <button>Shop Now</button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/slider/slide2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption className="carousel-content">
              <h2 className="hero-title">Summer Fashion Sale</h2>
              <h3 className="text-uppercase mb-0">Get up to 50% off</h3>
              <h4 className="m-b-4">on Kurti</h4>
              <button>Shop Now</button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
      <section className="category-slider">
        <h2 className="section-title ls-n-15 text-center pt-2 m-b-4">
          Shop By Category
        </h2>

        <div className="p-2">
          <CategoryCarousel />
        </div>
      </section>
      <section className="Popular-Product ">
        <h2 className="section-title ls-n-15 text-center pt-2 m-b-4 text-uppercase">
          Popular Products
        </h2>
        <div className="container">
          <div className="row p-2">
            {data &&
              data.map((product:Product) => (
                <ProductCard
                  key={product._id} // Make sure to provide a unique key
                  productId={product._id}
                  name={product.title}
                  price={product.price}
                  stock={product.stock}
                  handler={addToCart}
                  photo={product.thumbnail}
                  description={product.description}
                  
                />
              ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <hr className="mt-3 mb-5" />
          <div className="features px-4">
            <div className="row">
              {/* {featuresData.map((feature) => (
                <div className="col-md-3 features-box d-flex flex-column align-items-center px-4">
                  <img src={feature.img} alt="truck" className="features-img" />
                  <div className="features-info mt-3">
                    <h3 className="features-title text-uppercase fs-5 text-center fw-bold">
                      {feature.title}
                    </h3>

                    <p className="features-description text-center ">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
