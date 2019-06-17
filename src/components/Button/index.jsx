import React, { Component } from "react";

class Header extends Component {
  render() {
    const { children } = this.props;
    return (
      <button onClick={this.addToCart} className="button">
        {children}
      </button>
      
    );
  }
}

export default Header;
