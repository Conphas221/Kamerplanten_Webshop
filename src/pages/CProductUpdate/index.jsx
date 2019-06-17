import React, { Component } from "react";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import CrudProductUpdate from "../../components/CrudProductUpdate";

class CProductUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="CProductUpdate" simple>
          <div className="wrapper">
            <SimpleHeading
              title="Product update"
              description="Hier komt de update van de product"
            />
            <CrudProductUpdate />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default CProductUpdate;
