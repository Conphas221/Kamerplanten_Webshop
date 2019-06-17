import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <footer className="footer">
        <div className="wrapper">
          <span className="footer__copyright">
            &copy; {new Date().getFullYear()} Kamerplant inc
          </span>
          <ul className="footer__navigation">
            <li>
              <NavLink activeClassName="is-active" to="/algemene-voorwaarden">
                Algemene voorwaarden
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="is-active" to="/privacy">
                Privacy policy
              </NavLink>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
