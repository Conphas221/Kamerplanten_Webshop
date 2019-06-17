import React, { Component } from "react";


class BestelGeschiedenisItem extends Component 
{
    constructor(props) 
    {
        super(props);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.state = {
            opened: false
        }
 
    }

    open(){
        this.setState({opened: true});
    }

    close(){
        this.setState({opened: false});
    }


    render()
    {
        if(this.state.opened === false){
            return (
                <div className= "besteloverzichtItemCLOSED" onClick={() => {return this.open()}}>
                    <img src={this.props.foto} className= "productFoto" alt=""/>
                    <div>
                        <h2>{(this.props.geregistreerd)?'Klant: ':'Gast: '}{this.props.klantID}</h2><h3>{this.props.producten.length} producten: (€{this.props.prijs.toFixed(2)})</h3>
                        <p>
                            {this.props.adres}
                            <br />
                            {this.props.status}
                        </p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className= "besteloverzichtItemOPEN" onClick={() => {return this.close()}}>
                    <img src={this.props.foto} className= "productFoto" alt=""/>
                    <div>
                        <h2>{(this.props.geregistreerd)?'Klant: ':'Gast: '}{this.props.klantID}</h2><h3>{this.props.producten.length} producten: (€{this.props.prijs.toFixed(2)})</h3>
                        <p>
                            {this.props.adres}
                            <br />
                            {this.props.status}
                        </p>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                {this.props.producten.map((product) => { 
                                    return (
                                    <tr>
                                        <td>{this.props.producten.indexOf(product) + 1}.</td>
                                        <td>{product.naam}</td>
                                        <td>€{product.prijs}</td>
                                    </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            );
        } 
    }
}

export default BestelGeschiedenisItem;
