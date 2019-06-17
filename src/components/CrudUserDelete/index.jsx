import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import request from "superagent";
import Collapsible from 'react-collapsible';

// components
import Button from "../../components/Button";

class CrudUserDelete extends Component {
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

export default withRouter(CrudUserDelete);
