import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AllStocks extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      loading: true
    };
    this.getStocks = this.getStocks.bind(this);
  }

  componentDidMount() {
    this.getStocks();
  }

  getStocks = () => {
    const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=tif,aapl,fb,snap,twtr,amzn&types=quote,news,chart,logo&range=1m&last=5`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          stocks: Object.values(json)
        });
      })
      .then(() => this.setState({ loading: false }))
      .catch(err => console.error(err));
  };

  render() {
    const { stocks, loading } = this.state;
    if (loading) return <h1>Loading...</h1>;
    return (
      <div id="all-stocks">
        {stocks.length &&
          stocks.map((stock, i) => {
            return (
              <div key={i} className="text-center inner-div">
                <div className="wrapper">
                  <Link to={stock.quote.symbol.toLowerCase()}>
                    <h1>{stock.quote.symbol}</h1>
                  </Link>
                  <h3>{stock.quote.companyName}</h3>
                  <p>{stock.quote.primaryExchange}</p>
                  <div className="all-stocks-flex">
                    <div>
                      <img src={stock.logo.url} alt={stock.quote.companyName} />
                    </div>
                    <div>
                      <p className="text-bold">
                        Price: {stock.quote.latestPrice} USD
                      </p>

                      <p
                        className={
                          Number(stock.quote.change) >= 0
                            ? 'green text-bold'
                            : 'red text-bold'
                        }
                      >
                        {stock.quote.change} ({stock.quote.changePercent})%
                      </p>
                    </div>
                  </div>
                  <p>Updated: {stock.quote.latestTime}</p>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default AllStocks;
