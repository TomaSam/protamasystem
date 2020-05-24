import React, { Component } from 'react';
import '../App.css';
import Service from './Service';
import { FaEdit, FaTrashAlt, FaPlusSquare, FaFileAlt } from "react-icons/fa";
import {Link} from 'react-router-dom';
import ProjectSearch from './ProjectSearch';
import { IconContext } from "react-icons";

class ProjectsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sortedprojects: [],
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
            const sortedprojects = projects.sort(function(a, b) {
                return b.projectId - a.projectId;
            });
            console.log(sortedprojects);
            this.setState({sortedprojects});
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
        const sortedprojects = projects.sort(function(a, b) {
            return b.projectId - a.projectId;
        });
        console.log(sortedprojects);
        this.setState({sortedprojects});
    }

    render() {
        return (
            <div className="content-container">
               <ProjectSearch search={this.search}/>
                {/* <button className="btn btn-info btn-lg pt-pr-pb-5" 
                onClick = {() => this.createProject()}><FaPlusSquare /></button> */}
                <div >
                <IconContext.Provider value={{ className: "icon-class-1" }}  >
                    <div>
                        <FaPlusSquare onClick = {() => this.createProject()} title="Create new project" />
                    </div>
                </IconContext.Provider>
                
                <h3 className="text-center pb-3">List of Projects</h3>
                </div>
                <div>
                {this.state.message && <h4>test{this.state.message}</h4>}
                </div>
                <table className="table">
                    <thead className="thead-primary">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">Progress</th>
                        <th scope="col">View</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.sortedprojects.map((project, i) =>
                        <tr key={project.projectId}>
                            <th scope="row">{i+1}</th>
                            <td>{project.projectTitle}</td>
                            <td>
                                <span className={this.changeBtnColor(project.projectStatus)}>
                                {project.projectStatus}</span></td>
                            <td>{this.generalTasks(project.projectId)}/{this.inprogressTasks(project.projectId)}</td>  
                            <td>
                                {/* <Link to={`/api/projects/${project.projectId}`}>
                                <button className="btn btn-info" ><MdPageview />
                                </button>
                                </Link> */}
                                <Link to={`/api/projects/${project.projectId}`}>
                                <IconContext.Provider value={{ className: "icon-class" }}  >
                                    <div>
                                        <FaFileAlt />
                                    </div>
                                </IconContext.Provider>
                                </Link>
                            </td>
                            <td>
                                {/* <Link to={`/api/projects/update/${project.projectId}`}>
                                <button className="btn btn-info"><FaEdit />
                                </button>
                                </Link> */}
                                <Link to={`/api/projects/update/${project.projectId}`}>
                                <IconContext.Provider value={{ className: "icon-class" }}  >
                                    <div>
                                        <FaEdit />
                                    </div>
                                </IconContext.Provider>
                                </Link>
                            </td>
                            <td>
                                {/* <button className="btn btn-info" 
                                onClick={() => this.deleteProject(project.projectId)}><FaTrashAlt />
                                </button> */}
                                <IconContext.Provider value={{ className: "icon-class" }}>
                                    <div>
                                        <FaTrashAlt onClick={() => this.deleteProject(project.projectId)} />
                                    </div>
                                </IconContext.Provider>
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