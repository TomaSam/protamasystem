import React, { Component } from 'react';
import '../App.css';
import Service from './Service';
import { MdPageview } from "react-icons/md";
import { FaEdit, FaTrashAlt, FaRegEdit } from "react-icons/fa";
import {Link} from 'react-router-dom';
import ProjectSearch from './ProjectSearch';

class ProjectsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            tasks: [],
            message: null
    }
    this.getProjects = this.getProjects.bind(this);
}

    componentDidMount() {
        this.getProjects();
       
        Service.getTasks()
        .then((result) => {
            const tasks = result.data;
            console.log(tasks);
            this.setState({tasks});
        })
    }

    getProjects() {
    Service.getProjects()
        .then(result => {
            console.log(result);
            const projects = result.data;
            this.setState({projects});
        })
    }

    changeBtnColor = (status) => {
        return status === 'INPROGRESS'? "badge badge-danger": 
                status === 'COMPLETED'? "badge badge-success": "badge badge-warning";    
    };

    createProject = () => {
         this.props.history.push(`/api/projects/new`);
    }

    deleteProject(projectId) {
        Service.deleteProject(projectId)
            .then(respose => {this.getProjects()})
    }

    // editProject(projectId) {
    //     this.props.history.push(`/api/projects/update/${projectId}`);
    // }

    generalTasks = (id) => {
        return this.state.tasks.filter(task => task.project.projectId === id).length;
        // console.log(this.state.tasks.filter(task => task.project.projectId == id).length);
    }

    inprogressTasks = (id) => {
        return this.state.tasks.filter(task => task.project.projectId === id)
        .filter(t => t.taskState === "INPROGRESS").length;
    }

    search = (projects) => {
        console.log(projects);
        if (projects.length >= 0) {
            this.setState({projects});
        }
        else {
            this.setState({message: 'Project NOT FOUND'})
        }
        
    }
    

    render() {
        return (
            <div className="content-container">
               <ProjectSearch search={this.search}/>
                <button className="btn btn-info btn-lg pt-pr-pb-5" 
                onClick = {() => this.createProject()}><FaRegEdit />Create Project</button>
                <h3 className="text-center pb-3">List of <code>Projects</code></h3>
                <div>
                {this.state.message && <h4>test{this.state.message}</h4>}
                </div>
                <table className="table table-striped">
                    <thead className="thead-primary">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">General<br></br>tasks</th>
                        <th scope="col">InProgress<br></br>tasks</th>
                        <th scope="col">View</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.projects.map((project, i) =>
                        <tr key={project.projectId}>
                            <th scope="row">{i+1}</th>
                            <td>{project.projectTitle}</td>
                            <td>
                                <span className={this.changeBtnColor(project.projectStatus)}>
                                {project.projectStatus}</span></td>
                            <td>{this.generalTasks(project.projectId)}</td>
                            <td>{this.inprogressTasks(project.projectId)}</td>  
                            <td>
                                <Link to={`/api/projects/${project.projectId}`}>
                                <button className="btn btn-info" ><MdPageview />
                                </button>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/api/projects/update/${project.projectId}`}>
                                <button className="btn btn-info"><FaEdit />
                                </button>
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-info" 
                                onClick={() => this.deleteProject(project.projectId)}><FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    

}

export default ProjectsList