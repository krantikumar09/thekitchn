import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faClose,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { StoreContext } from "../context/StoreContext";
import HeaderProfileDropdown from "./HeaderProfileDropdown";

const Header = ({ setIsLoginPopOpen }) => {
  const [navOpen, setNavOpen] = useState(false);
  const { cartItem, token } = useContext(StoreContext);

  useEffect(() => {
    console.log(cartItem.length);
  }, []);

  return (
    <header className="header relative py-4" id="#home">
      <div className="container">
        <div className="header-row">
          <div className="space-x-2 md:space-x-0">
            {/* menu button */}
            <Button
              className="menu-btn md:hidden"
              variant="iconBtn"
                size="iconBtn"
              onClick={() => setNavOpen((prev) => !prev)}
            >
              {navOpen ? (
                <FontAwesomeIcon icon={faClose} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </Button>

            {/* logo */}
            <Link to="/" className="logo">
              The Kitchn.
            </Link>
          </div>

          {/* header center */}
          <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />

          {/* header right */}
          <div className="header-right flex items-center gap-2">
            {/* search button */}
            <Button
              className="hidden md:block"
              variant="iconBtn"
              size="iconBtn"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>

            {/* cart button */}
            <Link to="/cart">
              <Button
                variant="iconBtn"
                size="iconBtn"
                className="outline-none relative"
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </Button>
            </Link>

            {/* login / signup button */}
            {token ? (
              <HeaderProfileDropdown />
            ) : (
              <Button
                onClick={() => setIsLoginPopOpen(true)}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
