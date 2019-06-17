import React, { Component } from "react";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import CrudProductView from "../../components/CrudProductView";

class CProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="CProductView" simple>
          <div className="wrapper">
            <SimpleHeading
              title="Product view"
              description="Hier vind u de product gegevens"
            />
            <CrudProductView />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default CProductView;
