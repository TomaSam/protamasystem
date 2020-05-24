import React, { Component } from 'react';
import '../App.css';
import Service from './Service';

function validate(taskTitle, taskDescription, taskPriority) {
    const errors = [];
    if (taskTitle.length === 0) {
        errors.push("Fill out the Task title.");
    }
    if (taskTitle.length > 0 && taskTitle.length < 5) {
        errors.push("Length of Task title should be from 5 to 75 characters.");
    }
    if (taskTitle.length > 75) {
        errors.push("Length of Task title should be less than 75 characters.");
    }
    if (taskDescription.length === 0) {
        errors.push("Fill out the Task description.");
    }
    if (taskDescription.length > 500) {
        errors.push("Task description length should be less than 500 characters");
    }
    if (taskPriority.length === 0) {
        errors.push("Choose Task priority");
    }
    return errors;
}

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskTitle: '',
            taskDescription: '',
            taskPriority: '',
            taskState: 'TODO',
            projectId: this.props.match.params.projectId,
            errors: []
        }
        console.log("Projekto id: " + this.state.projectId);
    }

    inputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    submitForm = (event) => {
        event.preventDefault();
        const {taskTitle, taskDescription, taskPriority} = this.state;
        const errors = validate(taskTitle, taskDescription, taskPriority);
        if (errors.length > 0) {
            this.setState({errors});
            return;
        }
        const data = {
            taskTitle: this.state.taskTitle,
            taskDescription: this.state.taskDescription,
            taskPriority: this.state.taskPriority,
            taskState: this.state.taskState
        };
        console.log(data);

        Service.addTask(this.state.projectId, data)
            .then(() => this.props.history.push(`/api/projects/${this.state.projectId}/tasks`))
            .then(() => this.props.history.push(`/api/projects/${this.state.projectId}`));   
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="content-container">
                <h3 className="text-center">Add new Task</h3>
                    <form onSubmit={this.submitForm}>
                        {errors.map(error => (
                            <p className="error-css" key={error}>Error: {error}</p>
                        ))}
                        <div className="form-group">
                            <label htmlFor="taskTitle">Task Title</label>
                            <input type="text" className="form-control" id="title" 
                            value={this.state.taskTitle} name="taskTitle" onChange={this.inputChange} />    
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskDescription">Task Description</label>
                            <textarea className="form-control" id="description" rows="4" 
                            // placeholder="As a [type of user], I want [an action] so that [a benefit/a value]"
                            value={this.state.taskDescription} name="taskDescription" 
                            onChange={this.inputChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskPriority">Task Priority</label>
                            <select className="form-control" id="priority"
                            name="taskPriority" onChange={this.inputChange} required defaultValue={'DEFAULT'}>
                                <option value="DEFAULT" disabled>Choose Priority</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGHT">HIGHT</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
            </div>
        );
    }
}

export default AddTask