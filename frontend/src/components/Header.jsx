import { useContext, useState } from "react";
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

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ setIsLoginPopOpen }) => {
  const [navOpen, setNavOpen] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <header className="header relative py-4" id="#home">
      <div className="container">
        <div className="header-row">
          {/* logo */}
          <Link to="/" className="logo">
            The Kitchn.
          </Link>

          {/* header center */}
          <Navbar navOpen={navOpen} />

          {/* header right */}
          <div className="header-right flex items-center gap-2">
            {/* search button */}
            <Button variant="iconBtn" size="iconBtn">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>

            {/* cart button */}
            <Link to="/cart">
              <Button variant="iconBtn" size="iconBtn" className="outline-none">
                <FontAwesomeIcon icon={faCartShopping} />
              </Button>
            </Link>

            {/* menu button */}
            <Button
              className="menu-btn md:hidden"
              variant="outline"
              size="iconBtn"
              onClick={() => setNavOpen((prev) => !prev)}
            >
              {navOpen ? (
                <FontAwesomeIcon icon={faClose} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </Button>

            {/* login / signup button */}
            <Button onClick={() => setIsLoginPopOpen(true)} className="hidden md:block">Login</Button>

            {/* avatar */}
            {/* <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
