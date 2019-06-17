import React, { Component } from "react";
import { Link } from "react-router-dom";

// layout
import LayoutDefault from "../../layout/Default";

//components
import PageHero from "../../components/PageHero";

class NotFound extends Component {
  render() {
    return (
      <React.Fragment>
        <LayoutDefault>
          <PageHero
            type="small"
            image="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=01a9a264e737622958245b0f55a6e943&auto=format&fit=crop&w=1920&q=100"
          />

          <div className="wrapper">
            <div className="not-found">
              <h1 className="not-found__title">404, pagina niet gevonden</h1>
              <p className="not-found__description">
                <Link to="/">Ga naar de homepagina</Link>
              </p>
            </div>
          </div>
        </LayoutDefault>
      </React.Fragment>
    );
  }
}

export default NotFound;
