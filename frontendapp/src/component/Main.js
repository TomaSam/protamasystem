import React, { Component } from 'react';
import ProjectChart from './ProjectChart';
import TaskChart from './TaskChart';

class Main extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         newProjects: 0,
    //         inprogress: 0,
    //         completed: 0
    //     }
    //     this.getNewProjects = this.getNewProjects.bind(this);
    //     this.getInprogress = this.getInprogress.bind(this);
    //     this.getCompleted = this.getCompleted.bind(this);
    // }

    // componentDidMount() {
    //     this.getNewProjects();
    //     this.getInprogress();
    //     this.getCompleted();
    // }

    

    render() {
        return (
            <div className="content-container">
                <div className="jumbotron">
                    <h1 className="display-4">Project Task Management System</h1>
                    <hr className="my-4" />
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <ProjectChart />
                        </div>
                        <div className="col-12 col-md-6">
                            <TaskChart />
                        </div>
                    </div>
                </div>
            </div>
        );
      }
    

}

export default Main