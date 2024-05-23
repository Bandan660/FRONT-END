import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Skeleton, Tab, Tabs } from "@mui/material";

import {
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import CategoryCarousel from "../../../Components/CategoryCarousel";
import { useGetProductsDetailsQuery } from "../../../Redux/api/productAPI";
import Loader from "../../../Components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/reducer/cartReducer";
import { cartApi, useAddtocartMutation } from "../../../Redux/api/cartAPI";
import toast from "react-hot-toast";

const ProductDetails = () => {
  //  All state
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [value, setValue] = useState<number>(0);
  const [size, setSize] = useState<string>();
  const [color, setColor] = useState<string>();
  const [qty, setQty] = useState<number>(1);
  const [image, setImage] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [loading, setloading] = useState(false);

  // All configuration
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const [AddtocartMutation] = useAddtocartMutation();
  const isLoggedIn = localStorage.getItem("$#@!%") !== null;

  // All functionality start here

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const { data: product, isLoading, isError } = useGetProductsDetailsQuery(id);
  const data = product?.product;

  // add to cart handle

  const addtocart = async () => {
    setloading(true);

    try {
      const res = await AddtocartMutation({
        productId: id,
        quantity: qty,
        size: size,
        color: color,
        image,
        title,
        price,
      });
      setloading(false);

      if ("data" in res && isLoggedIn) {
        dispatch(
          addToCart({
            productId: id ?? "",
            quantity: qty,
            size: size ?? "",
            color: color ?? "",
            image:image ?? "",
            title:title ?? "",
            price,
          })
        );

        toast.success("Product add to cart successfully");
      } else {
        toast.error("Please login first");
      }
    } catch (error) {
     console.log(error);
     
    }
  };

  useEffect(() => {
    if (data) {
      setImage(data.thumbnail); // Assuming images is an array, set the first image
      setTitle(data.title);
      setPrice(data.price);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>oops something went wrong please try after some time</h1>;
  }

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
                      <a href="#">{data?.category}</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {data.title}
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
                  {isLoading ? (
                    <Skeleton variant="rectangular" width={400} height={300} />
                  ) : (
                    <>
                      {data.images.map((image: string, index: number) => (
                        <SwiperSlide key={index}>
                          <img src={image} alt={`Image ${index}`} />
                        </SwiperSlide>
                      ))}
                    </>
                  )}
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
                  {isLoading ? (
                    <Skeleton variant="rectangular" width={400} height={300} />
                  ) : (
                    <>
                      {data.images.map((image: string, index: number) => (
                        <SwiperSlide key={index}>
                          <img src={image} alt={`Image ${index}`} />
                        </SwiperSlide>
                      ))}
                    </>
                  )}
                </Swiper>
              </div>
              <div className="col-md-6 product-info">
                <h1>{data?.title}</h1>
                <p>{data?.description}.</p>
                <p className="rating">
                  4.1 Rating <FaStar />
                </p>
                <p className="price">
                  <span>₹ {data?.price}</span>
                </p>
                <p>
                  <span>(MRP incl. of all taxes)</span>
                </p>
                <hr />
                <p className="size-title">SELECT SIZES :</p>
                <div className="size-value">
                  {data.size ? (
                    data.size.map((item: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSize(item)}
                        className={size === item ? "bg-dark text-white" : ""}
                      >
                        {item}
                      </button>
                    ))
                  ) : (
                    <p>Free Size</p>
                  )}
                </div>
                <hr />
                <p className="size-title">SELECT COLOR :</p>
                <div className="color">
                  {data.color ? (
                    data.color.map((item: string, index: number) => (
                      <button
                        key={index}
                        style={{ backgroundColor: item }}
                        onClick={() => setColor(item)}
                        className={color === item ? "border-2" : ""}
                      ></button>
                    ))
                  ) : (
                    <p>no color</p>
                  )}
                </div>
                <hr />
                <p>QUANTITY : </p>
                <div className="input-group ">
                  <span className="input-group-btn input-group-prepend">
                    <button
                      className="btn btn-outline btn-down qty-btn "
                      type="button"
                      onClick={() => qty > 1 && setQty(qty - 1)}
                    >
                      <FaMinus />
                    </button>
                  </span>
                  <input
                    className="horizontal-quantity "
                    type="text"
                    value={qty}
                    readOnly
                  />
                  <span className="input-group-btn input-group-append">
                    <button
                      className="btn btn-outline qty-btn"
                      type="button"
                      onClick={() => setQty(qty + 1)}
                    >
                      <FaPlus />
                    </button>
                  </span>
                </div>
                <hr />
                <div className="btn-group  row w-100 justify-content-center gap-5">
                  <button
                    className="add-to-cart col-md-5 d-flex justify-content-center align-items-center gap-2"
                    onClick={addtocart}
                  >
                    {loading ? "Adding product to cart ..." : "ADD TO CART"}{" "}
                    <FaShoppingCart />
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
                  <p>{data.description}</p>
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
