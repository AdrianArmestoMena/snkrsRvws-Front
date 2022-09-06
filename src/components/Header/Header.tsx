import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { useAppSelector } from "../../store/hooks";
import HeaderStyle from "./Header.style";

const Header = (): JSX.Element => {
  const userState = useAppSelector((state) => state.users);
  const { logOut } = useUser();

  const { id } = userState;
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(true);
  const Close = () => setClick(false);

  return (
    <HeaderStyle>
      <div className={click ? "main-container" : ""} onClick={Close} />
      <nav className="navbar" onClick={(event) => event.preventDefault()}>
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            <h1>SnkrsRvws</h1>
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink to="/home" className="nav-links" onClick={Close}>
                Home
              </NavLink>
            </li>
            {id === "" ? (
              <>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-links" onClick={Close}>
                    Sign up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-links" onClick={Close}>
                    Log in
                  </NavLink>
                </li>{" "}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/your-reviews"
                    className="nav-links"
                    onClick={Close}
                  >
                    Your Reviews
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/create-review"
                    className="nav-links"
                    onClick={Close}
                  >
                    Create Review
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-links"
                    onClick={() => {
                      Close();
                      logOut();
                    }}
                  >
                    Log out
                  </button>
                </li>{" "}
              </>
            )}
          </ul>

          {click ? (
            <div>
              <div data-testid="xIcon" className="nav-icon" onClick={Close}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
          ) : (
            <div
              data-testid="burgerIcon"
              className="nav-icon"
              onClick={handleClick}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          )}
        </div>
      </nav>
    </HeaderStyle>
  );
};

export default Header;
