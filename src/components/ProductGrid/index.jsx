import React, { Component } from "react";

// components
import ProductGridItem from "../../components/ProductGridItem";

class ProductGrid extends Component {
  render() {
    const { items } = this.props;

    return (
      <section className="product-grid">
        {items.map((item, i) => {
          return <ProductGridItem item={item} key={i} />;
        })}
      </section>
    );
  }
}

export default ProductGrid;
// import React, { Component } from "react";

// // components
// import ProductGridItem from "../../components/ProductGridItem";

// class ProductGrid extends Component {
//   render() {
//     const { items } = this.props;
//     console.log("hey",items.length)
//     //console.log("productgrid props",this.props);
//     const ada = [];
//     ada.push(this.props);

//     function doIt(item, index){
      
//     }
    

//     return (
//       <section className="product-grid">
//         {ada.map((item, index) => {
          
//           return <ProductGridItem item={item.items} key={index} />;
//         })}
//       </section>
//     );
//   }
// }

// export default ProductGrid;
