import React, { Component } from "react";
import request from 'superagent';
import Loader from '../../components/Loading';
import BestelGeschiedenisItem from '../../components/BestelGeschiedenisItem';

class BestelGeschiedenis extends Component {
  constructor(props) {
    super(props);
    this.retrieveClientOrders = this.retrieveClientOrders.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);

    this.state = {
      bestellingen: [],
      loading: true
    };

    if(this.isLoggedIn()){
      this.retrieveClientOrders();
    }
  }

  isLoggedIn(){
    let sessieObject = JSON.parse(sessionStorage.getItem('SessieID'));
    if(sessieObject !== null && sessieObject.id > 0){
      return true;
    } else {
      return false;
    }
  }

  retrieveClientOrders(){
    const klant = JSON.parse(sessionStorage.getItem('klantID'));
    console.log('KlantID: ' + klant.id);
    request.get('http://localhost:5000/api/bestellingen/' + klant.id)
    .then((res) => {return JSON.parse(res.text)})
    .then((bestellingNummers) => { 

      let writeToState = [];
      for (let i = 0; i < bestellingNummers.length; i++){
        request.get('http://localhost:5000/api/bestelling/' + bestellingNummers[i])
        .then((_bestelling) =>{return JSON.parse(_bestelling.text)})
        .then((bestelling) => {
          writeToState.push(bestelling)

          if(writeToState[bestellingNummers.length - 1] === bestelling){
            console.log('Write to state array: ' + JSON.stringify(writeToState));
            this.setState({bestellingen: writeToState, loading: false});
          }
        });
      }
    });
  }

  render() {
    if(!this.isLoggedIn()){
      return(
        <div className="mandFrame">
          <div className= "mandjeItem">
            <p>Je moet ingelogd zijn om dit te bekijken</p>
          </div>
        </div>
      )
    } else if(this.state.loading){
      return <Loader />
    } else if(!this.state.loading) {
      console.log('Huidige staat: ' + this.state.bestellingen);
      return (
        <div className="mandFrame">
         {this.state.bestellingen.map((item) => {
           console.log('met producten: ' + JSON.stringify(item.producten));
           return <BestelGeschiedenisItem klantID={item.klantID} status={item.status} producten={item.producten} geregistreerd={item.geregistreerd} adres={item.adres} prijs={item.prijs} datum='tijdelijke string'/>
         })}
        </div>
      );
    } else {
      return(
        <div className="mandFrame">
          <div className= "mandjeItem">
            <p>Er is iets fout gegaan, probeer het later nog eens.</p>
          </div>
        </div>
      )
    }
  }
}

export default BestelGeschiedenis;
