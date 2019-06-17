import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductGridItem extends Component {
  render() {
    const { item } = this.props;
    //console.log("ayyliens",this.props);
    //let prijs = Math.round(Math.random() * Math.floor(20));


    //console.log("item in productgriditem2",item[2].id)

    return (
      <Link to={`/product/${item.id}`} className="product-grid-item">
      {//console.log('ayylmao',`/product/${item.id}`)
      }
        <figure className="product-grid-item__figure">
          <div
            className="product-grid-item__image"
            style={{
              backgroundImage: `url(`+item.foto+`)`
            }}
          />
        </figure>
        <div className="product-grid-item__heading">
          <span className="product-grid-item__title">{item.naam}</span>
          <span className="product-grid-item__price">&euro;{item.prijs},-</span>
        </div>
      </Link>
    );
  }
}

export default ProductGridItem;
