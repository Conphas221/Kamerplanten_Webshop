import React, { Component } from "react";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import CrudUserView from "../../components/CrudUserView";

class CUserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="CUserView" simple>
          <div className="wrapper">
            <SimpleHeading
              title="User view"
              description="Hier vind u de user gegevens"
            />
            <CrudUserView />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default CUserView;
