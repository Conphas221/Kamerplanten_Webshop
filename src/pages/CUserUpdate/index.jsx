import React, { Component } from "react";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import CrudUserUpdate from "../../components/CrudUserUpdate";

class CUserUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="CUserUpdate" simple>
          <div className="wrapper">
            <SimpleHeading
              title="User update"
              description="Hier komt de update van de gebruiker"
            />
            <CrudUserUpdate />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default CUserUpdate;
