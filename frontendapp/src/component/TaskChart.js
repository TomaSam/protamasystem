import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';
import Service from './Service';


class TaskChart extends Component {
    constructor(props) {
      super(props);

      this.state = {
        series: [],
        options: {
          chart: {
            type: 'donut',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      };
      this.taskChart = this.taskChart.bind(this);
    }

    taskChart(event) {
      this.setState({
        series: [ ...this.state.series, event.target.value]
      })
    }

    // componentDidMount() {
    //   Service.getTasksTodo()
    //   .then(result => {
    //     console.log(result);
    //     const todo = result.data;
    //     todosize = todo.length;
    //     this.setState({todosize});
    //   })
    // }

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
