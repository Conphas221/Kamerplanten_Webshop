import React, { Component } from "react";
import { Link } from "react-router-dom";
import SimpleHeading from "../../components/SimpleHeading";
import LayoutDefault from "../../layout/Default";
import PageHero from "../../components/PageHero";
import WishlistItem from "../../components/WishlistItem";
import Loader from '../../components/Loading';
import request from 'superagent';

class WishList extends Component {
  constructor(props) {
    super(props);

    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.retrieveWishlist = this.retrieveWishlist.bind(this);
    this.removeFromWishlist = this.removeFromWishlist.bind(this);
    this.reloadComponent = this.reloadComponent.bind(this);

    this.state = {
      producten: [],
      items: [],
      loading: true
    };

    this.retrieveWishlist();
  }

  async retrieveWishlist(){
    let klantObject = JSON.parse(sessionStorage.getItem('klantID'));
    let items;
    if(this.isLoggedIn()) {
      await request.get('http://localhost:5000/api/verlanglijstitem/' + klantObject.id)
      .then((res) => items = JSON.parse(res.text))
      .then((res) => this.setState({items: res}))

      for(let i = 0; i < items.length; i++){
        let product;
        await request.get('http://localhost:5000/api/product/' + items[i].productID)
          .then((res) => {
            let productsInState = this.state.producten;
            productsInState.push(res.text);
            this.setState({producten: productsInState});
          })
      }
    }
    this.setState({loading: false});
  }

  async removeFromWishlist(id){
    let verlanglijstItems = this.state.items;
    
    for(let i = 0; i < verlanglijstItems.length; i++){
      if(verlanglijstItems[i].productID === id){
        await request.delete('http://localhost:5000/api/verlanglijstitem/' + verlanglijstItems[i].id);
      }
    }
    await this.reloadComponent();
  }

  async reloadComponent(){
    this.setState({producten: [], items: [], loading: true});
    await this.retrieveWishlist();
  }

  isLoggedIn(){
    let sessieObject = JSON.parse(sessionStorage.getItem('SessieID'));
    if(sessieObject !== null && sessieObject.id > 0){
      return true;
    } else {
      return false;
    }
  }

  render() {
    if(!this.isLoggedIn()){
      return (
        <React.Fragment>
          <LayoutDefault>
            <PageHero
              type="small"
              image="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=01a9a264e737622958245b0f55a6e943&auto=format&fit=crop&w=1920&q=100"
            />

            <div className="wrapper">
              <div className="not-found">
                <h1 className="not-found__title">U bent niet ingelogd</h1>
                <p className="not-found__description">
                  <Link to="/signup">Login met u account om u wishlist weer te geven.<br/></Link>
                </p>
              </div>
            </div>
          </LayoutDefault>
        </React.Fragment>
      );
    } else if (this.state.loading === true) {
      return (
        <React.Fragment>
          <LayoutDefault className="SignUp" simple="true">
            <div className="wrapper">
            <SimpleHeading
                title="Verlanglijstje"
                description="Een overzicht van de producten op uw verlanglijstje:"
              /> 
              <Loader />
            </div>
          </LayoutDefault>
        </React.Fragment>
      );
    } else if (this.state.loading === false && this.state.producten.length > 0) {
      return (
        <React.Fragment>
          <LayoutDefault className="SignUp" simple="true">
            <div className="wrapper">
              <SimpleHeading
                title="Verlanglijstje"
                description="Een overzicht van de producten op uw verlanglijstje:"
              />           
            </div>
            {this.state.producten.map((item) => { 
              let jitem = JSON.parse(item)
              return <WishlistItem 
                titel = {jitem.naam}
                foto = {jitem.foto}
                prijs = {jitem.prijs}
                id = {jitem.id}
                remove = {this.removeFromWishlist}
              />})}
              <br /><br />
              <a href="/overzicht/0"><button class="button">Klik hier om verder te winkelen</button></a>
          </LayoutDefault>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <LayoutDefault className="SignUp" simple="true">
            <div className="wrapper">
              <SimpleHeading
                title="Verlanglijstje"
                description="U heeft nog geen producten aan uw verlanglijstje toegevoegd."
              />
              <a href="/overzicht/0"><button class="button">Klik hier om verder te winkelen</button></a>
            </div>
          </LayoutDefault>
          
        </React.Fragment>
        );
    }
  }
}

export default WishList;
