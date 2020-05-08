import React, { Component } from 'react';
import ProjectChart from './ProjectChart';
import TaskChart from './TaskChart';


class Main extends Component {
    render() {
        return (
            <div className="content-container">
                <div className="jumbotron">
                    <h1 className="display-4">Project Task Management System</h1>
                    <hr className="my-4" />
                    <div className="chart-display">
                    <ProjectChart />
                    <TaskChart />
                    </div>
                </div>
            </div>
        );
      }
    

}

export default Main