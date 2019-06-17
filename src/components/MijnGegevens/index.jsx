import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import request from "superagent";
import { Link } from "react-router-dom";

// components
import Button from "../../components/Button";
let passwordHash = require('password-hash');
class MijnGegevens extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      session: null,
      isloading: true,
      response: null,
    }
  }
componentDidMount(){
  this.fetchData();
}
fetchData(){
  var testT = "";
  var testS = "";
  var gebruiker = "";
  if(sessionStorage.getItem('klantID2') != null){
    testT = JSON.parse(sessionStorage.getItem('klantID2'));
    gebruiker = JSON.parse(sessionStorage.getItem('emailID2'));
  }
  else{
    gebruiker = JSON.parse(sessionStorage.getItem('klantID'));
  }
  //const gebruiker = JSON.parse(sessionStorage.getItem('emailID'));
  console.log('http://localhost:5000/api/geregistreerdeklant/'+ gebruiker)
  request.get('http://localhost:5000/api/geregistreerdeklant/'+ gebruiker.email)       
  .then(res => {
   console.log('resultaat uit fetch: ' + JSON.stringify(res.text));
   var results = JSON.stringify(res.body.naam);
   var test111 = res.body.naam.split(' ');
   console.log('Toms gekke test variabele: ' + test111);
   var voor = test111[0];
   if(test111.length > 2){
     var achter = "";
    for (var i=1; i < test111.length; i++) {
      achter += test111[i] + " ";  
    } 
   }
   else{
    var achter = test111[1];
   }
   console.log(test111);
   this.setState({
    response: res.body,
    //voornaam: res.body.naam,
    //achternaam: res.body.naam,
    voornaam: voor,
    achternaam: achter,
    email: res.body.email,
    admin: res.body.admin,
    id: res.body.id


  });
  console.log(results);
  console.log(test111);
});
     


}
isLoggedIn(){
  let sessieObject = JSON.parse(sessionStorage.getItem('SessieID'));
  let klantObject = JSON.parse(sessionStorage.getItem('klantID'));
  if(sessieObject !== null && sessieObject.id > 0 && klantObject.admin === "false"){
    return true;
  } else {
    return false;
  }
}
state = {
  hashpass: null,
  loading: true,
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
  admin: null,
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
  else if (this.state.voornaam.match(/[!@#$%^&*():;'",0-9]/i) || this.state.voornaam.match(/[- ""]/i )){
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
      console.log("ik kom in de admin true statement");
      adminc = true;
     
      //console.log("wat is de adminstate: "+ this.state.admin);
  }
    
    console.log("wat is id: "+ this.state.id);
    let vanaam = this.state.voornaam + " " + this.state.achternaam;
    let password = this.state.wachtwoord;
    let hashedPassword = passwordHash.generate(password);
    const register = {
      id: this.state.id,
      naam: vanaam,
      email: this.state.email,
      wachtwoord: hashedPassword,
      admin: false
    }
  let jsonregi = JSON.parse(JSON.stringify(register));
  console.log('Te versturen: ' + jsonregi);
    
    request.put(`http://localhost:5000/api/geregistreerdeklant/`)
    .send(jsonregi)
    .then(res => {
      this.setState({
        gegevens: register,
        //id: '',
        //voornaam: '',
        //voornaamError: '',
        //achternaam: '',
        //achternaamError: '',
        //email: '',
        //emailError: '',
        //wachtwoord: '',
        //wachtwoordError: '',
        //admin: false,
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
                <Link to="/signup">Login met een account om bij je gegevens te komen<br/></Link>
              </p>
            </div>
          </div>
      </React.Fragment>
    );
  }
  else{
  const { accsucc, response } = this.state;
  console.log(response);
  //console.log(JSON.stringify(response.naam));
    if(this.state.accsucc === true){
      setTimeout(() => {
        this.setState({
        accsucc: false
      })
      if(sessionStorage.getItem('klantID') != null){
        sessionStorage.setItem('klantID2', JSON.stringify(this.state.gegevens));
        sessionStorage.setItem('emailID2', JSON.stringify(this.state.email));
      }
      else{
        sessionStorage.setItem('klantID', JSON.stringify(this.state.gegevens));
        sessionStorage.setItem('emailID', JSON.stringify(this.state.email));
      }
      
      this.isLoggedIn()
      this.props.history.push('/Account')
    }, 3000);
      return <div id="succes">Account is succesvol geupdate</div>;
      
      

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
          value={this.state.email}
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

        
        </div>
      </fieldset>
      <Button onClick={e => this.onSubmit(e)}>Account updaten</Button>

      </form> 
   
    </div>
);
}
}
}
export default withRouter(MijnGegevens);
