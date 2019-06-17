import React, { Component } from "react";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import CrudProductDelete from "../../components/CrudProductDelete";

class CProductDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="CProductDelete" simple>
          <div className="wrapper">
            <SimpleHeading
              title="Product Delete"
              description="Hier komt de delete van product"
            />
            <CrudProductDelete />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default CProductDelete;
