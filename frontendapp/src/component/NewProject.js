import React, { Component } from 'react';
import '../App.css';
import Service from './Service';

class NewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectTitle: '',
            projectDescription: '',
            projectStatus: 'NEW'
        }
    }

    inputChange = (event) => {
        this.setState({[event.target.name]: event.target.value,});
    };

    submitForm = (event) => {
        event.preventDefault();
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
        return (
            <div className="content-container">
                <h3 className="text-center">Create new <code>Project</code></h3>
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="projectTitle">Project Title</label>
                            <input type="text" className="form-control" id="title" 
                            value={this.state.projectTitle} name="projectTitle" onChange={this.inputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="projectDescription">Project Description</label>
                            <textarea className="form-control" id="description" rows="3" 
                            value={this.state.projectDescription} name="projectDescription" onChange={this.inputChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
            </div>
        );
    }
}

export default NewProject