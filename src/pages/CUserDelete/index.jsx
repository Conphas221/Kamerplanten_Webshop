import React, { Component } from "react";

// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import CrudUserDelete from "../../components/CrudUserDelete";

class CUserDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="CUserDelete" simple>
          <div className="wrapper">
            <SimpleHeading
              title="User Delete"
              description="Hier komt de delete van user"
            />
            <CrudUserDelete />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default CUserDelete;
