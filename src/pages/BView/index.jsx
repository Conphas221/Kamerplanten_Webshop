import React, { Component } from "react";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import BestelView from "../../components/BestelView";

class BView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="BView" simple>
          <div className="wrapper">
            <SimpleHeading
              title="Bestel view"
              description="Hier vind u de bestellingen"
            />
            <BestelView />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default BView;
