import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Chart from './Chart';
import Loading from './Loading';

class SingleStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
      weeklyChart: [],
      dataset: {},
      loading: true
    };

    this.getStock = this.getStock.bind(this);
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.getStock();
  }

  getStock = () => {
    const { symbol } = this.props.match.params;
    const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbol}&types=quote,news,chart,logo&range=1m&last=5`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          stock: json[symbol.toUpperCase()],
          weeklyChart: json[symbol.toUpperCase()].chart.slice(-5)
        });
      })
      .then(() => this.createChart())
      .then(() => this.setState({ loading: false }))
      .catch(err => console.error(err));
  };

  createChart = () => {
    const { weeklyChart } = this.state;
    const labels = [];
    const data = [];

    for (let chart of weeklyChart) {
      labels.push(chart.label);
      data.push(chart.close);
    }

    const dataset = {
      labels,
      datasets: [
        {
          label: 'USD',
          data,
          fill: true,
          borderColor: '#0E0E52',
          backgroundColor: 'transparent'
        }
      ]
    };
    this.setState({ dataset });
  };

  render() {
    const { stock, weeklyChart, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div id="single-stock" className="animated fadeIn">
        <div className="text-center wrapper">
          <Link to={stock.quote.symbol.toLowerCase()}>
            <h1>{stock.quote.symbol}</h1>
          </Link>
          <h3>{stock.quote.companyName}</h3>
          <p>({stock.quote.primaryExchange})</p>
          <div className="single-stock-flex">
            <div>
              <img src={stock.logo.url} alt={stock.quote.companyName} />
            </div>
            <div>
              <p>Current:</p>
              <p className="text-bold">Price: {stock.quote.latestPrice} USD</p>
              <p
                className={
                  Number(stock.quote.change) >= 0
                    ? 'green text-bold'
                    : 'red text-bold'
                }
              >
                {stock.quote.change} ( {stock.quote.changePercent})%
              </p>
            </div>
          </div>
          <p>Updated: {stock.quote.latestTime}</p>
        </div>
        <hr />
        <div>
          <h1 className="text-center">Five Day Report</h1>
          <Chart data={this.state.dataset} />
          {weeklyChart.reverse().map((chart, i) => {
            return (
              <div key={i} className="inner-div">
                <h2 className="text-center">
                  {chart.label}, {chart.date.slice(0, 4)}
                </h2>
                <div className="weekly-stats wrapper">
                  <div>
                    <p className="text-bold">Close: {chart.close}</p>
                    <p
                      className={
                        Number(chart.change) >= 0
                          ? 'green text-bold'
                          : 'red text-bold'
                      }
                    >
                      {chart.change}
                    </p>

                    <p
                      className={
                        Number(chart.change) >= 0
                          ? 'green text-bold'
                          : 'red text-bold'
                      }
                    >
                      ({chart.changePercent})%
                    </p>
                  </div>
                  <div>
                    <p>Open: {chart.open}</p>
                    <p>High: {chart.high}</p>
                    <p>Low: {chart.low}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SingleStock;
