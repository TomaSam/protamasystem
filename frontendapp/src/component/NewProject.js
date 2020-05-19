import React, { Component } from 'react';
import '../App.css';
import Service from './Service';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class NewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectTitle: null,
            projectDescription: null,
            projectStatus: 'NEW',
            errors: {
                projectTitle: '',
                projectDescription: ''
            }
        };
    }

    inputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'projectTitle': 
              errors.projectTitle = 
                value.length < 5
                  ? 'Title must be 5 characters long!'
                  : '';
              break;
            case 'projectDescription': 
              errors.projectDescription = 
                value.length > 500
                  ? 'Description should not be longer than 500 character.'
                  : '';
              break;
            default:
              break;
        }
        
        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        });
    };

    submitForm = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info('Valid Form') }
        else {
            console.error('InvalidForm')
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
                    <form onSubmit={this.submitForm} noValidate>
                        <div className="form-group">
                            <label htmlFor="projectTitle">Project Title</label>
                            <input type="text" className="form-control" id="title" 
                            value={this.state.projectTitle} name="projectTitle" 
                            onChange={this.inputChange} noValidate />
                            {errors.projectTitle.length > 0 && <span className='error'>{errors.projectTitle}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="projectDescription">Project Description</label>
                            <textarea className="form-control" id="description" rows="3" 
                            value={this.state.projectDescription} name="projectDescription" 
                            onChange={this.inputChange} noValidate></textarea>
                            {errors.projectDescription.length > 0 && <span className='error'>{errors.projectDescription}</span>}
                        </div>
                        <button type="submit" className="btn button-color-info">Submit</button>
                    </form>
            </div>
        );
    }
}

export default NewProject