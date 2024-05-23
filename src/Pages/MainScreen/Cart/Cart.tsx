import React, { Fragment, useEffect } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import CategoryCarousel from "../../../Components/CategoryCarousel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import {
  addToCart,
  removeTocartitem,
} from "../../../Redux/reducer/cartReducer"; // corrected function name
import { Cart } from "../../../Types/types";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader";

const Cartpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state: RootState) => state.cart);

  useEffect(() => {}, [cartItems]);

  const incrementhandler = (cartItem: Cart) => {
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementhandler = (cartItem: Cart) => {
    if (cartItem.quantity > 1) {
      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    }
  };

  const removehandler = (productId: string) => {
    dispatch(removeTocartitem(productId));
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="container">
        <div className="cart row">
          <div className="col-md-8 col-sm-12">
            <h5 className="text-uppercase my-5">Shopping Cart</h5>
            {cartItems.length <= 0 ? (
              <div className="text-center">
                <h5>Cart is empty</h5>
                <button
                  className="btn btn-dark"
                  onClick={() => navigate("/allproduct")}
                >
                  Add some product to cart
                </button>
              </div>
            ) : (
              <>
                <table className="table w-100">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Final Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img src={item.image} alt={item.title} />
                        </td>
                        <td>
                          <p>{item.title}</p>
                          <p>
                            <span className="fw-bold bg-dark text-white p-1 rounded">
                              Size: {item.size}
                            </span>
                          </p>
                          <p>
                            <span className="fw-bold bg-dark text-white p-1 rounded mt-2">
                              Color: {item.color} {/* corrected typo here */}
                            </span>
                          </p>
                        </td>
                        <td>{item.price}</td>
                        <td>
                          <div className="d-flex justify-content-start align-items-center ">
                            <button
                              className="btn btn-outline btn-down qty-btn"
                              type="button"
                              onClick={() =>
                                decrementhandler(item)
                              } /* corrected here */
                              disabled={
                                item.quantity === 1
                              } /* disable when quantity is 1 */
                            >
                              <FaMinus className="text-dark" />
                            </button>
                            <p className="m-0">{item.quantity}</p>
                            <button
                              className="btn btn-outline qty-btn"
                              type="button"
                              onClick={() =>
                                incrementhandler(item)
                              } /* corrected here */
                            >
                              <FaPlus className="text-dark" />
                            </button>
                          </div>
                        </td>
                        <td>{item.quantity * item.price}</td>
                        <td>
                          <button
                            className="btn btn-outline"
                            onClick={() => removehandler(item.productId)}
                          >
                            {/* added onClick handler */}
                            <FaTrashAlt className="text-dark" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div className="col-md-4 col-xl-3">
            <div className="cart-summary w-md-70 w-sm-100 m-auto  ">
              <h5 className="text-uppercase my-5">Cart Summary</h5>
              <div className=" border border-secondary p-3">
                <div className="d-flex justify-content-between">
                  <p>Subtotal</p>
                  <p>
                    {cartItems.reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    )}
                  </p>
                  {/* calculate subtotal */}
                </div>
                <div className="d-flex justify-content-between">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p>Total</p>
                  <p>
                    {cartItems.reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    )}
                  </p>{" "}
                  {/* same as subtotal */}
                </div>
                <hr />
                <button
                  className="btn cart-btn"
                  onClick={() => navigate("/product/shippinginfo")}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="similar-products">
          <h4 className="text-uppercase my-5">Similar Products</h4>
          <div className="">
            <CategoryCarousel />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cartpage;
