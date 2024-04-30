import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useGetcategoryQuery } from "../Redux/api/categoryAPI";
import { category } from "../types/types";
import Skeleton from "@mui/material/Skeleton";

const CategoryCarousel = () => {
  const { data, isLoading, isError } = useGetcategoryQuery({});

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 460 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      {isLoading && (
        <div>
          {/* Your loading indicator */}
          <Skeleton variant="rectangular" width={400} height={300} />
        </div>
      )}

      {isError && <div>Error fetching data. Please try again later.</div>}

      {!isLoading && !isError && (
        <Carousel
          swipeable={false}
          draggable={true}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay
          autoPlaySpeed={5000}
          keyBoardControl={true}
          containerClass="carousel-container"
          customTransition="all 1s linear"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        >
          {data &&
            Array.isArray(data.categories) &&
            data.categories.map((category: category) => (
              <div key={category._id} className="category">
                {isLoading ? (
                  <>
                    <Skeleton variant="rectangular" width={400} height={300} />
                  </>
                ) : (
                  <>
                    <Link to={`/category/${category.title}`}>
                      <img src={category.image} alt={category.title} />
                    </Link>
                  </>
                )}

                <h5 className="category-name">{category.title}</h5>
              </div>
            ))}
        </Carousel>
      )}
    </>
  );
};

export default CategoryCarousel;
