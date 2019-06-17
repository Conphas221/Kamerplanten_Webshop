import React, { Component } from "react";
import { Link } from "react-router-dom";

// components
import Button from "../../components/Button";

class LoginForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    console.log("submit!");
  };
  render() {
    //const { title, description } = this.props;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <fieldset>
          <input
            type="email"
            name="emailaddress"
            placeholder="E-mailaddress"
            aria-label="emailaddress"
          />
          <input
            type="password"
            name="password"
            placeholder="Wachtwoord"
            aria-label="password"
          />
          <Button type="submit">Inloggen</Button>
        </fieldset>
        <div className="form__links">
          <Link to="/wachtwoord-vergeten">Wachtwoord vergeten</Link>
          <Link to="/registreren">Nog geen account? Registreren!</Link>
        </div>
      </form>
    
    );
  }
}

export default LoginForm;
