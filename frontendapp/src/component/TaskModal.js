import React, { Component } from 'react';
import '../App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaFileAlt } from "react-icons/fa";
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

    changePriorityColor = (priority) => {
      return priority === 'HIGHT'? "badge badge-danger float-left": 
              priority === 'LOW'? "badge badge-success float-left": "badge badge-warning float-left";
    }

    changeStateColor = (state) => {
      return state === 'TODO'? "badge badge-danger float-left": 
              state === 'DONE'? "badge badge-success float-left": "badge badge-warning float-left";
    }

    deleteTask(taskId) {
      Service.deleteTask(taskId)
          .then(respose => {this.props.refresh()})
    }
    
    render() {
        const { taskId, taskTitle, taskDescription, taskPriority, taskState, created, updated } = this.props.task;
        return (
          <>
            <Button variant="outline-none" onClick={this.showModal}>
            {taskTitle}
            </Button>
    
            <Modal show={this.state.show} onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  #{taskId}, {taskTitle}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <span className={this.changePriorityColor(taskPriority)}>{taskPriority}</span>
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
                  <UpdateTask task={this.props.task} refresh={this.props.refresh}/>
                  <button className="btn btn-info btn-size" 
                    onClick={() => this.deleteTask(taskId)}><FaTrashAlt />
                  </button>
                  <button className="btn button-color-info mt-3 mb-3 ml-2 mr-2" 
                    onClick={() => this.updateInprogress(taskId)}>
                    INPROGRESS
                  </button>
                  <button className="btn btn-info mt-3 mb-3 ml-2 mr-2" 
                    onClick={() => this.updateDone(taskId)}>
                    DONE
                  </button>
                  <Button variant="info" onClick={this.hideModal}>
                    Close
                  </Button>  
                </div>  
              </Modal.Footer>
            </Modal>
          </>
        );
      }

}

export default TaskModal