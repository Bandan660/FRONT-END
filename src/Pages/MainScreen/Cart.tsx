import React, { Fragment, useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import CategoryCarousel from "../../Components/CategoryCarousel";
import { useSelector } from "react-redux";

const Cart = () => {
  // Fetching cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  const [qty, setQty] = useState<number>();

  return (
    <Fragment>
      <div className="container">
        <div className="cart row">
          <div className="col-md-8 col-sm-12">
            <h5 className="text-uppercase my-5">Shopping Cart</h5>

            <table className="table w-100">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {/* <img src={item.product.thumbnail} alt={item.product.title} /> */}
                    </td>
                    <td>
                      {/* <p>{item.product.title}</p>
                      <p>{item.product.description.substring(0, 30)}</p> */}
                      <p>
                        <span className="fw-bold bg-dark text-white p-1 rounded">
                          Size: {item.size}
                        </span>
                      </p>
                    </td>
                    <td>
                      <div className="d-flex justify-content-start align-items-center">
                        <button
                          className="btn btn-outline btn-down qty-btn"
                          type="button"
                          onClick={() =>
                            setQty(item.quantity > 1 ? item.quantity - 1 : 1)
                          }
                        >
                          <FaMinus className="text-dark" />
                        </button>
                        <input
                          className="horizontal-quantity"
                          type="text"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-outline qty-btn"
                          type="button"
                          onClick={() => setQty(item.quantity + 1)}
                        >
                          <FaPlus className="text-dark" />
                        </button>
                      </div>
                    </td>
                    {/* <td>{item.product.price}</td> */}
                    <td>
                      <button className="btn btn-outline">
                        <FaTrashAlt className="text-dark" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4 col-xl-3">
            <div className="cart-summary w-md-70 w-sm-100 m-auto  ">
              <h5 className="text-uppercase my-5">Cart Summary</h5>
              <div className=" border border-secondary p-3">
                <div className="d-flex justify-content-between">
                  <p>Subtotal</p>
                  <p>{}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p>Total</p>
                  <p>{}</p>
                </div>
                <hr />
                <button className="btn cart-btn">PROCEED TO CHECKOUT</button>
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

export default Cart;
