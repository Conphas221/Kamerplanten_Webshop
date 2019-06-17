import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
//import PageHero from "../../components/PageHero";
//import LayoutDefault from "../../layout/Default";
import request from "superagent";
import Collapsible from 'react-collapsible';
import Loader from '../../components/Loading';
import Loading from "../../components/Loading";

// components
import Button from "../../components/Button";

class CrudUserView extends Component {
   constructor(props) {
    super(props);
    this.state = {
      session: null,
      loading: true,
      name:'',
      email:'',
      delesucc: false,
      id: 0,
      gebruikers: []
    }
    this.onUpdate = this.onUpdate.bind(this);
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
  if(!this.isLoggedIn()){
    console.log('not logged in')
  }
  else{
    this.fetchData();
    
  }
}
change = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
};
isLoggedIn(){
  let sessieObject = JSON.parse(sessionStorage.getItem('SessieID'));
  let klantObject = JSON.parse(sessionStorage.getItem('klantID'));
  if(sessieObject !== null && sessieObject.id > 0 && klantObject.admin === "true"){
    return true;
  } else {
    return false;
  }
}
onUpdate(gebruiker){
  this.setState({
    
    name: gebruiker.naam,
    email: gebruiker.email,
    id: gebruiker.id
});
var testI = this.state.id;
var testE = gebruiker.email;
console.log(testE);
const update = {
  id: testI,
  email: testE
}

  var test = gebruiker.id;
  console.log(test)
  
  if(test === 0){
    console.log('werkt nog nie');
    
  }
  else{
    let jsonlogi = JSON.parse(JSON.stringify(update));
    let test = JSON.parse(JSON.stringify(update));
    console.log(test);
    console.log('test ID ' + testI);
    console.log('test Email ' + testE);
    console.log('test samen' + jsonlogi);
    sessionStorage.setItem('editID',testE);
    this.props.history.push('/crud/user/update');
    
  }
}
onDelete(gebruiker){
  if (gebruiker.id === 0){
    console.log('standaard id');
    this.setState({
    
      name: gebruiker.naam,
      email: gebruiker.email,
      id: gebruiker.id
  });
  }
  else{
    if(window.confirm("wil je zeker "+ gebruiker.naam + " " + "verwijderen?")){
      
    var testI = gebruiker.id;
    console.log(testI);
    request.delete('http://localhost:5000/api/geregistreerdeklant/'+testI)
      .then(res => {
        this.setState({
          delesucc: true
      });
      });
    }
    else{
      console.log('verwijderen gestopt');
    }
  
  

}
}

fetchData(){
  //sessionStorage.getItem('sessionid') && this.setState({
    //session: JSON.stringify(sessionStorage.getItem('sessionid')),
    //isLoading: false
  //});
  //console.log("test " + this.state.session);
  const testT = sessionStorage.getItem('klantID');
  const testS = sessionStorage.getItem('SessieID');
  console.log("testKlant" + testT);
  console.log("testSessie" + testS);
  console.log("test2" + testT.naam);


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
              loading: false
            })
            
          console.log(this.state.gebruikers);
          //var localnaam = JSON.stringify(res.body.naam);
          //var localemail = JSON.stringify(this.state.email1);
          //var localpass = JSON.stringify(res.body.wachtwoord)
          
        //}).catch((err) => console.log('kon niet session ophalen'));
}).catch((err) => console.log('parsing failed',err));
}




render() {
  if(this.state.delesucc === true){
    setTimeout(() => {
      this.setState({
      delesucc: false
    })
    window.location.reload();
  }, 3000);
    return <div id="succes">Delete is succesvol</div>;
    
    

  }
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
  if(!this.isLoggedIn()){
    return (
      <React.Fragment>
       

          <div className="wrapper">
            <div className="not-found">
              <h1 className="not-found__title">U bent niet ingelogd</h1>
              <p className="not-found__description">
                <Link to="/signup">Login met een  account om bij uw Account te komen<br/></Link>
              </p>
            </div>
          </div>
      </React.Fragment>
    );
  }
  else if (this.state.loading === true) {
    return (
      <React.Fragment>
          <div>
          <a href="http://localhost:3000/crud/user/create">
          <button class="button buttona" >Gebruiker aanmaken</button></a>
            <Loading text="Gebruikers ophalen..." />
          </div>
      
      </React.Fragment>
    );
  }
  else if (this.state.loading === false && this.state.gebruikers.length > 0){
    const {gebruikers} = this.state;

  console.log(this.state.gebruikers.email);
  return (   
  <div>
    <a href="http://localhost:3000/crud/user/create">
    <button class="button buttona" >Gebruiker aanmaken</button></a>
      {
                
            this.state.gebruikers.map(gebruiker =>{
              const {id,naam,email} = gebruiker;
              return <Collapsible trigger={"ID: " + id + " " + "Naam: " + naam} key={id} title={naam}>
                    <p class="crud">Email: {email}</p>
                    <a class="buttonu" onClick={() => this.onUpdate(gebruiker)}><Button id="buttonu" >Update</Button></a>
                    <a class="buttond" onClick={() => this.onDelete(gebruiker)}><Button id="buttond">Delete</Button></a>
              </Collapsible>
            })
          }
   
    </div>
);
}
else{
  return (
    <React.Fragment>
     

        <div className="wrapper">
          <div className="not-found">
            <h1 className="not-found__title">Er zijn geen gebruikers gevonden</h1>
            <a href="http://localhost:3000/crud/user/create">
    <button class="button buttona" >Gebruiker aanmaken</button></a>
          </div>
        </div>
    </React.Fragment>
  );

}
}
}
}

export default withRouter(CrudUserView);
