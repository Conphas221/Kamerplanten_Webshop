import React, { Component } from "react";
import request from "superagent";


// layout
import LayoutDefault from "../../layout/Default";

// components
import Loading from "../../components/Loading";
import ProductGrid from "../../components/ProductGrid";
import Pagination from "../../components/Pagination";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      response: null,
      cid: this.props.match.params.cID
    };
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

  render() {
    console.log("params",this.props.match.params.cID,this.props.match.params.page,"statecid",this.state.cid)
    const { loading, response } = this.state;
    return (
      <React.Fragment>
        
        <LayoutDefault simple="true" className="overview">
          <div className="wrapper">
            {loading ? (
              <Loading text="Producten ophalen..." />
            ) : response && response && response.length > 0  ? (
              [
            //id=pageSize voorraad=total_pages categorieID=page
            //vieze hack
                <Pagination
                  perPage={response[response.length-1].id}
                  totalPages={response[response.length-1].voorraad}
                  currentPage={response[response.length-1].categorieID}
                  key="pagination"
             
                  //  .__(.)< (MEOW)
                  //   \___)   

                />,
                
                <ProductGrid items={response.splice(0,response.length-1)} key="grid" />
                
              ]
            ) : (
              <p>Geen producten gevonden...</p>
            )}
          </div>
        </LayoutDefault>
        
      </React.Fragment>
    );
  }
}

export default Overview;
