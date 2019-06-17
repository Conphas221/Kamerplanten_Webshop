import React, { Component } from "react";
import request from 'superagent';

class WinkelmandItem extends Component 
{
    constructor(props) 
    {
        super(props);

        this.addToWishlist = this.addToWishlist.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);

        this.state = {
            toegevoegd: false
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

    isLoggedIn(){
        let sessieObject = JSON.parse(sessionStorage.getItem('SessieID'));
        if(sessieObject !== null && sessieObject.id > 0){
          return true;
        } else {
          return false;
        }
      }

    render()
    {
        return (
            <div className= "mandjeItem" height="500px">
                <img src={this.props.foto} className= "productFoto" alt=""/>
                <div>
                    <h2>{this.props.titel}</h2>
                    
                    <p>
                    <button 
                    onClick={() => { return this.addToWishlist(this.props.id)}}
                    className={`button${this.isLoggedIn() ? '' : ' button--is-disabled'}`}>
                    {(this.state.toegevoegd) ? 'Toegevoegd':'Toevoegen verlanglijstje'}
                    </button>
                    <img src="https://img.icons8.com/metro/1600/plus.png" className="itemButton" alt="plus" height="30px" onClick={() => this.props.plus(this.props.id)}/>
                        <img src="https://img.icons8.com/metro/1600/minus.png" className="itemButton" alt="minus" height="30px" onClick={() => this.props.min(this.props.id)} />
                    <br />
                        {this.props.aantal}x
                         
                        €{this.props.prijs}
                    </p>
                    <p></p>
                    
                </div>
            </div>
        );

    }
}

export default WinkelmandItem;