import React, { Component } from 'react';

// components

class ProductAmount extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      amount: '1',
      added: false
    };
  }

  handleChange(event) {
    const value = event.target.value;
    const amount = isNaN(value);
    if (amount) {
      this.setState({
        amount: '1'
      });
    } else {
      this.setState({
        //amount: parseInt(value) !== NaN ? value : '0'
        amount: (!isNaN(parseInt(value))) ?  value : '0'
        
      });
    }
  }

  updateAmount(type) {
    const stateAmount = parseInt(this.state.amount);
    let amount = stateAmount;
    if (type === 'minus') {
      amount = stateAmount - 1;
      if (amount <= 1) {
        amount = '1';
      }
    } else {
      amount = stateAmount + 1;
    }

    this.setState({
      amount: amount
    });
  }
  //addToWishList = event =>
  

  addToCart = event => {
    let timer;
    clearTimeout(timer);
    event.preventDefault();
    this.setState({
      added: true
    });
    timer = setTimeout(() => {
      this.setState({
        added: false
      });
    }, 2000);

    if (!window.localStorage.getItem('cart')) {
      window.localStorage.setItem('cart', '[]'); //FUCK KWANTITIE
    }

    let items = JSON.parse(window.localStorage.getItem('cart'));
    console.log('items', items);

    let item = {
      id: this.props.id,
      qty: this.state.amount
    };
    
    let isPresent = false;

    for(let i =0; i < items.length; i++){
      if(items[i].id === item.id){ //Als item al in local storage zit
        items[i].qty = parseInt(items[i].qty) + item.qty;
        isPresent = true;
      }
    }
    if(!isPresent){
      //Als item nog niet in local storage zit:
      items.push(item);
    }

    window.localStorage.setItem('cart', JSON.stringify(items));
  };

  render() {
    //const { update } = this.props;
    const { amount, added } = this.state;
    return [
      <div className="add-to-cart__amount">
        <span onClick={e => this.updateAmount('minus')}>
          <img src="https://i.imgur.com/SHOtF9W.png" alt="" />
        </span>
        <input type="value" value={this.state.amount} onChange={this.handleChange} />
        <span onClick={e => this.updateAmount('plus')}>
          <img src="https://i.imgur.com/RzzuXkk.png" alt="" />
        </span>
      </div>,
      <button
        onClick={this.addToCart}
        className={`button${added ? ' button--is-disabled' : ''}`}>
        {added ? 'Gelukt!' : 'Toevoegen aan winkelmand'} 
        </button>
    ];
  }
}

export default ProductAmount;
