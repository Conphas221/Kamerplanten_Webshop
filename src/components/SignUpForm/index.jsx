import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import request from "superagent";
import Button from "../../components/Button";
let passwordHash = require('password-hash');
class SignUpForm extends Component {

   constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }
  componentDidMount(){
    fetch('http://localhost:5000/api/geregistreerdeklant/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });
  } 
    state = {
          loginid: null,
          hashpass: null,
          voornaam: '',
          voornaamError: '',
          achternaam: '',
          achternaamError: '',
          loading: true,
          response: null,
         /* adress: '',
          adressError: '',
          adress1: '',
          adress1Error: '',
          adress2: '',
          adress2Error: '',
          adress3: '',
          adress3Error: '', */
          email: '',
          emailError: '',
          wachtwoord: '',
          wachtwoordError: '',
          wachtwoord1: '',
          wachtwoord1Error: '',
          email1: '',
          email1Error: '',
          wachtwoord2: '',
          wachtwoord2Error: '',
          admin: false,
          toHome: false,
          regisucc: false,
          loginsucc: false

    };
    change = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
    validate = () => {
      let isError = false;
      const errors = {
          voornaamError: '',
          achternaamError: '',
        /*  adressError: '',
          adress1Error: '',
          adress2Error: '',
          adress3Error: '', */
          emailError: '',
          wachtwoordError: '',
          wachtwoord1Error: ''
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
  /*    //adress straat
      if (this.state.adress.length === 0){
        isError = true;
        errors.adressError = 'Vul hier uw  straatnaam in '
      }
      else if (this.state.adress.length < 3 || this.state.adress.length > 50){
        isError = true;
        errors.adressError = 'Vul een langer of kortere straatnaam in'
      }
      else if (this.state.adress.match(/[!@#\$%\^&\*\(\)\[\]:;'",\. 0-9]/i) || this.state.adress.match(/[-]/i )){
        isError = true;
        errors.adressError = 'alleen leestekens mogen gebruikt worden'
      }
      //adress1 huisnummer
      if (this.state.adress1.length === 0){
        isError = true;
        errors.adress1Error = 'Vul hier uw huisnummer in'
      }
      else if (this.state.adress1.length > 5 ){
        isError = true;
        errors.adress1Error = 'Vul een geldige huisnummer in'
      }
      else if (this.state.adress1.match(/[-]/i )){
        isError = true;
        errors.adress1Error = 'min getal zijn niet mogelijk'
      }
      //adress2 postcode
      if (this.state.adress2.length === 0){
        isError = true;
        errors.adress2Error = 'Vul hier uw postcode in'
      }
      else if (this.state.adress2.length < 6 || this.state.adress2.length > 7){
        isError = true;
        errors.adress2Error = 'Vul een geldige postcodes in'
      }
      else if (!this.state.adress2.match(/^[0-9]{4}[a-z]{2}$/i)){
        isError = true;
        errors.adress2Error = 'vul 4 cijfers en 2 leestekens in'
      }
      
      //adress3 woonplaats
      if (this.state.adress3.length === 0){
        isError = true;
        errors.adress3Error = 'Vul hier uw woonplaats in '
      }
      else if (this.state.adress3.length < 3 || this.state.adress3.length > 70){
        isError = true;
        errors.adress3Error = 'Vul een geldige woonplaats in'
      }
      else if (this.state.adress3.match(/[!@#\$%\^&\*\(\)\[\]:;'",\. 0-9]/i)){
        isError = true;
        errors.adress3Error = 'alleen leestekens mogen gebruikt worden'
      } */

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
      else if (this.state.email.match(/[!#$%^&*()[]:;'", ]/i)){
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
      else if (this.state.wachtwoord.match(/[!#$%^&*()[]:;'", ]/i)){
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
        this.setState({
          ...this.setState,
          ...errors
        });
      return isError;
    }
    validate1 = () => {
      let isError = false;
      const errors = {
          email1Error: '',
          wachtwoord2Error: ''
      };
      //email 
      if (document.getElementById('email1').value === ""){
        isError = true;
        errors.email1Error = 'Vul hier uw email in'
        document.getElementById('email1').style.borderColor = "red";
      }
      else if (this.state.email1.length < 7 || this.state.email1.length > 50 || this.state.email1.indexOf("@") === -1){
        isError = true;
        errors.email1Error = 'Vul een geldig emailadress in'
        document.getElementById('email1').style.borderColor = "red";
      }
      else if (this.state.email1.match(/[!#$%^&*()[]:;'", ]/i)){
        isError = true;
        errors.email1Error = 'alleen leestekens mogen gebruikt worden'
        document.getElementById('email1').style.borderColor = "red";
      }
      else{
        document.getElementById('email1').style.borderColor = "green";
      }
      //wachtwoord
      if (document.getElementById('wachtwoord2').value === ""){
        isError = true;
        errors.wachtwoord2Error = 'Vul hier uw wachtwoord in'
        document.getElementById('wachtwoord2').style.borderColor = "red";
      }
      else{
        document.getElementById('wachtwoord1').style.borderColor = "green";
      }
    
        this.setState({
          ...this.setState,
          ...errors
        });
      return isError;
    }
    async addRegister(register) {
      console.log("ik zit nu in de register functie")
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

    }
    onSubmit = e => {
      e.preventDefault();
      const err = this.validate();
      
      
      if (!err) {
        let vanaam = this.state.voornaam + " " + this.state.achternaam;
      let password = this.state.wachtwoord;
      let hashedPassword = passwordHash.generate(password);
      const register = {
        naam: vanaam,
        email: this.state.email,
        wachtwoord: hashedPassword,
        admin: false
      }
      let jsonregi = JSON.parse(JSON.stringify(register));
      //let register = [naam,this.state.email,hashedPassword];
      console.log(jsonregi);
      console.log(this.state);
        request.post(`http://localhost:5000/api/geregistreerdeklant/`)
        //.send(new FormData(document.getElementById('SignUp')))
        //.set('Content-Type', 'application/json')
        //.type('form') 
        .send(jsonregi)
        .then(res => {
          //alert('register succesvol'+ hashedPassword)
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
          regisucc: true
          });
        });
      }

    };
    onSubmit1 = e => {
      //let password2 = this.state.wachtwoord2;
      //let hashedPassword2 = passwordHash.generate(password2);
      const login = {
        email: this.state.email1,
        wachtwoord: this.state.wachtwoord2
      }
      
      let jsonlogi = JSON.parse(JSON.stringify(login));
      console.log(jsonlogi);


//console.log(passwordHash.verify(this.state.wachtwoord, hashedPassword)); // true
//console.log(passwordHash.verify('test1234', hashedPassword2)); // true
e.preventDefault();
console.log( this.state.items);
console.log(this.state);
const err1 = this.validate1();
if (!err1) {
  let checkpass;
  console.log("email" + this.state.email1);
  //if ('http://localhost:5000/api/geregistreerdeklant/' + this.state.email1 == )
  request.get('http://localhost:5000/api/geregistreerdeklant/' + this.state.email1)
        .then(res => {
         
          var localid = res.body.id;
          var localnaam = res.body.naam;
          var localemail = this.state.email1;
          var localpass = res.body.wachtwoord;
          var localadmin = JSON.stringify(res.body.admin);
          
          this.setState({
            loginid: localid,
            hashpass: localpass
          });
          const storage = {
            id: this.state.loginid,
            naam: localnaam,
            email: localemail,
            wachtwoord: this.state.hashpass,
            admin: localadmin
          };
          

          checkpass = (passwordHash.verify(this.state.wachtwoord2, res.body.wachtwoord))
          console.log("binnen de then"+ this.state.loginid); // true
          if (checkpass === true) {
              request.post(`http://localhost:5000/api/sessie/`)
              //.send(new FormData(document.getElementById('SignUp')))
              //.set('Content-Type', 'application/json')
              //.type('form') 
              .send(jsonlogi)
              .then(res => {
                //alert('Login succesvol' + res.body)
                sessionStorage.setItem('SessieID', JSON.stringify(res.body));
                
                sessionStorage.setItem('klantID', JSON.stringify(storage));
                sessionStorage.setItem('emailID', JSON.stringify(this.state.email1));
                //localStorage.setItem('Login2', JSON.parse(JSON.stringify(this.state.hasspass)));
                this.setState({
                  email1: '',
                  email1Error: '',
                  wachtwoord2: '',
                  wachtwoord2Error: '',
                  admin: false,
                  loginsucc: true         
                });
          
          }
          ); 
          }
          else{
            alert('Username of wachtwoord incorrect');
          }
        }).catch((err) => alert('Email staat niet in het systeem.'));
  console.log("buiten de then"+ this.state.loginid);
        
  /*request.post(`http://localhost:5000/api/sessie/`)
        //.send(new FormData(document.getElementById('SignUp')))
        //.set('Content-Type', 'application/json')
        //.type('form') 
        .send(jsonlogi)
        .then(res => {
          if(res.body === 0){
            alert('Username of wachtwoord incorrect')
          }
          else{
            alert('Login succesvol')
            this.setState({
              email1: '',
              email1Error: '',
              wachtwoord2: '',
              wachtwoord2Error: '',
              toHome: true
            
          });
          this.props.history.push('/inloggen')
          }
        }); */
        
  //console.log(JSON.stringify(register));
  //this.addRegister(register);
}

        
    

};

render() {


  /*  var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>
    }
    else {
      
    } */
    var { regisucc, loginsucc } = this.state;
    if(this.state.regisucc === true){
      setTimeout(() => {
        this.setState({
        regisucc: false
      })
    }, 3000);
      return <div id="succes">Registratie is succesvol</div>;
      
      

    }
    if(this.state.loginsucc === true){
        setTimeout(() => {
          this.setState({
          loginsucc: false
        })
        this.props.history.push('/Account')
      }, 3000);
      return <div id="succes">Login is succesvol</div>
    }
  
    
    return (
      
<div>
<form className="SignUp" onSubmit={this.onSubmit}>
    <h1>Registreren</h1>
    <p>Vul hier u persoonsgegevens in om een account aan te maken</p>
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
    { /*   <input
          type="string"
          name="adress"
          placeholder="Straat"
          value={this.state.adress}
          onChange={e => this.change(e)}
          errorText={this.state.adressError}
          aria-label="adress"
        /><input
        type="number"
        name="adress1"
        placeholder="huisnummer"
        value={this.state.adress1}
        onChange={e => this.change(e)}
        errorText={this.state.adress1Error}
        aria-label="adress1"
      />
        <br/>
        <span> {this.state.adressError}</span><span> {this.state.adress1Error}</span>
        <br />
        <input
        type="string"
        name="adress2"
        placeholder="Postcode"
        value={this.state.adress2}
        onChange={e => this.change(e)}
        errorText={this.state.adress2Error}
        aria-label="adress2"
      />
      <input
        type="string"
        name="adress3"
        placeholder="Woonplaats"
        value={this.state.adress3}
        onChange={e => this.change(e)}
        errorText={this.state.adress3Error}
        aria-label="adress3"
      />
        <br/>
        <span> {this.state.adress2Error}</span><span> {this.state.adress3Error}</span>
    <br /> */ }
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
        </div>
      </fieldset>
      <Button onClick={e => this.onSubmit(e)}>Registreer</Button>

      </form> 
    <form className="Login" onSubmit={this.onSubmit1}>
    <h1>Inloggen</h1>
    <p>Vul hier u accountgegevens in om in te loggen</p>
    <fieldset>
      <div className="fieldsetDiv">
      <input
        type="email"
        name="email1"
        id="email1"
        placeholder="E-mailaddress"
        onChange={e => this.change(e)}
        errorText={this.state.email1Error}
        aria-label="emailaddress"
      /><br />
      <span> {this.state.email1Error}</span>
      <br/>
      <input
        type="password"
        name="wachtwoord2"
        id="wachtwoord2"
        placeholder="Wachtwoord"
        onChange={e => this.change(e)}
        errorText={this.state.wachtwoord2Error}
        aria-label="wachtwoord2"
      />
      <br />
      <span> {this.state.wachtwoord2Error}</span>
      <br />
      
      
      </div>
    </fieldset>
      <Button class="Login" onClick={e => this.onSubmit1(e)}>Login</Button>
      
    
    </form> 
  
  </div>
      );
    }
  }

  export default withRouter(SignUpForm);