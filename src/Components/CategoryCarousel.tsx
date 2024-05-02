import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useGetcategoryQuery } from "../Redux/api/categoryAPI";
import { category } from "../types/types";
import Skeleton from "@mui/material/Skeleton";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const CategoryCarousel = () => {
  const { data, isLoading, isError } = useGetcategoryQuery({});

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
        <Swiper
          spaceBetween={10}
          navigation={true}
          slidesPerView={4}
        
          modules={[FreeMode, Navigation, Thumbs]}
       
        >

          {data &&
            Array.isArray(data.categories) &&
            data.categories.map((category: category) => (
              <SwiperSlide key={category._id} >
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
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </>
  );
};

export default CategoryCarousel;
