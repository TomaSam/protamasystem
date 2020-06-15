import React, { Component } from 'react';
import '../App.css';
import Service from './Service';
import { FaEdit, FaTrashAlt, FaPlusSquare, FaFileAlt, FaFileExport } from "react-icons/fa";
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

    exportProjects() {
        Service.exportProjects()
        .then(
            response => {
                console.log(response);
                var csvdata = window.URL.createObjectURL(new Blob([response.data]));
                console.log(csvdata);
                var downloadedDocument= document.createElement("a");
                console.log(downloadedDocument);
                downloadedDocument.href = csvdata;
                downloadedDocument.target = "_blank";
                downloadedDocument.download = "Projects.csv";
                document.body.appendChild(downloadedDocument);
                downloadedDocument.click();
            }
        )
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
    doneTasks = (id) => {
        return this.state.tasks.filter(task => task.project.projectId === id)
        .filter(t => t.taskState === "DONE").length;
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
                
                <h3 className="text-center header mt-3 mb-3">List of Projects</h3>
                
                    <div className="icon-display">
                        {/* <IconContext.Provider value={{ className: "icon-class-1" }} className="pr-10px" > */}
                            <div>
                                <FaPlusSquare onClick = {() => this.createProject()} title="Create new project" 
                                className="icon-class-1" />
                            </div>
                        {/* </IconContext.Provider> */}

                        {/* <IconContext.Provider value={{ className: "icon-class-1" }}  > */}
                            <div>
                                <FaFileExport onClick = {() => this.exportProjects()} title="Export projects" 
                                className="icon-class-1" />
                            </div>
                        {/* </IconContext.Provider> */}
                    </div>
                    <div className="float-right">
                <ProjectSearch search={this.search}/>
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
                            <td>{this.generalTasks(project.projectId)}/
                            {this.inprogressTasks(project.projectId)}/
                            {this.doneTasks(project.projectId)}</td>  
                            <td>
                                
                                <Link to={`/api/projects/${project.projectId}`}>
                                <IconContext.Provider value={{ className: "icon-class" }}  >
                                    <div>
                                        <FaFileAlt />
                                    </div>
                                </IconContext.Provider>
                                </Link>
                            </td>
                            <td>
                               
                                <Link to={`/api/projects/update/${project.projectId}`}>
                                <IconContext.Provider value={{ className: "icon-class" }}  >
                                    <div>
                                        <FaEdit />
                                    </div>
                                </IconContext.Provider>
                                </Link>
                            </td>
                            <td>
                               
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