import React, { Fragment } from "react";
import Carousel from "react-bootstrap/Carousel";
import CategoryCarousel from "../../Components/CategoryCarousel";
import ProductCard from "../../Components/ProductCard";

const Home = () => {
  const addToCart = () => {};

  const products = [
    {
      productId: "17689",
      name: "Boots",
      price: 40000,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-1.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      productId: "17690",
      name: "Jacket",
      price: 400,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-2.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      productId: "17691",
      name: "Laptop",
      price: 40000,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-3.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      productId: "17692",
      name: "shoe",
      price: 40000,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-4.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      productId: "17693",
      name: "Watch",
      price: 40000,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-5.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      productId: "17694",
      name: "Skirt",
      price: 40000,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-6.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      productId: "17695",
      name: "Bag",
      price: 40000,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-7.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      productId: "17696",
      name: "dron",
      price: 40000,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-8.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      productId: "17697",
      name: "Sunglass",
      price: 40000,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-9.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      productId: "17698",
      name: "Jacket",
      price: 40000,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-10.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      productId: "17699",
      name: "Boots",
      price: 40000,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-11.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      productId: "17700",
      name: "Sandal",
      price: 500,
      stock: 300,
      photo:
        "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-11.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
  ];
  const featuresData = [
    {
      id: 1,
      img: "/assets/images/headphone.png",
      title: "Customer Support",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
    },
    {
      id: 2,
      img: "/assets/images/credit-card.png",
      title: "Secure Payment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
    },
    {
      id: 3,
      img: "/assets/images/cargo-truck.png",
      title: "Free Shipping",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
    },
    {
      id: 4,
      img: "/assets/images/return.png",
      title: "30 Days Return",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
    }

  ];
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
            {products.map((product) => (
              <ProductCard
                key={product.productId} // Make sure to provide a unique key
                productId={product.productId}
                name={product.name}
                price={product.price}
                stock={product.stock}
                handler={addToCart}
                photo={product.photo}
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
              {featuresData.map((feature) => (
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
              ))}
            </div>
          </div>

        </div>
      </section>
    </Fragment>
  );
};

export default Home;
