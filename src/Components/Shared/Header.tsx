import React, { Fragment, useState } from "react";
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { decryptCode } from "../../util";
import { useSelector } from "react-redux";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userid = localStorage.getItem("$I") || "";
  const id = decryptCode({ token: userid });
  const decoderole = localStorage.getItem("&5%#") || "";
  const role = decryptCode({ token: decoderole });
  const trimmedRole = role.trim().replace(/\W/g, "");

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  console.log(totalQuantity);

  const logoutHandler = () => {
    localStorage.removeItem("$I");
    localStorage.removeItem("&5%#");
    localStorage.removeItem("$#@!%");
    navigate("/login");
  };

  return (
    <Fragment>
      <div className=" top-0 z-index-100 bg-white d-flex justify-content-center w-100">
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
                <Link to="/shop">Shop</Link>
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
                  <FaSearch />
                </button>
              </li>
              <li className="menu-item">
                <button
                  className="header-btn"
                  onClick={() => navigate("checkout/cart")}
                >
                  <FaShoppingBag />
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
                      <FaUser />
                    </button>
                    <ul className="sub-menu-account p-0">
                      {trimmedRole == "admin" ? (
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
                    <Link to="/login" className="user">
                      <FaUser />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default Header;
