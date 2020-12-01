import React, {Component} from 'react';
import ReactApexChart from 'react-apexcharts';
import Service from './Service';

class ProjectChart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        options: {
          labels: ['New', 'InProgress', 'Completed']
        },
        series: []
      };
    }

    componentDidMount() {
        this.getProjects();
    }
 
  getProjects() {
    Service.getProjects()
        .then(result => {
            console.log(result);
            const projects = result.data;
            const newProjects = projects.filter(function(element) {
                return element.projectStatus === "NEW";
            }).length;
            const inprogress = projects.filter(function(element) {
              return element.projectStatus === "INPROGRESS";
            }).length;
            const completed = projects.filter(function(element) {
              return element.projectStatus === "COMPLETED";
            }).length;
            this.setState({
              series: this.state.series.concat(newProjects, inprogress, completed)});
        })
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
