import React, { Fragment, useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import CategoryCarousel from "../../Components/CategoryCarousel";

const Cart = () => {
  const [qty, setQty] = useState<number>(1);
  const featuresData = {
    productId: "17689",
    name: "Boots",
    price: 40000,
    stock: 300,
    size: "M",
    photo:
      "https://portotheme.com/html/porto_ecommerce/assets/images/demoes/demo3/products/product-1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  };

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
                <tr>
                  <td>
                    <img src={featuresData.photo} alt={featuresData.name} />
                  </td>
                  <td>
                    <p>{featuresData.name}</p>
                    <p>{featuresData.description.substring(0, 30)}</p>
                    <p>
                      <span className="fw-bold bg-dark text-white p-1 rounded">
                        Size: {featuresData.size}
                      </span>
                    </p>
                  </td>
                  <td>
                    <div className=" d-flex justify-content-start align-items-center">
                      <span className="input-group-btn input-group-prepend">
                        <button
                          className="btn btn-outline btn-down qty-btn"
                          type="button"
                          onClick={() => qty > 1 && setQty(qty - 1)}
                        >
                          <FaMinus className="text-dark" />
                        </button>
                      </span>
                      <input
                        className="horizontal-quantity "
                        type="text"
                        value={qty}
                      />
                      <span className="input-group-btn input-group-append">
                        <button
                          className="btn btn-outline qty-btn"
                          type="button"
                        >
                          <FaPlus
                            className="text-dark"
                            onClick={() => setQty(qty + 1)}
                          />
                        </button>
                      </span>
                    </div>
                  </td>
                  <td>{featuresData.price}</td>
                  <td>
                    <button className="btn btn-outline ">
                      <FaTrashAlt className="text-dark" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={featuresData.photo} alt={featuresData.name} />
                  </td>
                  <td>
                    <p>{featuresData.name}</p>
                    <p>{featuresData.description.substring(0, 30)}</p>
                    <p>
                      <span className="fw-bold bg-dark text-white p-1 rounded">
                        Size: {featuresData.size}
                      </span>
                    </p>
                  </td>
                  <td>
                    <div className=" d-flex justify-content-start align-items-center">
                      <span className="input-group-btn input-group-prepend">
                        <button
                          className="btn btn-outline btn-down qty-btn"
                          type="button"
                        >
                          <FaMinus className="text-dark" />
                        </button>
                      </span>
                      <input
                        className="horizontal-quantity "
                        type="text"
                        readOnly
                      />
                      <span className="input-group-btn input-group-append">
                        <button
                          className="btn btn-outline qty-btn"
                          type="button"
                        >
                          <FaPlus className="text-dark" />
                        </button>
                      </span>
                    </div>
                  </td>
                  <td>{featuresData.price}</td>
                  <td>
                    <button className="btn btn-outline ">
                      <FaTrashAlt className="text-dark" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-4 col-xl-3">
            <div className="cart-summary w-md-70 w-sm-100 m-auto  ">
              <h5 className="text-uppercase my-5">Cart Summary</h5>
              <div className=" border border-secondary p-3">
                <div className="d-flex justify-content-between">
                  <p>Subtotal</p>
                  <p>{featuresData.price}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p>Total</p>
                  <p>{featuresData.price}</p>
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
