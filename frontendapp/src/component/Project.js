import React, { Component } from 'react';
import Service from './Service';
import '../App.css';
import {Link} from 'react-router-dom';
import TaskModal from './TaskModal';

class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: {},
            tasks: []
        }
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        Service.getProject(this.props.match.params.projectId)
        .then((result) => {
            const project = result.data;
            console.log(project);
            this.setState({project});
        });

        Service.getTasksByProjectId(this.props.match.params.projectId)
        .then((result) => {
            const tasks = result.data;
            console.log(tasks);
            this.setState({tasks});
        })
    }

    refresh() {
        this.componentDidMount();
    }

    changeBtnColor = (status) => {
        return status === 'INPROGRESS'? "badge badge-danger": 
                status === 'COMPLETED'? "badge badge-success": "badge badge-warning";    
    };

    todoTaskList = (tasks) => {
        console.log(tasks)
        return tasks.filter(task => task.taskState === "TODO");
    }

    inprogressTaskList = (tasks) => {
        return tasks.filter(task => task.taskState === "INPROGRESS");
    }

    doneTaskList = (tasks) => {
        return tasks.filter(task => task.taskState === "DONE");
    }

    changePriorityColor = (priority) => {
        return priority === 'HIGHT'? "badge badge-danger float-right": 
                priority === 'LOW'? "badge badge-success float-right": "badge badge-warning float-right";
    }

    deleteTask(taskId) {
        Service.deleteTask(taskId)
            .then(respose => {this.componentDidMount()})
    }

    changeProjectStatus = (tasks) => {
        if (tasks.length === this.doneTaskList(tasks).length) {
            this.setState({
                projectStatus: "COMPLETED"
            })
        }
        else if (this.todoTaskList(tasks) <= 0 && this.inprogressTaskList(tasks) <= 0 && this.doneTaskList(tasks) <= 0) {
            this.setState({
                projectStatus: "NEW"
            })
        }
        else {
            this.setState({
                projectStatus: "INPROGRESS"
            })
        }
    }

    exportTasks(projectId) {
        Service.exportTasks(projectId)
            .then(
                response => {
                    console.log(response);
                    var csvTasks = window.URL.createObjectURL(new Blob([response.data]));
                    console.log(csvTasks);
                    var downloadedDocument= document.createElement("a");
                    console.log(downloadedDocument);
                    downloadedDocument.href = csvTasks;
                    console.log()
                    downloadedDocument.target = "_blank";
                    downloadedDocument.download = "Tasks.csv";
                    document.body.appendChild(downloadedDocument);
                    downloadedDocument.click();
                }
            )
    }

    updateInprogress(taskId) {
        Service.updateTaskInprogress(taskId)
            .then(response => {this.refresh()})
    }

    updateDone(taskId) {
        Service.updateTaskDone(taskId)
            .then(response => {this.refresh()})
    }

    updateTodo(taskId) {
        Service.updateTaskTodo(taskId)
            .then(response => {this.refresh()})
    }

    updateCompleted(projectId) {
        Service.updateProjectCompleted(projectId)
            .then(response => {this.refresh()})
    }


    render() {
        const {projectId, projectTitle, projectDescription, projectStatus} = this.state.project;
        return (
            <div className="content-container">
                <h3 className="text-center header">Project details</h3>
                <div className="card card-margin">    
                    <div className="card-header" >
                        <span className={this.changeBtnColor(projectStatus)}>{projectStatus}</span>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{projectTitle}</h5>
                        <p className="card-text">{projectDescription}</p>
                    </div> 
                </div>

                <Link to={`/api/projects/${projectId}/tasks/new`}>
                    <button className="btn button-color btn-lg">
                        Add Task
                    </button>
                </Link>
                <Link to={`/api/projects/update/${projectId}`}>
                    <button className="btn button-color btn-lg">
                        Update Project
                    </button>
                </Link>
                <button className="btn button-color btn-lg" onClick={() => this.updateCompleted(projectId)}>
                    Mark as Completed
                </button>
                <button className="btn button-color btn-lg" onClick={() => this.exportTasks(projectId)}>
                   Export Tasks
                </button>

                    {/* Tasks List by status  */}
                    <h4 className="text-center mt-3 mb-3 header">Tasks</h4>
                    {/* <div>{this.state.tasks.length > 0 && ( */}
                        <div className="row">
                            {/* TO DO List */}
                            <div className="col-4">
                                <div>{this.todoTaskList(this.state.tasks).length > 0 && (
                                    <div>
                                        <h5 className="text-center header">TODO</h5>
                                        {this.todoTaskList(this.state.tasks).map(task => 
                                            <div key={task.taskId}>
                                                <TaskModal refresh={this.refresh} task={task}/> 
                                            </div>
                                        )}      
                                    </div>
                                )}
                                </div>
                            </div>

                            {/* IN PROGRESS list */}
                            <div className="col-4">
                                <div>{this.inprogressTaskList(this.state.tasks).length > 0 && (
                                    <div>
                                        <h5 className="text-center header">INPROGRESS</h5>
                                            {this.inprogressTaskList(this.state.tasks).map(task => 
                                                <div key={task.taskId}>
                                                    <TaskModal refresh={this.refresh} task={task}/> 
                                                </div>
                                            )}
                                    </div>
                                )}
                                </div>
                            </div>

                            {/* DONE List */}
                            <div className="col-4">
                                <div>{this.doneTaskList(this.state.tasks).length > 0 && (
                                    <div>
                                        <h5 className="text-center header">DONE</h5> 
                                            {this.doneTaskList(this.state.tasks).map(task => 
                                                <div key={task.taskId}>
                                                    <TaskModal refresh={this.refresh} task={task}/>  
                                                </div>
                                            )}
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
}

export default Project

