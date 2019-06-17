import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import request from 'superagent';



// Material-UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//components
import SimpleHeading from "../../components/SimpleHeading";
import WinkelmandItem from './../../components/winkelmandItem';
import { Link } from "react-router-dom";
import BetaalOverzichtItem from "../../components/BetaalOverzichtItem";
import LayoutDefault from '../../layout/Default';
import Loader from '../../components/Loading';
import { bool } from 'prop-types';




const styles = theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  typography: {
    useNextVariants: true,
  },
});

const theme = new createMuiTheme({
  palette: {
    primary: {
      main: '#43a047'
    },
    secondary: {
      main: '#000000'
    }
  }
});


  function getSteps() {
    return ['Orderlijst', 'Gegevens', 'Betaalwijze', 'Overzicht', 'Betaald'];
  }

  class payment extends Component {
    constructor(props){
      super(props);
      this.retrieveProduct = this.retrieveProduct.bind(this);
      this.productToState = this.productToState.bind(this);
      this.outputState = this.outputState.bind(this);
      this.isPresent = this.isPresent.bind(this);
      this.getAmount = this.getAmount.bind(this);
      //this.getTotal = this.getTotal.bind(this);
      this.updateLocal = this.updateLocal.bind(this);
      this.order = this.order.bind(this);     
      
      this.state = {        
        buttonDisabled: true,
        activeStep: this.setActiveStep(),
        email:'',
        emailError: false,
        emailHelperText: '',
        aanhef: '',
        naam: '',
        achternaam: '',
        straat: '',
        huisnummer: '',
        postcode: '',
        stad: '',
        betaalwijze: '',
        redirect: false,
        loading: true,
        producten: [],
        aantallen: [],
        order: [],
        geregistreerdeklant: bool,
        producten1: [],
        klantID: '',


      }

    }
    fetchData(){
      var gebruiker = "";
      if(sessionStorage.getItem('klantID2') != null){
        gebruiker = JSON.parse(sessionStorage.getItem('emailID2'));
      }
      else{
        gebruiker = JSON.parse(sessionStorage.getItem('emailID'));
      }
      //const gebruiker = JSON.parse(sessionStorage.getItem('emailID'));
      console.log('http://localhost:5000/api/geregistreerdeklant/'+ gebruiker)
      request.get('http://localhost:5000/api/geregistreerdeklant/'+ gebruiker)       
      .then(res => {
       
       var results = JSON.parse(JSON.stringify(res.body.naam));
       var test111 = res.body.naam.split(" ");
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
        naam: voor,
        achternaam: achter,
        email: res.body.email,
        id: res.body.id
      });
      console.log(results);
      console.log(test111);
    });
  }

    componentWillMount(){
      console.log('COMPONENT Will MOUNT');
      this.productToState();
    }

    

    
    productToState(){
      console.log('product to state called');
        const order = sessionStorage.getItem('order');
        const cart = localStorage.getItem('cart');
        this.setState({producten1: order});
        //console.log('order: ' + order);
        //console.log('cart: ' + cart);
        this.setState({aantallen: JSON.parse(cart)}, () => {
          
          for(let i = 0; i < this.state.aantallen.length; i++){
            const product = this.retrieveProduct(this.state.aantallen[i].id)
            .then((res) => {
              //console.log('Toevoegen: ' + res);
              this.setState({producten: this.state.producten.concat(res)}, () => {
                //console.log('State producten: ' + JSON.stringify(this.state.producten));
              }
            );
          });
        }
          }
        );
        this.setState({order: order}, () => {
          console.log('State order: ' + this.state.order);
          }
        );
        
      }
        
      getAmount(id){
        console.log('State aantallen: ' + JSON.stringify(this.state.aantallen));
        for(let i = 0; i < this.state.aantallen.length; i++){
          if(this.state.aantallen[i].id === id){
           return this.state.aantallen[i].qty;
          }
        }
      }
      
  
      isPresent(QArray, id){
        for(let i = 0; i < QArray.length; i++){
          //console.log('Vergelijk: ' + QArray[i].id + 'met: ' + id)
          if(QArray[i].id === id){
            return true;
          }
        }
        return false;
      }
  
      
  
      
    
      async retrieveProduct(id){
        return await axios.get('http://localhost:5000/api/product/' + id)
        .then((res) =>{
          return res.data;
        });
      }
  
      outputState(){
        const stateObject = this.state.producten;
        console.log('Complete state: ' + JSON.stringify(stateObject));
        //console.log('Lengte state: ' + stateObject.length);
        //console.log('producten onderdeel: ' + JSON.stringify(stateObject[0]));
        //console.log('aantallen :' + JSON.stringify(this.state.aantallen));
      }
  
      //Te roepen na increase- en decrease functies om localStorage aan de state gelijk te zetten
      updateLocal(){
        let localArray = [];
        for(let i = 0; i < this.state.aantallen.length; i++){
          localArray.push({id: this.state.aantallen[i].id, qty: this.state.aantallen[i].aantal});
        }
        window.localStorage.setItem('cart', JSON.stringify(localArray));
        console.log('Local items: ' + JSON.stringify(window.localStorage.getItem('cart')));
        console.log('stateAantallen: ' + JSON.stringify(this.state.aantallen));
        this.setState(this.state);
      }
  
      
  
      order(){
        //producten uit aantallen array tot bestelling array maken en in sessionStorage pleuren
        const aantallenArray = this.state.aantallen;
        let bestelArray = [];
        for(let i = 0 ; i < aantallenArray.length; i++){
          let productAantal = parseInt(aantallenArray[i].aantal);
          let productID = aantallenArray[i].id;
          console.log('van product ' + productID + ' hebben we: ' + productAantal);
          let currentCount = 0
          while (currentCount < productAantal){
            bestelArray.push(productID);
            currentCount += 1;
          }
        }
        sessionStorage.setItem('order', bestelArray);
        console.log('Order: '+ sessionStorage.getItem('order'));
      }

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
  
      if (this.state.aanhef.length &&
          this.state.naam.length &&
          this.state.achternaam.length &&
          this.state.email.length &&
          this.state.straat.length &&
          this.state.huisnummer.length &&
          this.state.postcode.length &&
          this.state.stad.length) {
        this.setState({
          buttonDisabled: false
        })
      } else {
        this.setState({
          buttonDisabled: true
        })
      }
  
    };

    setActiveStep = () => {
      if (this.props.loggedIn) {
        return 3
      } else {
        return 1
      }
    }
  
    componentDidMount = () => {
      if (this.props.loggedIn) {
        this.setState({
          buttonDisabled: false
        })
      }
      this.fetchData();
    }
    addBestelling = e => {

      e.preventDefault();
      if(sessionStorage.getItem('klantID') != null){
        this.setState({
          geregistreerdeklant: true
          
        })
      } else {
        this.setState({
          geregistreerdeklant: false

        })
      }       
      
      
      

      let ageregistreerdeklant = this.state.geregistreerdeklant;
    
      // let Orderproducten = this.state.producten1;
      
      let Orderproducten = []
      for (let i = 0; i < this.state.producten.length;i ++) {
        Orderproducten.push(this.state.producten[i].id)
      }
      
      // 
      let klantiD = JSON.parse(sessionStorage.getItem('klantID'));
      // 
      let astraat = this.state.straat;
      let ahuisnummer = this.state.huisnummer;
      let apostcode = this.state.postcode;
      let astad = this.state.stad;
      let aadres = (astraat + " " +  ahuisnummer + " " + apostcode + " " + astad);
      
      let klant 
      let check
      if (klantiD != null){
        klant = klantiD.id
        check = true
      }
      else{
        klant = 0
        check = false
      }
      // console.log(Orderproducten);
      // console.log("klantid "+klantiD.id);
      // console.log("adres "+aadres);
      // console.log("gerigistreerd? "+ageregistreerdeklant);

   
      const order = {
        klantID: klant,
        producten: Orderproducten,
        geregistreerd: check,
        adres: aadres,
      }
      
      console.log(order);
      
      request.post('http://localhost:5000/api/bestelling')
      .send(order)
      .then((res) => {
        console.log(res);
})
    
    }
  
    getStepContent = (stepIndex) => {
      switch (stepIndex) {
        case 0:
        return (   
          
              <div className="wrapper">
                <SimpleHeading
                  title="Winkelmand"
                  description="Een overzicht van de door u geselecteerde producten:"
                />
                <div className="betaalOverzicht">
                    <h1>Betaal overzicht</h1>
                    
              </div>
              </div>
          );

          case 1:
      return (
        
            <div className="stepper-content-container">
              <form className="order-form-details">
                <div className="order-form-details-column" id="order-form-details-column-lables">
                  <div className="order-form-details-row-label">
                    <p>Aanhef</p>
                  </div>
                  <div className="order-form-details-row-label">
                    <p>Naam</p>
                  </div>
                  <div className="order-form-details-row-label">
                    <p>Email</p>
                  </div>
                  <div className="order-form-details-row-label">
                    <p>Straat en huisnummer</p>
                  </div>
                  <div className="order-form-details-row-label">
                    <p>Postcode</p>
                  </div>
                  <div className="order-form-details-row-label">
                    <p>Stad</p>
                  </div>
                </div>
                <div className="order-form-details-column">
                  <div className="order-form-details-row-input">
                    <div className="order-form-details-radio">
                      <FormControl component="fieldset" className="order-form-details-radio">
                        <RadioGroup
                          className="order-form-details-radio"
                          aria-label="Aanhef"
                          name="aanhef"
                          value={this.state.aanhef}
                          onChange={this.handleChange('aanhef')}
                        >
                          <FormControlLabel value="Dhr." control={<Radio color="primary" />} label="Dhr." />
                          <FormControlLabel value="Mevr." control={<Radio color="primary" />} label="Mevr." />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                  <div className="order-form-details-row-input">
                    <TextField
                      id="order-input-name"
                      type="text"
                      name="naam"
                      placeholder="Naam"
                      value={this.state.naam}
                      onChange={this.handleChange('naam')}
                      onBlur={this.handleChange ('naam')}
                    />
                    <div className="order-input-divider" />
                    <TextField
                      id="order-input-achternaam"
                      type="text"
                      name="achternaam"
                      placeholder="Achternaam"
                      value={this.state.achternaam}
                      onChange={this.handleChange('achternaam')}
                      onBlur={this.handleChange ('achternaam')}
                    />
                  </div>
                  <div className="order-form-details-row-input">
                    <FormControl error={this.state.emailError}>
                      <Input
                        id="order-input-email"
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        onBlur={this.handleChange ('email')}
                        inputProps={{
                          'aria-label': 'Email'
                        }} />
                      <FormHelperText id="component-error-text">{ this.state.emailHelperText }</FormHelperText>
                    </FormControl>
                  </div>
                  <div className="order-form-details-row-input">
                    <TextField
                      id="order-input-straat"
                      type="text"
                      name="straat"
                      placeholder="Straat"
                      value={this.state.straat}
                      onChange={this.handleChange('straat')}
                      onBlur={this.handleChange ('straat')}
                    />
                    <div className="order-input-divider" />
                    <TextField
                      id="order-input-huisnummer"
                      type="text"
                      name="Huisnummer"
                      placeholder="Huisnummer"
                      value={this.state.huisnummer}
                      onChange={this.handleChange('huisnummer')}
                      onBlur={this.handleChange ('huisnummer')}
                    />
                  </div>
                  <div className="order-form-details-row-input">
                    <TextField
                      id="order-input-postcode"
                      type="text"
                      name="Postcode"
                      placeholder="Postcode"
                      value={this.state.postcode}
                      onChange={this.handleChange('postcode')}
                      onBlur={this.handleChange ('postcode')}
                    />
                  </div>
                  <div className="order-form-details-row-input">
                    <TextField
                      id="order-input-stad"
                      type="text"
                      name="Stad"
                      placeholder="Stad"
                      value={this.state.stad}
                      onChange={this.handleChange('stad')}
                      onBlur={this.handleChange ('stad')}
                    />
                    
                  </div>
                </div>
              </form>
            </div>
            
      );
      case 2:
      return (
        <div className="stepper-content-container">
          <form className="order-form-details">
            <div className="order-form-details-column" id="order-form-details-column-lables">
              <div className="order-form-details-row-label">
                <p>Betaalwijze</p>
              </div>
            </div>
            <div className="order-form-details-column">
              <div className="order-form-details-row-input">
                <FormControl>
                  <Select
                    color="primary"
                    displayEmpty
                    value={this.state.betaalwijze}
                    onChange={this.handleChange('betaalwijze')}
                  >
                    <MenuItem value="" disabled>
                      Betaalwijze
                    </MenuItem>
                    <MenuItem value={'iDeal'}>iDeal</MenuItem>
                    <MenuItem value={'Creditcard'}>Creditcard</MenuItem>
                    <MenuItem value={'Paypal'}>Paypal</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </form>
        </div>
      
      );
      case 3:
      this.outputState();
      const total = parseFloat(sessionStorage.getItem('total'));
      const totalEx = parseFloat(sessionStorage.getItem('totalEx'));
      const totalIn = parseFloat(sessionStorage.getItem('totalIn'));
      const totalBTW = parseFloat(sessionStorage.getItem('totalBTW'));
        return (  
                        
          <div className="stepper-content-container">
          <div className="order-form-details">
            <div className="order-form-details-column">
              {/* Gegevens user */}
              <span className="order-ov-span">Gegevens</span>
              <div className="order-ov-details">
                {this.state.aanhef}&nbsp;
                {this.state.naam}&nbsp;
                {this.state.achternaam}
              </div>
              <div className="order-ov-details">
                {this.state.straat}&nbsp;
                {this.state.huisnummer}
              </div>
              <div className="order-ov-details">
                {this.state.postcode}&nbsp;
                {this.state.stad}
              </div>
            </div>
            <div className="order-form-details-column">
              {/* Betaalwijze */}
              <span className="order-ov-span">Betaalwijze</span>
              <div className="order-ov-details">
                {this.state.betaalwijze}
              </div>
            </div>
            
            <div className="wrapper2">             
              <div className="betaalOverzicht2">
                  <h1>Betaal overzicht</h1>
                  Totaal: <br />
                  <table>
                    <tbody>
                      {this.state.producten.map((producten) => {
                        console.log('Een product kost: ' + JSON.stringify(producten.prijs));
                        return <BetaalOverzichtItem naam={producten.naam} aantal={this.getAmount(producten.id)} prijs={producten.prijs} />
                      })}
                    </tbody>
                  </table>
                  
                  <div className='line2'></div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Verzending:</td>
                        <td>€4,95</td>
                      </tr>
                      <tr>
                        <td>Totaal excl. BTW:</td>
                        <td>€{totalEx}</td>
                      </tr>
                      <tr>
                        <td>6% BTW: </td>
                        <td>€{totalBTW}</td>
                      </tr>
                      <tr>
                        <td><b>Totaal incl. BTW:</b></td>
                        <td><b>€{totalIn}</b></td>                    
                      </tr>
                    </tbody>
                  </table>   
              </div>
              
            </div>
              
          </div>
        </div>
          
      
          
        );
      // } if (window.localStorage.getItem('cart') === null || JSON.parse(window.localStorage.getItem('cart')).length === 0) {
      //   return (
      //   <React.Fragment>
          
      //         <SimpleHeading
      //           title="Winkelmand"
      //           description="U heeft nog geen producten aan uw winkelmand toegevoegd."
      //         />
      //         <Link to="/overzicht/0"><button class="button">Klik hier om verder te winkelen</button></Link>                
      //   </React.Fragment>
      //   );
      // } else {
      //   return <Loader />
        
      // }
      
         
      
      case 4:
      return (
        <div className="stepper-content-container">
          <h3 className="order-payment-successfull">Betaling successvol!</h3>
        </div>
      );
      default:
        return 'Uknown stepIndex';
    }
  }

  handleNext = () => {
    if (this.state.activeStep + 1 === 0) {
      this.setState(state => ({
        buttonDisabled: false
      }));
    } else if (this.state.activeStep + 1 === 1) {
      if (this.state.aanhef.length &&
        this.state.naam.length &&
        this.state.achternaam.length &&
        this.state.email.length &&
        this.state.straat.length &&
        this.state.huisnummer.length &&
        this.state.postcode.length &&
        this.state.stad.length) {
        this.setState({
          buttonDisabled: false
        })
      } else {
        this.setState({
          buttonDisabled: true
        })
      }
    } else if (this.state.activeStep + 1 === 2) {
      if (this.state.betaalwijze.length) {
        this.setState({
          buttonDisabled: false
        })
      } else {
        this.setState({
          buttonDisabled: true
        })
      }
    }

    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    if (this.state.activeStep - 1 === 0) {
      this.setState(state => ({
        // buttonDisabled: false
        redirect: true
      }));
    }

    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      
      <section className="section-container">
      {this.state.redirect ? (
        <Redirect to="/Winkelmand" push />
      ) : null}
      
        <LayoutDefault className="SignUp" simple="true">
        <SimpleHeading title="Bestellen"/>
        <div className="stepper-container">
          <Stepper activeStep={activeStep} alternativeLabel className="stepper">
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              {/* Betaalt! component */}
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
              <div className="order-action-container">
                <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                
                  
                  {activeStep === 0 | activeStep === 4 ? null : (
                    <Button
                      variant="outlined"
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                      >
                      Terug
                    </Button>
                  )}
                  {activeStep === 3 | activeStep === 4 ? null : (
                    <MuiThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        color='secondary'
                        onClick={this.handleNext}
                        disabled={this.state.buttonDisabled}>
                          Volgende
                      </Button>
                    </MuiThemeProvider>
                  )}
                  {activeStep === 3 ? (
                    <MuiThemeProvider theme={theme}>                                                              
                          <Button
                            variant="contained"
                            color='primary'
                            onClick={e => {e.preventDefault();
                              this.addBestelling(e);
                              this.setState({activeStep: this.state.activeStep + 1})}}
                              // ;() => {this.setState({activeStep: this.state.activeStep + 1})}}
                          >
                            Betalen
                          </Button>                      
                    </MuiThemeProvider>
                  ) : null}
                  {activeStep === 4 ? (
                     <Link to="/overzicht/0"><button class="button">Klik hier om verder te winkelen</button></Link>
                  ) : null}
                  
                </div>
              </div>
            </div>
          )}
        </div>
        </LayoutDefault>        
      </section>
      
        
      
    );
  }
}

  



export default withStyles(styles)(payment);