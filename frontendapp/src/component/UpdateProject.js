import React, { Component } from 'react';
import Service from './Service';

class UpdateProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectId: this.props.match.params.projectId,
            projectTitle: '',
            projectDescription: '',
            projectStatus: ''
        }
    }

    componentDidMount() {
        Service.getProject(this.state.projectId)
        .then(response => this.setState({
            projectTitle: response.data.projectTitle,
            projectDescription: response.data.projectDescription,
            projectStatus: response.data.projectStatus
        }))
    }
    inputChange = (event) => {
        this.setState({[event.target.name]: event.target.value,});
    };

    updateForm = (event) => {
        event.preventDefault();
        const project = {
            projectId: this.state.projectId,
            projectTitle: this.state.projectTitle,
            projectDescription: this.state.projectDescription,
            projectStatus: this.state.projectStatus,
        };

        Service.updateProject(project.projectId, project)
            .then(result => {this.props.history.push(`/api/projects`);
        });
    }


    render() {
        // const {projectId, projectTitle, projectDescription, projectStatus} = this.state
        return (
            <div className="content-container">
                <h3 className="text-center">Update Project</h3>
                    <form onSubmit={this.updateForm}>
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
                        <div className="form-group">
                            <label htmlFor="projectStatus">Project Status</label>
                            <select className="form-control" id="status"
                            value={this.state.projectStatus} name="projectStatus" onChange={this.inputChange}>
                                <option value="" selected disabled hidden>Choose Status</option>
                                <option value="NEW">NEW</option>
                                <option value="INPROGRESS">INPROGRESS</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>
                        </div>
                        <button type="submit" className="btn button-color-info">Update</button>
                    </form>
            </div>

        );
    }
}

export default UpdateProject