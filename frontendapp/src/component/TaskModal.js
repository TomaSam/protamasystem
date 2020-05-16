import React, { Component } from 'react';
import '../App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaFileAlt } from "react-icons/fa";

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
    
    render() {
        const { taskId, taskTitle, taskDescription, taskPriority, created, updated } = this.props.task;
        return (
          <>
            <Button variant="info" onClick={this.showModal}>
            <FaFileAlt />
            </Button>
    
            <Modal show={this.state.show} onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  #{taskId}, {taskTitle}, {taskPriority}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>{taskDescription}
              <hr></hr>
              Created at: {created}
              <hr></hr>
              Updated at: {updated}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.hideModal}>
                  Close
                </Button>
                
              </Modal.Footer>
            </Modal>
          </>
        );
      }

}

export default TaskModal