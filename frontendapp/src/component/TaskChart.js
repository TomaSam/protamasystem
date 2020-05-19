import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';


class TaskChart extends Component {
    constructor(props) {
      super(props);

      this.state = {
        options: {
          labels: ['Todo', 'InProgress', 'Done']
        },
        series: [9, 6, 5]
      };
    }

   
    render() {
        return (
            <div id="chart">
                <h4>Tasks Statistics</h4>
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width="400" />
            </div>
        )
    }
}

export default TaskChart
