import React, { Component } from "react";


// layout
import LayoutAccount from "../../layout/Account";

// components
import SimpleHeading from "../../components/SimpleHeading";
import LoginForm from "../../components/LoginForm";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  render() {
    return (
      <React.Fragment>
        <LayoutAccount className="login" simple="true">
          <div className="wrapper">
            <SimpleHeading
              title="Inloggen"
              description="Vul hier u accountgegevens in om in te loggen"
            />
            <LoginForm />
          </div>
        </LayoutAccount>
      </React.Fragment>
    );
  }
}

export default Login;
