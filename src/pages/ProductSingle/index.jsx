import React, { Component } from 'react';
import request from 'superagent';

// layout
import LayoutDefault from '../../layout/Default';

// components
import Loading from '../../components/Loading';
import ProductAmount from '../../components/ProductAmount';

class ProductSingle extends Component {
  constructor(props) {
    super(props);
    this.getProduct = this.getProduct.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);

    this.state = {
      loading: true,
      response: null,
      toegevoegd: false
    };
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
  }

  getProduct(id) {
    request.get(`http://localhost:5000/api/product/${id}`).then(response => {
      this.setState({
        response: response.body,
        loading: false
      });
    });
  }

  isLoggedIn(){
    let sessieObject = JSON.parse(sessionStorage.getItem('SessieID'));
    if(sessieObject !== null && sessieObject.id > 0){
      return true;
    } else {
      return false;
    }
  }

  addToWishlist(id){
    let klant = JSON.parse(sessionStorage.getItem('klantID'));
    const postBody = {
      productid: id,
      geregistreerdeklantid: parseInt(klant.id)
    }
    request
    .post('http://localhost:5000/api/verlanglijstitem')
    .send(postBody)
    .then((res) => {
      if (res.statusCode === 200){
        this.setState({toegevoegd: true});
      } else {
        alert('Het is niet geluk product ' + id + ' aan je verlanglijstje toe te voegen.');
      }
    })
    
  }

  render() {
    const { loading, response } = this.state;
    return (
      <React.Fragment>
        <LayoutDefault simple="true">
          <div className="wrapper">
            {loading ? (
              <Loading text="Product ophalen..." />
            ) : response ? (
              <div className="product-detail">
                <figure className="product-image">
                  <img
                    src={response.foto}
                    alt={response.naam}
                  />
                </figure>
                <div className="product-information">
                  <h1 className="product-information__title">
                    {response.naam}
                  </h1>
                  <span className="product-information__price">
                    &euro;{response.prijs}
                  </span>
                  <p className="product-information__description">
                    {response.beschrijving}
                  </p>
                  <ul className="specifications">
                    <li>
                      <span>Voorraad</span>
                      {response.voorraad}
                    </li>
                    <li>
                      <span>Categorie</span>
                      {response.categorieID}
                    </li>
                    <li>
                      <span>Template</span>
                      Template
                    </li>
                  </ul>
                  <div className="add-to-cart">
                    <ProductAmount id={response.id} />
                  </div>
                  <br />
                  <div className='add-to-cart'>
                  <button
                    onClick={() => { return this.addToWishlist(response.id)}}
                    className={`button${this.isLoggedIn() ? '' : ' button--is-disabled'}`}>
                    {(this.state.toegevoegd) ? 'Product aan verlanglijstje toegevoegd':'Voeg product toe aan verlanglijstje'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p>Er ging iets fout!</p>
            )}
          </div>
        </LayoutDefault>
      </React.Fragment>
    )
  }
}

export default ProductSingle;
