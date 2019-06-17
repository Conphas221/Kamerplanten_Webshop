import React, { Component } from "react";

class BetaalOverzichtItem extends Component {
  // constructor(props) {
  //   super(props);

  // }
  render() {
    return <tr>
        <td>{this.props.aantal}</td>
        <td>{(this.props.naam.length < 24)? this.props.naam : this.props.naam.substr(0,20) + '...'}</td>
        <td>€{(this.props.aantal * this.props.prijs).toFixed(2)}</td>
    </tr>
  }
}
export default BetaalOverzichtItem;