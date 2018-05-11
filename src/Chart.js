import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  render() {
    return (
      <div className="chart wrapper">
        <Line
          data={this.props.data}
          width={100}
          height={400}
          options={{
            maintainAspectRatio: false,
            elements: {
              line: {
                tension: 0
              }
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
