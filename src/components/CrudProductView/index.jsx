import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import request from "superagent";
import { Link } from "react-router-dom";
import Collapsible from 'react-collapsible';
import Pagination from "../../components/Pagination";
import Loader from '../../components/Loading';
import Loading from "../../components/Loading";
import ProductGrid from "../../components/ProductGrid";
// components
import Button from "../../components/Button";

class CrudProductView extends Component {
   constructor(props) {
    super(props);
    this.state = {
      session: null,
      loading: true,
      response: null,
      cid: this.props.match.params.cID,
      delesucc: false,
      id: 0,
      products: []
    }
  }
  componentDidUpdate(prevProps) 
  {
    if(this.props.match.params.cID !== prevProps.match.params.cID)
      {
        if (this.props.match.params.cID && this.state.cid !== this.props.match.params.cID)
        {
            this.setState({
              cid: this.props.match.params.cID
            })
            this.getProducts(this.props.match.params.page,this.props.match.params.cID)
        }
        
      }

    
  } 

  componentWillReceiveProps(nextProps) {
    const currentParams = this.props.match.params;
    const nextParams = nextProps.match.params;
    if (currentParams.page !== nextParams.page) {
      this.getProducts(nextParams.page,this.state.cid);
    }

  }

  componentDidMount() {
    this.getProducts(this.props.match.params.page,this.state.cid);
    if(!this.isLoggedIn()){
      console.log('not logged in')
    }
    else{
      console.log(window.location.href)
      this.fetchData();
    }
  }

  async getProducts(page,cid) {
    this.setState({
      response: null,
      loading: true
    });
            // 1	Bloembollen
            // 2	Fruitbomen
            // 3	Kamerplanten
            // 4	Rozen
            // 5	Zaden


    // eslint-disable-next-line
    const res = await
    request
      .get(`http://localhost:5000/api/product?pageSize=42&page=${page}&cid=${cid}`)
      .then(response => {


       
     

        this.setState({
          response: response.body,
          loading: false
        });

      });
  }  
change = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
};

onUpdate(product){
  
   this.setState({
    
    naam: product.naam,
       prijs: product.prijs,
       id: product.id,
       beschrijving: product.beschrijving,
       voorraad: product.voorraad,
       categorieID: product.categorieID
 });
  var testI = this.state.id;
 
  const update = {
   id: testI,
  }  

   var test2 = product.id;
   console.log(this.state)
   
   if(test2 === 0){
     console.log('werkt nog nie');
   }
   else{
    sessionStorage.setItem('editpID',test2);
    this.props.history.push('/crud/product/update');
    
  }
}
onDelete(product){
  if (product.id === 0){
    console.log('standaard id');
     this.setState({
       naam: product.naam,
       prijs: product.prijs,
       id: product.id,
       beschrijving: product.beschrijving,
       voorraad: product.voorraad,
       categorieID: product.categorieID,
       bestellingen: product.bestellingen,
       
   });
  }
  else{
     if(product.bestellingen != null){
        alert('product kan niet worden verwijderd: product in bestelling');
     }
  else{
     if(window.confirm("wil je zeker "+ product.naam + " " + "verwijderen?")){
      
    var testI = product.id;
    console.log(testI);
      request.delete('http://localhost:5000/api/product/'+testI)
       .then(res => {
        
         this.setState({
           delesucc: true,
           
       });
       });
     }
      else{
       console.log('verwijderen gestopt');
     }
  
  
    }
  }
}
fetchData(){

  request.get('http://localhost:5000/api/product?pagesize=5000')
        
        .then(res => {
         
          var results = JSON.stringify(res.body.map(product =>
             ({
              id: `${product.id}` ,
              naam: `${product.naam}`,
              prijs: `${product.prijs}`,
              beschrijving: `${product.beschrijving}`,
              voorraad: `${product.voorraad}`,
              categorie: `${product.categorieID}`
              //wachtwoord: `${user.wachtwoord}`
             }
             
             )));
             var product1 = JSON.parse(results);
             this.setState({
              isLoaded: false,
              products: product1,
              loading: false,
            })
            
          console.log(this.state.products);
          //var localnaam = JSON.stringify(res.body.naam);
          //var localemail = JSON.stringify(this.state.email1);
          //var localpass = JSON.stringify(res.body.wachtwoord)
          
        //}).catch((err) => console.log('kon niet session ophalen'));
}).catch((err) => console.log('parsing failed',err));
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



render() {
  console.log("params",this.props.match.params.cID,this.props.match.params.page,"statecid",this.state.cid)
    
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
  else if (this.state.loading === true) {
    return (
      <React.Fragment>
          <div>
          <a href="http://localhost:3000/crud/product/create">
          <button class="button buttona" >product aanmaken</button></a>
            {//<Loader />
            }
            <Loading text="Producten ophalen..." />
          </div>
      
      </React.Fragment>
    );
  }
  else if (this.state.loading === false && this.state.products.length > 0) {
  const {loading, products,response} = this.state;
  
  console.log("params",this.props.match.params.cID,this.props.match.params.page,"statecid",this.state.cid)
  console.log(this.state.products);
  return ( 
      
  <div>
  
    <a href="http://localhost:3000/crud/product/create">
    <button class="button buttona" >Product aanmaken</button></a>
    
      {
                
            products.map(product =>{
              const {id,naam,prijs,beschrijving,voorraad,categorieID} = product;
              return <Collapsible trigger={"ID: " + id + " " + "Naam: " + naam} key={id} title={naam}>
                    <p class="crud">Naam: {naam}</p>
                    <p class="crud">Prijs: {prijs}</p>
                    <p class="crud">beschrijving: {beschrijving}</p>
                    <p class="crud">Voorraad: {voorraad}</p>
                    <p class="crud">Categorie: {categorieID}</p>
                    <a class="buttonu" onClick={() => this.onUpdate(product)}><Button>Update</Button></a>
                    <a class="buttond" onClick={() => this.onDelete(product)}><Button>Delete</Button></a>
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

export default withRouter(CrudProductView);
