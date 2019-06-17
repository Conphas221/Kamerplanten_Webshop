import React, { Component } from "react";

class WishlistItem extends Component 
{
    // constructor(props) 
    // {
    //     super(props);
    // }

    render()
    {
        console.log('Dit is een id: ' + JSON.stringify(this.props.id));
        return (
            <div className="wishlistItem">
                <img src={this.props.foto} className= "productFoto" alt="product foto"/>
                <div>
                    <h2>{this.props.titel}</h2>
                    
                    <img src="https://img.icons8.com/metro/1600/trash.png"
                        onClick={() => {return this.props.remove(this.props.id)}} 
                        height = "40px"
                        alt = "delete"
                        className = "itemButton"
                        />
                    <p>€{this.props.prijs}</p>
                </div>
            </div>
        );

    }
}

export default WishlistItem;
