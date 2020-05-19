import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';


class ProjectChart extends Component {
    constructor(props) {
      super(props);

      this.state = {

        options: {
          labels: ['New', 'InProgress', 'Completed']
        },
        series: [3, 3, 0]
        
      };
    }

    render() {
        return (
            <div id="chart">
                <h4>Projects Statistics</h4>
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width="400" />
            </div>
        )
    }
}

export default ProjectChart
