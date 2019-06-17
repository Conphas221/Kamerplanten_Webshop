import React, { Component } from 'react';

// layout
import LayoutDefault from '../../layout/Default';
import SimpleHeading from "../../components/SimpleHeading";
import PageHero from "../../components/PageHero";
//import logo from './components/logo.jpg';



class AboutUs extends Component {
    constructor(props) {
      super(props);
      this.state = {
        width: null
      };
    }
  
    render() {
        return (
            
            <React.Fragment>
            <LayoutDefault className="home">
              <PageHero                            
                image="https://www.euroreizen.be/userfiles/bestemming/azoren-200_200_6_xl.jpg"
              />
              <div className="AboutUsText">                
                    <SimpleHeading
                      
                      key="heading"
                    />
                
                <div>
                    <h1>About Us</h1>
                <p className="AboutUsText" >Wij zijn kameplant inc. De leverancier voor al u exotische planten. <br/>
                Samen met ons team zorgen wij voor een tropisch gevoel in u huis.<br/>
                Onze missie is een groener en schoner Nederland. Wij brengen onze missie tot stand dankzij<br/>
                inzet van de juiste software en praktisch talent.<br/>
                Sterk door service zijn we gegroeid tot de partij die we nu zijn.
                </p>
                <h1>Geschiedenis</h1>
                <p>Kamerplant inc is in 2018 opgericht door het project team 2 in samenwerking met <br/>
                hogeschool Rotterdam. Na een grondige analyse van de <br/> huidige planten markt
                kwam dit team tot ontdekking dat er een <br/>groot gat in de markt is. 
                Hier anticipeerde het team gelijk <br/> op met de start van Kamerplant Inc. <br/>
                Na de start bleek (zoals gedacht) het een regelrecht succes te zijn.
                </p>
                </div>
                </div>
            </LayoutDefault>
          </React.Fragment>

      );
    }
}

export default AboutUs;

