import React, { Component } from 'react';
import '../App.css';
import Service from './Service';

function validate(taskTitle, taskDescription, taskPriority) {
    const errors = [];
    if (taskTitle.length === 0) {
        errors.push("Fill out the Project title");
    }
    if (taskTitle.length > 0 && taskTitle.length < 5 || taskTitle.length > 255) {
        errors.push("Length of Project title should be from 5 to 255 characters.");
    }
    if (taskDescription.length === 0) {
        errors.push("Fill out the Project description");
    }
    if (taskDescription.length > 500) {
        errors.push("Project description length should be less than 500 characters");
    }
    return errors;
}

class NewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectTitle: '',
            projectDescription: '',
            projectStatus: 'NEW',
            errors: []
        };
    }

    inputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    submitForm = (event) => {
        event.preventDefault();
        const {projectTitle, projectDescription} = this.state;
        const errors = validate(projectTitle, projectDescription);
        if (errors.length > 0) {
            this.setState({errors});
            return;
        }
        const data = {
            projectTitle: this.state.projectTitle,
            projectDescription: this.state.projectDescription,
            projectStatus: this.state.projectStatus,
        };

        Service.createProject(data)
            .then(result => {this.props.history.push('/api/projects');
        });
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="content-container">
                <h3 className="text-center">Create new Project</h3>
                    <form onSubmit={this.submitForm}>
                        {errors.map(error => (
                            <p className="error-css" key={error}>Error: {error}</p>
                        ))}
                        <div className="form-group">
                            <label htmlFor="projectTitle">Project Title</label>
                            <input type="text" className="form-control" id="title" 
                            value={this.state.projectTitle} name="projectTitle" 
                            onChange={this.inputChange} />
                            {/* {errors.projectTitle.length > 0 && <span className='error'>{errors.projectTitle}</span>} */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="projectDescription">Project Description</label>
                            <textarea className="form-control" id="description" rows="5" 
                            value={this.state.projectDescription} name="projectDescription" 
                            onChange={this.inputChange}></textarea>
                            {/* {errors.projectDescription.length > 0 && <span className='error'>{errors.projectDescription}</span>} */}
                        </div>
                        <button type="submit" className="btn button-color-info">Submit</button>
                    </form>
            </div>
        );
    }
}

export default NewProject