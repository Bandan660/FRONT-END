import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Tab, Tabs } from "@mui/material";
import {
  FaHeart,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import CategoryCarousel, {
  categoryData,
} from "../../Components/CategoryCarousel";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [value, setValue] = useState<number>(0);

  const handleChange = (newValue: number, event: React.SyntheticEvent) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <section className="product-details">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="header-top col-12">
              <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Women</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Shorts
                    </li>
                  </ol>
                </div>
              </nav>
            </div>
            <div className="col-12 row">
              <div className="col-md-6">
                <Swiper
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <img src="https://www.iconicindia.com/cdn/shop/files/8907361671530_2_1000x.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://www.iconicindia.com/cdn/shop/files/8907361671530_1_1000x.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://www.iconicindia.com/cdn/shop/files/8907361671530_3_1000x.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://www.iconicindia.com/cdn/shop/files/8907361671530_4_1000x.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://www.iconicindia.com/cdn/shop/files/8907361671530_5_1000x.jpg" />
                  </SwiperSlide>
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img src="https://www.iconicindia.com/cdn/shop/files/8907361671530_2_1000x.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://www.iconicindia.com/cdn/shop/files/8907361671530_1_1000x.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://www.iconicindia.com/cdn/shop/files/8907361671530_3_1000x.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://www.iconicindia.com/cdn/shop/files/8907361671530_4_1000x.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://www.iconicindia.com/cdn/shop/files/8907361671530_5_1000x.jpg" />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="col-md-6 product-info">
                <h1>Women Shorts</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                  sint reiciendis, iusto accusantium praesentium soluta
                  asperiores cum fugiat illo! Ducimus.
                </p>
                <p className="rating">
                  4.1 Rating <FaStar />
                </p>
                <p className="price">
                  <span>₹ 2000</span>
                </p>
                <p>
                  <span>(MRP incl. of all taxes)</span>
                </p>
                <hr />
                <p className="size-title">SELECT SIZES :</p>
                <div className="size-value">
                  <button>S</button>
                  <button>M</button>
                  <button>L</button>
                  <button>XL</button>
                </div>
                <hr />
                <p className="size-title">SELECT COLOR :</p>
                <div className="color">
                  <button></button>
                  <button></button>
                  <button></button>
                  <button></button>
                </div>
                <hr />
                <p>QUANTITY : </p>
                <div className="input-group ">
                  <span className="input-group-btn input-group-prepend">
                    <button
                      className="btn btn-outline btn-down qty-btn"
                      type="button"
                    >
                      <FaMinus />
                    </button>
                  </span>
                  <input className="horizontal-quantity " type="text" />
                  <span className="input-group-btn input-group-append">
                    <button className="btn btn-outline qty-btn" type="button">
                      <FaPlus />
                    </button>
                  </span>
                </div>
                <hr />
                <div className="btn-group  row w-100 justify-content-center gap-5">
                  <button
                    className="add-to-cart col-md-5 d-flex justify-content-center align-items-center gap-2"
                    onClick={() => {
                      navigate("/checkout/cart");
                    }}
                  >
                    ADD TO CART <FaShoppingCart />
                  </button>
                  <button className="wish-list col-md-5 d-flex justify-content-center align-items-center gap-2">
                    WISH LIST <FaRegHeart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-2 spec-reviews">
          <div className="row">
            <div className="col-12">
              <Tabs
                value={value}
                onChange={(event, newValue) => handleChange(newValue, event)}
                className="tabs"
              >
                <Tab label="Description" className="tab" />
                <Tab label="Specification" className="tab" />
                <Tab label="Reviews" className="tab" />
                <Tab label="Size Guide" className="tab" />
              </Tabs>

              <div hidden={value !== 0}>
                <div className="row col-md-12 portfolio-container py-5">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde corrupti optio itaque? Dolorum accusantium vitae
                    explicabo culpa suscipit doloremque quae error ratione ex
                    voluptate architecto ipsa eaque recusandae pariatur,
                    inventore fuga, aliquam velit nostrum magnam rem itaque
                    porro veritatis rerum.
                  </p>
                </div>
              </div>
              <div hidden={value !== 1}>
                <div className="row col-md-12 portfolio-container py-5">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nisi, voluptatum eveniet! Suscipit, pariatur aut. Beatae
                    dicta reprehenderit aut nesciunt soluta commodi hic natus
                    impedit pariatur. Aliquid omnis accusamus in incidunt?
                  </p>
                </div>
              </div>
              <div hidden={value !== 2}>
                <div className="row col-md-12 portfolio-container py-5">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Labore quia sapiente nihil, aut illo molestias vel
                    quibusdam! Molestiae laboriosam reiciendis, odio excepturi
                    sequi esse ipsa labore exercitationem architecto iusto
                    maiores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <h1 className="text-uppercase fs-4 fw-400">You May Also Like</h1>
          <div className="row mt-5">
            <CategoryCarousel />
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default ProductDetails;
