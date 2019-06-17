import React, { Component } from "react";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import CrudUserCreate from "../../components/CrudUserCreate";

class CUserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="CUserCreate" simple>
          <div className="wrapper">
            <SimpleHeading
              title="User Create"
              description="Hier maak je de gebruikers account"
            />
            <CrudUserCreate />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default CUserCreate;
