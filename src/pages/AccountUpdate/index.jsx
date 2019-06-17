import React, { Component } from "react";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import MijnGegevens from "../../components/MijnGegevens";

class AccountGegevens extends Component {
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
              title="Mijn account Gegevens"
              description="Pas hier je gegevens aan"
            />
            <MijnGegevens />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default AccountGegevens;
