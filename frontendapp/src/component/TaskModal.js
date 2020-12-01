import React, { Component } from 'react';
import '../App.css';
import Modal from 'react-bootstrap/Modal';
import { FaTrashAlt } from "react-icons/fa";
import UpdateTask from './UpdateTask';
import Service from './Service';

class TaskModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
          show: false, 
        };
    }

    showModal = () => {
        this.setState({
            show: true
        });
    };

    hideModal = () => {
        this.setState({
            show: false
        })
    }

    updateInprogress(taskId) {
      Service.updateTaskInprogress(taskId)
          .then(response => {this.props.refresh()})
    }
    updateDone(taskId) {
      Service.updateTaskDone(taskId)
          .then(response => {this.props.refresh()})
    }
    updateTodo(taskId) {
      Service.updateTaskTodo(taskId)
          .then(response => {this.props.refresh()})
    }

    changePriorityColor = (priority) => {
      return priority === 'HIGHT'? "badge badge-danger float-left mr-2": 
              priority === 'LOW'? "badge badge-success float-left mr-2": "badge badge-warning float-left mr-2";
    }

    changeStateColor = (state) => {
      return state === 'TODO'? "badge badge-danger float-left mr-2": 
              state === 'DONE'? "badge badge-success float-left mr-2": "badge badge-warning float-left mr-2";
    }

    deleteTask(taskId) {
      Service.deleteTask(taskId)
      .then(response => {this.hideModal()})
           .then(respose => {this.props.refresh()})
    }
    
    render() {
        const { taskId, taskTitle, taskDescription, taskPriority, taskState, created, updated } = this.props.task;
        return (
          <>
            <div className="task-button btn" onClick={this.showModal}>
            {taskTitle}
            </div>
    
            <Modal show={this.state.show} onHide={this.hideModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>
                  #{taskId},   {taskTitle}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <span className={this.changePriorityColor(taskPriority)} >{taskPriority}</span>
                <span className={this.changeStateColor(taskState)}>{taskState}</span><br></br> 
                <hr></hr>
                {taskDescription}
                <hr></hr>
                Created at: {created}
                <hr></hr>
                Updated at: {updated}              
              </Modal.Body>
              <Modal.Footer>
                <div className="btn-display">
                  <UpdateTask task={this.props.task} refresh={this.props.refresh} />
                  <button className="btn btn-info btn-size" 
                    onClick={() => this.deleteTask(taskId)}><FaTrashAlt title="Delete Task" />
                  </button>
                  <button className="btn btn-info mt-3 mb-3 ml-1 mr-1" 
                    onClick={() => this.updateTodo(taskId)}>
                    TODO
                  </button>
                  <button className="btn btn-info mt-3 mb-3 ml-1 mr-1" 
                    onClick={() => this.updateInprogress(taskId)}>
                    INPROGRESS
                  </button>
                  <button className="btn btn-info mt-3 mb-3 ml-1 mr-1" 
                    onClick={() => this.updateDone(taskId)}>
                    DONE
                  </button>
                  <button className="btn btn-info mt-3 mb-3 ml-1 mr-1" onClick={this.hideModal}>
                    Close
                  </button>  
                </div>  
              </Modal.Footer>
            </Modal>
          </>
        );
      }

}

export default TaskModal