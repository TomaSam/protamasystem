import React, { Component } from 'react';
import Service from './Service';
import '../App.css';
import { FaTrashAlt } from "react-icons/fa";
import UpdateTask from './UpdateTask';
import TaskSearch from './TaskSearch';


class TasksList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // taskstodo: [],
            // tasksinprogress: [],
            // tasksdone: []
            tasks: []
        }
        // this.getTasksTodo = this.getTasksTodo.bind(this);
        // this.getTasksInProgress = this.getTasksInProgress.bind(this); 
        // this.getTasksDone = this.getTasksDone.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        // this.getTasksTodo();
        // this.getTasksInProgress();
        // this.getTasksDone();
        Service.getTasks()
            .then((result) => {
                const tasks = result.data;
                console.log(tasks);
                this.setState({tasks});
            })   
    }

    refresh() {
        this.componentDidMount();
    }

    // getTasksTodo() {
    //     Service.getTasksTodo()
    //         .then((result) => {
    //             const taskstodo = result.data;
    //             console.log(taskstodo)
    //             this.setState({taskstodo});
    //         })
    // }

    // getTasksInProgress() {
    // Service.getTasksInProgress()
    //     .then((result) => {
    //         const tasksinprogress = result.data;
    //         console.log(tasksinprogress)
    //         this.setState({tasksinprogress});
    //     })
    // }

    // getTasksDone() {
    //     Service.getTasksDone()
    //         .then((result) => {
    //             const tasksdone = result.data;
    //             console.log(tasksdone)
    //             this.setState({tasksdone}); 
    //         })
    // }
    
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

    deleteTask(taskId) {
        Service.deleteTask(taskId)
            .then(respose => {this.refresh()})
    }

    changePriorityColor = (priority) => {
        return priority === 'HIGHT'? "badge badge-danger float-right": 
                priority === 'LOW'? "badge badge-success float-right": "badge badge-warning float-right";
    }

    search = (tasks) => {
        console.log(tasks);
            this.setState({tasks});  
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

    refreshTasks = () => {
        window.location.reload(false);
    };

    render() {
        return (
            <div className="content-container">
                <TaskSearch search={this.search} />
                
                <h5 className="text-center mt-3 mb-3">Tasks</h5>
                    <div className="card-deck">
                        {/* TO DO List */}
                        <div className="card">
                            <div className="card-header bg-danger text-center">
                                TODO
                            </div>
                            <div className="card-body">
                                {/* {this.state.taskstodo.map(task =>  */}
                                {this.todoTaskList(this.state.tasks).map(task =>
                                <div className="card border-danger mb-3 card-size" key={task.taskId}>
                                    <div className="card-header bg-transparent border-danger text-danger">
                                        <b>#{task.taskId}</b>
                                        <span className={this.changePriorityColor(task.taskPriority)}>{task.taskPriority}</span>
                                    </div>
                                    <div className="card-body text-danger">
                                        <h5 className="card-title">{task.taskTitle}</h5>
                                        <p className="card-text">Project Title: <b>{task.project.projectTitle}</b></p>
                                        <p className="card-text">{task.taskDescription}</p>
                                    </div>
                                    <div className="btn-display">
                                        <button className="btn btn-info btn-size" 
                                            onClick={() => this.deleteTask(task.taskId)}><FaTrashAlt />
                                        </button>
                                       
                                        <UpdateTask task={task} refresh={this.refresh}/>
                                    <button className="btn btn-info mt-3 mb-3 ml-2 mr-2" 
                                        onClick={() => this.updateInprogress(task.taskId)}>
                                        INPROGRESS
                                    </button>
                                    </div>
                                </div>
                                )}
                            </div>     
                        </div>

                        {/* IN PROGRESS list */}
                        <div className="card">
                            <div className="card-header bg-warning text-center">
                                INPROGRESS
                            </div>
                            <div className="card-body">
                                {/* {this.state.tasksinprogress.map(task =>  */}
                                {this.inprogressTaskList(this.state.tasks).map(task =>
                                <div className="card border-warning mb-3 card-size" key={task.taskId}>
                                    <div className="card-header bg-transparent border-warning text-warning">
                                        <b>#{task.taskId}</b>
                                        <span className={this.changePriorityColor(task.taskPriority)}>{task.taskPriority}</span>
                                    </div>
                                        <div className="card-body text-warning">
                                            <h5 className="card-title">{task.taskTitle}</h5>
                                            <p className="card-text">Project Title: <b>{task.project.projectTitle}</b></p>
                                            <p className="card-text">{task.taskDescription}</p>
                                        </div>
                                        <div className="btn-display">    
                                            <button className="btn btn-info btn-size" 
                                                onClick={() => this.deleteTask(task.taskId)}><FaTrashAlt />
                                            </button>
                                            <UpdateTask task={task} />
                                            <button className="btn btn-info mt-3 mb-3 ml-2 mr-2" 
                                            onClick={() => this.updateDone(task.taskId)}>
                                                DONE
                                            </button>
                                        </div>       
                                </div>
                                )}
                            </div>
                        </div>
                        {/* DONE List */}
                        <div className="card">
                            <div className="card-header bg-success text-center">
                                DONE
                            </div>
                            <div className="card-body">
                                {/* {this.state.tasksdone.map(task => */}
                                {this.doneTaskList(this.state.tasks).map(task => 
                                <div className="card border-success mb-3 card-size" key={task.taskId}>
                                    <div className="card-header bg-transparent border-success text-success">
                                        <b>#{task.taskId}</b>
                                        <span className={this.changePriorityColor(task.taskPriority)}>{task.taskPriority}</span>
                                    </div>
                                    <div className="card-body text-success">
                                        <h5 className="card-title">{task.taskTitle}</h5>
                                        <p className="card-text">Project Title: <b>{task.project.projectTitle}</b></p>
                                        <p className="card-text">{task.taskDescription}</p>
                                    </div>
                                    <div className="btn-display">
                                        <button className="btn btn-info btn-size" 
                                            onClick={() => this.deleteTask(task.taskId)}><FaTrashAlt />
                                        </button>
                                        <UpdateTask task={task} />
                                        <button className="btn btn-info mt-3 mb-3 ml-2 mr-2" 
                                        onClick={() => this.updateTodo(task.taskId)}>
                                            TODO
                                        </button>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
            </div> 
        )        
    }          

}
export default TasksList