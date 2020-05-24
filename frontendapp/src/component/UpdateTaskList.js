import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import Service from "./Service";

class UpdateTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskId: this.props.taskId,
            taskTitle: '',
            taskDescription: '',
            taskPriority: '',
            taskState: '', 
        }

        this.state = {
            show: false,
        };
    }

    componentDidMount() {
        Service.getTaskByTaskId(this.props.task.taskId)
        .then(response => this.setState({
            taskTitle: response.data.taskTitle,
            taskDescription: response.data.taskDescription,
            taskPriority: response.data.taskPriority,
            taskState: response.data.taskState
        }))
    }

    showModal = () => {
        this.setState({
            show: true,
        });
    }

    hideModal = () => {
        this.setState({
            show: false,
        });
    }

    inputChange = (event) => {
        this.setState({[event.target.name]: event.target.value,});
    };

    updateTask = (event) => {
        event.preventDefault();
        const task = {
            taskId: this.state.taskId,
            taskTitle: this.state.taskTitle,
            taskDescription: this.state.taskDescription,
            taskPriority: this.state.taskPriority,
            taskState: this.state.taskState,
            project: this.state.project,
        };

        Service.updateTask(this.props.task.taskId, task)
        .then(respose => {this.props.refresh()});
    }

    render() {
        
        // console.log(task)
        // const { taskTitle, taskDescription, taskPriority, taskState} = this.props.task;
        return (
            <>
                <button className="btn btn-info btn-size" onClick={this.showModal}>
                    <FaEdit title="Update Task" />
                </button>
                <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show} onHide={this.hideModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Task</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={this.updateTask}>
                            <Modal.Body>
                                <div className="form-group">
                                    <label htmlFor="taskTitle">Task Title</label>
                                    <input type="text" className="form-control" id="title" 
                                    value={this.state.taskTitle} name="taskTitle" onChange={this.inputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="taskDescription">Task Description</label>
                                    <textarea className="form-control" id="description" rows="3" 
                                    value={this.state.taskDescription} name="taskDescription" onChange={this.inputChange}></textarea>
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="taskPriority">Task Priority</label>
                                    <select className="form-control" id="priority"
                                    value={this.state.taskPriority} name="taskPriority" onChange={this.inputChange}>
                                        <option value="" selected disabled hidden>Choose Priority</option>
                                        <option value="LOW">LOW</option>
                                        <option value="MEDIUM">MEDIUM</option>
                                        <option value="HIGHT">HIGHT</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="taskState">Task State</label>
                                    <select className="form-control" id="state"
                                    value={this.state.taskState} name="taskState" onChange={this.inputChange}>
                                        <option value="" selected disabled hidden>Choose State</option>
                                        <option value="TODO">TODO</option>
                                        <option value="INPROGRESS">INPROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.hideModal}>Cancel</Button>
                                <Button variant="primary" onClick={this.hideModal} 
                                type="submit">Save changes</Button>
                            </Modal.Footer>
                        </form>
                </Modal>
            </>
        )

    }
}

export default UpdateTask


