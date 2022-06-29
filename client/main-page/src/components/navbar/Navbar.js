import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../../containers/home/Home";
import Shop from "../../containers/shop/Shop";
import Account from "../../containers/account/Account";
import Favorites from "../../containers/favorites/Favorites";
import Cart from "../../containers/cart/Cart";
import Toggle from "../toggle/Toggle";
import Register from "../../containers/register/Register";
import Login from "../../containers/login/Login";
import logo from "../../assets/icons/Shop App1.svg";
import { RiUser6Fill } from "react-icons/ri";
import { BsSuitHeart } from "react-icons/bs";
import { FaShoppingBasket } from "react-icons/fa";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const Navbar = () => {
  const getCartItems = useSelector((state) => state.cart.cartItems);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles = {
    position: "absolute",
    top: 35,
    // right: 0,
    left: "-40px",
    zIndex: 1,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    p: 1,
    bgcolor: "background.paper",
    fontSize: 16,
    width: 100,
  };

  return (
    <header className="header">
      <div className="overlay has-fade"></div>

      <div className="header__menu has-fade">
        <Link to="/" element={<Home />}>
          Home
        </Link>
        <Link to="/shop" element={<Shop />}>
          Shop
        </Link>
        {/* <Link to="/" element={<Common />}>
          About
        </Link>
        <Link to="/" element={<Common />}>
          Contact
        </Link>
        <Link to="/" element={<Common />}>
          Blog
        </Link>
        <Link to="/" element={<Common />}>
          Careers
        </Link> */}
      </div>

      <nav className="nav">
        <div className="nav__left">
          <div className="nav__logo">
            <Link to="/" element={<Home />}>
              <img src={logo} alt="logo"></img>
            </Link>
          </div>
        </div>

        <div className="nav__center">
          {/* <div className="nav__search">
            <input type="text" className="search__text" />
            <input type="submit" className="search__btn">
              <i className="mdi mdi-magnify"></i>
            </input>
          </div> */}
          <div className="nav__links hide-for-mobile">
            <Link to="/" element={<Home />}>
              Home
            </Link>
            <Link to="/shop" element={<Shop />}>
              Shop
            </Link>
            {/*<Link to="/" element={<Common />}>
              About
            </Link>
            <Link to="/" element={<Common />}>
              Contact
            </Link>
            <Link to="/" element={<Common />}>
              Blog
            </Link>
            <Link to="/" element={<Common />}>
              Careers
            </Link> */}
          </div>
        </div>

        <div className="nav__right hide-for-mobile">
          <div className="nav__tools">
            <div className="nav__account">
              <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ position: "relative" }}>
                  <RiUser6Fill onClick={handleClick} style={{cursor:"pointer"}}/>
                  {open ? (
                    <Box sx={styles}>
                      <Link to="/account/register" element={<Register />} className="">
                        Register
                      </Link>
                      <br />
                      <Link to="/account/login" element={<Login />} className="">
                        Login
                      </Link>
                      <br />
                      <Link to="/account" element={<Account />} className="">
                        Logout
                      </Link>
                    </Box>
                  ) : null}
                </Box>
              </ClickAwayListener>
              {/* <Link to="/account" element={<Account />} className="">
                <RiUser6Fill />
              </Link> */}
            </div>

            <div className="nav__favorites">
              <Link to="/favorites" element={<Favorites />}>
                <BsSuitHeart />
              </Link>
            </div>

            <div className="nav__cart">
              {getCartItems.length === 0 ? (
                <span></span>
              ) : (
                <span className="cart-item-count-container">
                  {getCartItems.length}
                </span>
              )}

              <Link to="/cart" element={<Cart />}>
                <FaShoppingBasket />
              </Link>
            </div>
          </div>
        </div>

        <div
          id="btnToggle"
          className="nav__toggle hide-for-desktop"
          onClick={Toggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
