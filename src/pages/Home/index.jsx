import React, { Component } from 'react';
import request from 'superagent';
import { Link } from "react-router-dom";

// layout
import LayoutDefault from '../../layout/Default';

// components
import PageHero from '../../components/PageHero';
import Loading from '../../components/Loading';
import ProductGrid from '../../components/ProductGrid';
import SimpleHeading from '../../components/SimpleHeading';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      response: null
    };
  }

  componentDidMount() {
    this.getProducts();
    this.setState({loading: false});
  }

  async getProducts(page) 
  {// eslint-disable-next-line
    const res = await
    request.get(`http://localhost:5000/api/product?pageSize=3&page=420`)
    .then(response => {
      this.setState({
        response: response.body,
        loading: false
      });
      console.log("response13", response);
    });
  };

  render() {
    const { loading, response } = this.state;
    return (
      <React.Fragment>
        <LayoutDefault className="home">
          <PageHero
            intro
            title="Welkom!"
            description="Welkom bij kamerplant inc. De website voor al uw exclusieve planten."
            image="https://www.zoover.nl/blog/wp-content/uploads/2017/12/Kamperen-in-Kroati%C3%AB-Plitvicemeren.jpeg"
          />
          
          <div className="wrapper">
            {loading ? (
              <Loading text="Producten ophalen..." />
            ) : response && response && response.length > 0 ? (
              [
                <SimpleHeading
                  title="Trending"
                  description="Bekijk hier onze meest verkochte artikelen"
                  key="heading"
                />,
                <ProductGrid items={response.splice(0,response.length-1)} key="grid" />
              ]
            ) : (
              <p>Geen producten gevonden...</p>
            )}
            
          </div>
          <div className="wrapper_h">
            <div className="not-found">
              <p className="not-found__description">
                <Link to="/overzicht/0">klik hier om verder te winkelen.<br/></Link>
              </p>
            </div>
          </div>
        </LayoutDefault>
      </React.Fragment>
    );
  }
}

export default Home;
