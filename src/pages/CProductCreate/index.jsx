import React, { Component } from "react";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import CrudProductCreate from "../../components/CrudProductCreate";

class CProductCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="CProductCreate" simple>
          <div className="wrapper">
            <SimpleHeading
              title="product Create"
              description="Hier maak je de product account"
            />
            <CrudProductCreate />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default CProductCreate;
