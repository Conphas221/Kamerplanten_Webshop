import React, { Component } from "react";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import MijnAccount from "../../components/MijnAccount";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="Account" simple>
          <div className="wrapper">
            <SimpleHeading
              title="Mijn account"
              description="Hier vind u uw gegevens en bestellingen"
            />
            <MijnAccount />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default Account;
