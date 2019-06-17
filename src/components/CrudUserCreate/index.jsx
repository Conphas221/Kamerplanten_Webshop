import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import request from "superagent";
import { Link } from "react-router-dom";


// components
import Button from "../../components/Button";
let passwordHash = require('password-hash');

class CrudUserCreate extends Component {
   constructor(props) {
    super(props);
    this.state = {
      session: null,
      isloading: true,
      gebruikers: []
    }
  }
componentDidMount(){
  this.fetchData();
}
fetchData(){


}
isLoggedIn(){
  let sessieObject = JSON.parse(sessionStorage.getItem('SessieID'));
  let klantObject = JSON.parse(sessionStorage.getItem('klantID'));
  if(sessieObject !== null && sessieObject.id > 0 && klantObject.admin === "true"){
    return true;
  } else {
    return false;
  }
}
state = {
  hashpass: null,
  loading: true,
  response: null,
  voornaam: '',
  voornaamError: '',
  achternaam: '',
  achternaamError: '',
  email: '',
  emailError: '',
  wachtwoord: '',
  wachtwoordError: '',
  wachtwoord1: '',
  wachtwoord1Error: '',
  adminerror:'',
  admin: false,
  toHome: false,
  accsucc: false,
};
change = e => {
  this.setState({
    [e.target.name]: e.target.value
    
  });
};

handleOptionChange = changeEvent => {
  this.setState({
    selectedOption: changeEvent.target.value
  });
};
validate = () => {
  let isError = false;
  const errors = {
      voornaamError: '',
      achternaamError: '',
      emailError: '',
      wachtwoordError: '',
      wachtwoord1Error: '',
      adminerror: '' 
  };
  //voornaam
  if (document.getElementById('voornaam').value === ""){
    isError = true;
    errors.voornaamError = 'Vul hier uw voornaam in'
    document.getElementById('voornaam').style.borderColor = "red";
  }
  else if (this.state.voornaam.length < 3 || this.state.voornaam.length > 50){
    isError = true;
    errors.voornaamError = 'Vul een geldige voornaam in'
    document.getElementById('voornaam').style.borderColor = "red";
  }
  else if (this.state.voornaam.match(/[!@#$%^&*():;'",0-9]/i) || this.state.voornaam.match(/[-""]/i )){
    isError = true;
    errors.voornaamError = 'alleen leestekens mogen gebruikt worden'
    document.getElementById('voornaam').style.borderColor = "red";
  }
  else{
    document.getElementById('voornaam').style.borderColor = "green";
  }
  //achternaam
  if (document.getElementById('achternaam').value === ""){
    isError = true;
    errors.achternaamError = 'Vul hier uw achternaam in'
    document.getElementById('achternaam').style.borderColor = "red";
  }
  else if (this.state.achternaam.length < 3 || this.state.achternaam.length > 50){
    isError = true;
    errors.achternaamError = 'Vul een geldige achternaam in'
    document.getElementById('achternaam').style.borderColor = "red";
  }
  else if (this.state.achternaam.match(/[!@#$%^&*()[]:;'",.0-9]/i) || this.state.achternaam.match(/[-]/i )){
    isError = true;
    errors.achternaamError = 'alleen leestekens mogen gebruikt worden'
    document.getElementById('achternaam').style.borderColor = "red";
  }
  else{
    document.getElementById('achternaam').style.borderColor = "green";
  }
  //email 
  if (document.getElementById('email').value === ""){
    isError = true;
    errors.emailError = 'Vul hier uw email in'
    document.getElementById('email').style.borderColor = "red";
  }
  else if (this.state.email.length < 7 || this.state.email.length > 50 || this.state.email.indexOf("@") === -1){
    isError = true;
    errors.emailError = 'Vul een geldig emailadress in'
    document.getElementById('email').style.borderColor = "red";
  }
  else if (this.state.email.match(/[!#$%^&*()[]:;'",]/i)){
    isError = true;
    errors.emailError = 'alleen leestekens mogen gebruikt worden'
    document.getElementById('email').style.borderColor = "red";
  }
  else{
    document.getElementById('email').style.borderColor = "green";
  }
  //wachtwoord
  if (document.getElementById('wachtwoord').value === ""){
    isError = true;
    errors.wachtwoordError = 'Vul hier uw wachtwoord in'
    document.getElementById('wachtwoord').style.borderColor = "red";
  }
  else if (this.state.wachtwoord.length < 7 || this.state.wachtwoord.length > 20){
    isError = true;
    errors.wachtwoordError = 'Vul een geldig wachtwoord in'
    document.getElementById('wachtwoord').style.borderColor = "red";
  }
  else if (this.state.wachtwoord.match(/[!#$%^&*():;'",]/i)){
    isError = true;
    errors.wachtwoordError = 'alleen leestekens en cijfers mogen gebruikt worden'
    document.getElementById('wachtwoord').style.borderColor = "red";
  }
  else{
    document.getElementById('wachtwoord').style.borderColor = "green";
  }
  //wachtwoord1
  if (document.getElementById('wachtwoord1').value === ""){
    isError = true;
    errors.wachtwoord1Error = 'Vul hier nogmaals u wachtwoord in'
    document.getElementById('wachtwoord1').style.borderColor = "red";
  }
  else if (this.state.wachtwoord !== this.state.wachtwoord1){
    isError = true;
    errors.wachtwoord1Error = 'wachtwoorden komen niet overheen'
    document.getElementById('wachtwoord1').style.borderColor = "red";
  }
  else{
    document.getElementById('wachtwoord1').style.borderColor= "green";
  }
  //admin
  if (this.state.selectedOption == null){
    isError = true;
    errors.adminerror = 'kies een van de velden.'
    document.getElementById('admin1').style.borderColor = "red";
    document.getElementById('admin2').style.borderColor = "red";
  }
  else{
    document.getElementById('admin1').style.borderColor= "green";
    document.getElementById('admin2').style.borderColor= "green";
  }

    this.setState({
      ...this.setState,
      ...errors
    });
  return isError;
}
onSubmit = e => {

  e.preventDefault();
  console.log('You have selected:', this.state.selectedOption);
  const err = this.validate();
  
  
  if (!err) {
    let adminc = false
    if(this.state.selectedOption === 'option2'){
      console.log("ik kom in de admin true statement")
      adminc = true
     
      //console.log("wat is de adminstate: "+ this.state.admin);
  }
    
    console.log("wat is admin: "+adminc);
    let vanaam = this.state.voornaam + " " + this.state.achternaam;
    let password = this.state.wachtwoord;
    let hashedPassword = passwordHash.generate(password);
    const register = {
      naam: vanaam,
      email: this.state.email,
      wachtwoord: hashedPassword,
      admin: adminc
    }
  let jsonregi = JSON.parse(JSON.stringify(register));
  console.log(jsonregi);
  
    request.post(`http://localhost:5000/api/geregistreerdeklant/`)
    .send(jsonregi)
    .then(res => {
      this.setState({
        voornaam: '',
        voornaamError: '',
        achternaam: '',
        achternaamError: '',
        email: '',
        emailError: '',
        wachtwoord: '',
        wachtwoordError: '',
        admin: false,
        accsucc: true
      });
    });
  }

};




render() {
  if(!this.isLoggedIn()){
    return (
      <React.Fragment>
       

          <div className="wrapper">
            <div className="not-found">
              <h1 className="not-found__title">U bent niet ingelogd</h1>
              <p className="not-found__description">
                <Link to="/signup">Login met een admin account om bij het adminpaneel te komen<br/></Link>
              </p>
            </div>
          </div>
      </React.Fragment>
    );
  }
  else{
  var { accsucc } = this.state;
    if(this.state.accsucc === true){
      setTimeout(() => {
        this.setState({
        accsucc: false
      })
      this.props.history.push('/crud/user/view')
    }, 3000);
      return <div id="succes">Account is succesvol aangemaakt</div>;
      
      

    }

  
  return (   
  <div>
    
    <form className="SignUp crud" onSubmit={this.onSubmit}>
      <fieldset>
      <div className="fieldsetDiv">
      <input
          type="string"
          name="voornaam"
          id="voornaam"
          placeholder="voornaam"
          value={this.state.voornaam}
          onChange={e => this.change(e)}
          errorText={this.state.voornaamError}
          aria-label="voornaam"
        /><br/>
        <span> {this.state.voornaamError}</span>
        <br />
        <input
          type="string"
          name="achternaam"
          id="achternaam"
          placeholder="achternaam"
          value={this.state.achternaam}
          onChange={e => this.change(e)}
          errorText={this.state.achternaamError}
          aria-label="achternaam"
        /><br/>
        <span> {this.state.achternaamError}</span>
        <br />
    
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mailaddress"
          onChange={e => this.change(e)}
          errorText={this.state.emailError}
          aria-label="emailaddress"
        /><br />
        <span> {this.state.emailError}</span>
        <br/>
        <input
          type="password"
          name="wachtwoord"
          id="wachtwoord"
          placeholder="Wachtwoord"
          onChange={e => this.change(e)}
          errorText={this.state.wachtwoordError}
          aria-label="wachtwoord"
        />
        <br />
        <span> {this.state.wachtwoordError}</span>
        <br />
        <input
          type="password"
          name="wachtwoord1"
          id="wachtwoord1"
          placeholder="herhaling Wachtwoord"
          onChange={e => this.change(e)}
          errorText={this.state.wachtwoord1Error}
          aria-label="wachtwoord1"
        />
        <br />
        <span> {this.state.wachtwoord1Error}</span>
        <br/>
        <p>Admin?</p>
        <div className="radio">
          <label>
            <input type="radio"
             value="option2"
             id="admin1"
             errorText={this.state.adminerror}
             checked={this.state.selectedOption === 'option2'}
             onChange={this.handleOptionChange}
            />
            True
          </label>
        </div>
        <div className="radio">
          <label>
            <input
             type="radio"
             id="admin2"
             value="option1"
             errorText={this.state.adminerror}
             checked={this.state.selectedOption === 'option1'}
             onChange={this.handleOptionChange}
            />
            False
          </label><br/>
          <span>{this.state.adminerror}</span>
          <br />
        </div>
        
        </div>
      </fieldset>
      <Button onClick={e => this.onSubmit(e)}>Account aanmaken</Button>

      </form> 
   
    </div>
);
}
}
}

export default withRouter(CrudUserCreate);
