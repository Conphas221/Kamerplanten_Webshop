import React, { Component } from "react";
import { Link } from "react-router-dom";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import UserView from "../../components/UserView";

class UView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="Uview" simple>
          <div className="wrapper">
            <SimpleHeading
              title="User view"
              description="Hier vind u de user gegevens"
            />
            <UserView />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default UView;
