import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import request from "superagent";
import Collapsible from 'react-collapsible';

// components
import Button from "../../components/Button";

class CrudProductDelete extends Component {
   constructor(props) {
    super(props);
    this.state = {
      session: null,
      isloading: true,
      gebruikers: []
    }
  }
  // componentDidMount(){
  //   //fetch('http://kamerplant.me:5000/api/geregistreerdeklant')
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(res => res.json())
  //     .then(json => {
  //       this.setState({
  //         isLoaded: true,
  //         items: json,
  //       })
      
  //     });
      
  // } 
  

////if (!err) {
  ////request.post(`http://localhost:5000/api/sessie/`)
        //.send(new FormData(document.getElementById('SignUp')))
        //.set('Content-Type', 'application/json')
        //.type('form') 
        //.send(jsonlogi)
        ////.then(res => {
          //alert('Account succesvol' + res.body)
          ////this.setState({
            ////email1: '',
            ////email1Error: '',
            ////wachtwoord: '',
            ////wachtwoordError: ''
          ////});
        ////});
  //console.log(JSON.stringify(register));
  //this.addRegister(register);
//}
//componentDidMount(){
  //sessionStorage.getItem('sessionid') && this.setState({
    //sessionid: JSON.parse(sessionStorage.getItem('sessionid')),
    //isLoading: false
  //});
  //console.log("test" + this.state.sesionid);
//}
componentDidMount(){
  this.fetchData();
}
fetchData(){
  //sessionStorage.getItem('sessionid') && this.setState({
    //session: JSON.stringify(sessionStorage.getItem('sessionid')),
    //isLoading: false
  //});
  //console.log("test " + this.state.session);


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
              gebruikers: user1
            })
            
          console.log(this.state.gebruikers);
          //var localnaam = JSON.stringify(res.body.naam);
          //var localemail = JSON.stringify(this.state.email1);
          //var localpass = JSON.stringify(res.body.wachtwoord)
          
        //}).catch((err) => console.log('kon niet session ophalen'));
}).catch((err) => console.log('parsing failed',err));
}




render() {

  const {gebruikers} = this.state;
  console.log(this.state.gebruikers);
  return (   
  <div>
    
      {
                
            gebruikers.map(gebruiker =>{
              const {id,naam,email} = gebruiker;
              return <Collapsible trigger={"ID: " + id + " " + "Naam: " + naam} key={id} title={naam}>
                    <p>{email}</p> <Button onClick={e => this.onChange({id})}>Update</Button> <Button onClick={e => this.onDelete({id})}>Delete</Button>
              </Collapsible>
            })
          }
   
    </div>
);
}
}

export default withRouter(CrudProductDelete);
