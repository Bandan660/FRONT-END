import React, { Fragment, useState, useEffect } from "react";
import { BsBag } from "react-icons/bs";
import { LuUserCircle } from "react-icons/lu";
import { GoSearch } from "react-icons/go";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { decryptCode } from "../../Utils/util";
import { RootState } from "../../Redux/store";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeTocartitem } from "../../Redux/reducer/cartReducer"; // corrected function name
import { Cart } from "../../../Types/types";
import Loader from "../../Components/Loader";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [show, setShow] = useState(false);

  const userid = localStorage.getItem("$I") || "";
  const id = decryptCode({ token: userid });
  const decoderole = localStorage.getItem("&5%#") || "";
  const role = decryptCode({ token: decoderole });
  const trimmedRole = role.trim().replace(/\W/g, "");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItem =
    useSelector((state: RootState) => state.cart.cartItems) || [];
  const totalQuantity = cartItem.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const logoutHandler = () => {
    localStorage.removeItem("$I");
    localStorage.removeItem("&5%#");
    localStorage.removeItem("$#@!%");
    navigate("/login");
  };

  // drawer handler
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for cart items

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

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="top-0 z-index-100 bg-white d-flex justify-content-center w-100">
        <nav className="d-flex row header container">
          <div className="d-flex col-md-8 align-content-center gap-5">
            <div className="logo">
              <img
                src="https://portotheme.com/html/porto_ecommerce/assets/images/logo-black.png"
                alt=""
              />
            </div>
            <ul className="menu-list d-flex align-items-center mb-0">
              <li className="menu-item">
                <Link to="/">Home</Link>
              </li>
              <li className="menu-item">
                <Link to="/allproduct">Shop</Link>
              </li>
              <li className="menu-item category">
                <Link to="#">
                  Category <MdKeyboardArrowDown />
                </Link>
                <ul className="sub-menu-category p-0">
                  <li className="menu-item px-3 py-2">
                    <Link to="/allorders" className="p-0">
                      All Orders
                    </Link>
                  </li>
                  <li className="menu-item px-3 py-2">
                    <Link to="/profile" className="p-0">
                      Profile
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                <Link to="/aboutUs">About Us</Link>
              </li>
              <li className="menu-item">
                <Link to="/contactUs">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="d-flex col-md-4 justify-content-end">
            <ul className="menu-list d-flex align-items-center mb-0 gap-4">
              <li className="menu-item">
                <button className="header-btn">
                  <GoSearch />
                </button>
              </li>
              <li className="menu-item position-relative">
                <button
                  className="header-btn"
                  // onClick={() => navigate("checkout/cart")}
                  onClick={handleShow}
                >
                  <BsBag />
                  {totalQuantity > 0 && (
                    <span className="badge">{totalQuantity}</span>
                  )}
                </button>
              </li>
              {id ? (
                <>
                  <li className="menu-item">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="header-btn"
                    >
                      <LuUserCircle />
                    </button>
                    <ul className="sub-menu-account p-0">
                      {trimmedRole === "admin" ? (
                        <li className="menu-item px-3 py-2">
                          <Link to="/admin/dashboard" className="p-0">
                            Admin
                          </Link>
                        </li>
                      ) : (
                        <>
                          <li className="menu-item px-3 py-2">
                            <Link to="/allorders" className="p-0">
                              All Orders
                            </Link>
                          </li>
                          <li className="menu-item px-3 py-2">
                            <Link to="/profile" className="p-0">
                              Profile
                            </Link>
                          </li>
                        </>
                      )}
                      <li className="menu-item px-3 py-2">
                        <button
                          className="header-btn logout"
                          onClick={logoutHandler}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="menu-item">
                    <button
                      className="header-btn"
                      onClick={() => navigate("/login")}
                    >
                      <LuUserCircle />
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        {/* cart drawer modal */}
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>BAG</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="col-md-12 col-sm-12">
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
                  <div className="cart-container w-100">
                    <div className="row">
                      {cartItems.map((item, index) => (
                        <div key={index} className="d-flex gap-4 border-bottom py-3" onClick={()=>navigate("/checkout/cart")}>
                          <div className="col-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-100"
                            />
                          </div>

                          <div className="col-8">
                            <p>{item.title}</p>
                            <p>
                              <span className="fw-normal fs-6">Size:</span>
                              <span className="">{item.size}</span>
                            </p>

                            <p>
                              <span className="fw-normal fs-6 ">Color:</span>
                              <span className="">{item.color}</span>
                            </p>
                            <div className="d-flex  justify-content-between align-items-center">
                            <div className="d-flex justify-content-start align-items-center border-dark border">
                              <button
                                className="btn btn-outline btn-down qty-btn py-0 "
                                type="button"
                                onClick={() =>
                                  decrementhandler(item)
                                } 
                                disabled={
                                  item.quantity === 1
                                } 
                              >
                                <FaMinus className="text-dark fs-6" />
                              </button>
                              <p className="m-0">{item.quantity}</p>
                              <button
                                className="btn btn-outline qty-btn py-0"
                                type="button"
                                onClick={() =>
                                  incrementhandler(item)
                                }
                              >
                                <FaPlus className="text-dark" />
                              </button>
                            </div>
                            {item.price}
                            </div>
                         
                          </div>
                        
                      
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </Fragment>
  );
};

export default Header;
