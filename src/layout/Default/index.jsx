import React, { Component } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FooterNavigation from "../../components/FooterNavigation";

class LayoutDefault extends Component {
  render() {
    const { children, simple, className } = this.props;
    return (
      <div {...this.props} className={className}>
        <Header simple={simple} />
        <main className={`${simple ? "main--simple" : ""}`}>{children}</main>
        <FooterNavigation />
        <Footer />
      </div>
    );
  }
}

export default LayoutDefault;
