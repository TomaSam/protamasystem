import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';
import Service from './Service';

class TaskChart extends Component {
    constructor(props) {
      super(props);

      this.state = {
        options: {
          labels: ['Todo', 'InProgress', 'Done']
        },
        series: []
      };
    }

    componentDidMount() {
      this.getTasks();
    }

    getTasks() {
      Service.getTasks()
        .then(result => {
            console.log(result);
            const tasks = result.data;
            const todo = tasks.filter(function(element) {
                return element.taskState === "TODO";
            }).length;
            const inprogress = tasks.filter(function(element) {
              return element.taskState === "INPROGRESS";
            }).length;
            const done = tasks.filter(function(element) {
              return element.taskState === "DONE";
            }).length;
            this.setState({
              series: this.state.series.concat(todo, inprogress, done)});
        })
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
