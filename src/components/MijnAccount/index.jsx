import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import request from "superagent";
import { Link } from "react-router-dom";

// components
import BestelGeschiedenis from "../BestelGeschiedenis";
import Button from "../../components/Button";

class MijnAccount extends Component {
   constructor(props) {
    super(props);
    this.state = {
      session: null,
      isloading: true,
      gebruikers: [],
      klant: ''
      
    }
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
  
componentDidMount(){
  if(!this.isLoggedIn()){
    console.log('not logged in')
    this.props.history.push('/');
    
  }
  else{
    this.fetchData();
  }
}
fetchData(){
  //sessionStorage.getItem('sessionid') && this.setState({
    //session: JSON.stringify(sessionStorage.getItem('sessionid')),
    //isLoading: false
  //});
  //console.log("test " + this.state.session);
  var testT = "";
  var testS = "";
  if(sessionStorage.getItem('klantID2') != null){
    testT = JSON.parse(sessionStorage.getItem('klantID2'));
    testS = JSON.parse(sessionStorage.getItem('SessieID2'));
    
  }
  else{
    testT = JSON.parse(sessionStorage.getItem('klantID'));
    testS = JSON.parse(sessionStorage.getItem('SessieID'));
  }
  
  console.log("testKlant" + testT);
  console.log("testSessie" + testS);
  console.log("test2" + testT.naam);
  this.setState({
    klant: testT
  })
 console.log(this.state.klant);

  //fetch('http://localhost:5000/api/geregistreerdeklant/')
  //.then(res => res.json())
  //.then(parsedJSON => console.log(JSON.stringify(parsedJSON.results)))
  //.catch(error => console.log('parsing failed', error));
  request.get('http://localhost:5000/api/geregistreerdeklant/')
        
        .then(res => {
         
          var results = JSON.stringify(res.body.map(user =>
             ({
              id: `${user.id}` ,
              email: `${user.email}`,
              naam: `${user.naam}`,
              //wachtwoord: `${user.wachtwoord}`
             }
             
             )));
             var user1 = JSON.parse(results);
             this.setState({
              isLoaded: false,
              gebruikers: user1,
              
            })
            
          console.log(this.state.gebruikers);
          //var localnaam = JSON.stringify(res.body.naam);
          //var localemail = JSON.stringify(this.state.email1);
          //var localpass = JSON.stringify(res.body.wachtwoord)
          
        //}).catch((err) => console.log('kon niet session ophalen'));
}).catch((err) => console.log('parsing failed',err));
}




render() {

  const {isLoading, gebruikers,klant} = this.state;
  const { title, description } = this.props;
  console.log(this.state.gebruikers);
  console.log(this.state.klant);

  
  return ( <div>
    
  <p class="crud">Naam: {this.state.klant.naam 
  }</p>
                        <p class="crud">Email: {this.state.klant.email
                        }</p>
                        <Link to="/mijngegevens">
                          <button class="button buttona" >Gegevens aanpassen</button>
                        </Link>
        
                  
    <BestelGeschiedenis />  
  </div>
    
  );
}
}

export default withRouter(MijnAccount);
