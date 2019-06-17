import React, { Component } from "react";


// layout
//import LayoutAccount from "../../layout/Account";
import LayoutDefault from '../../layout/Default';


// components
import LoginForm from "../../components/SignUpForm";


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    }

    
    ;
  }
  render() {
    return (
      <React.Fragment>
        
        <LayoutDefault className="SignUp" simple>
          <div className="wrapper">
            
            <LoginForm />
            


          </div>
        </LayoutDefault>
      </React.Fragment>
    );
  }
}
export default SignUp;