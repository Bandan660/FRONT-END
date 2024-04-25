import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

 export const categoryData = [
  {
    id: 1,
    name: "sunglass",
    image:
      "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/categories/category-1.jpg",
  },
  {
    id: 2,
    name: "Bags",
    image:
      "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/categories/category-2.jpg",
  },
  {
    id: 3,
    name: "Electronics",
    image:
      "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/categories/category-2.jpg",
  },
  {
    id: 4,
    name: "Watches",
    image:
      "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/categories/category-4.jpg",
  },
  {
    id: 5,
    name: "Watches",
    image:
      "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/categories/category-4.jpg",
  },
  {
    id: 5,
    name: "Headphone",
    image:
      "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/categories/category-6.jpg",
  },
];

const CategoryCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 768, min: 460 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Carousel
      swipeable={false}
      draggable={true}
      showDots={false}
      responsive={responsive}
      // means to render carousel on server-side.
      infinite={true}
      autoPlay
      autoPlaySpeed={5000}
      keyBoardControl={true}
      containerClass="carousel-container"
      customTransition="all 1s linear"
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
    >
      {categoryData.map((category) => (
        <div key={category.id} className="category">
          <Link to={`/category/${category.name}`}>
            <img src={category.image} alt={category.name} />
          </Link>
          <h5 className="category-name">{category.name}</h5>
        </div>
      ))}
    </Carousel>
  );
};

export default CategoryCarousel;
