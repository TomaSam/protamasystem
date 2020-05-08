import React, {Component} from 'react';
import Service from './Service';

class TaskSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            results: []
        }
    }

    // getResult = () => {
    //     Service.getTaskByTaskId(this.state.searchTask)
    //         .then((res) => {
    //             const data = res.data;
    //             console.log(data);
                // this.setState({
                //     results: data
                // })
               
    //             this.props.searchTaskById(data);
    //         })     
    // }    
    
    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        Service.searchTask(this.state.input)
            .then((res) => {
                const data = res.data;
                console.log(data);
                this.setState({
                    results: data
                })
                this.props.search(data);
            }
            )
    }

    refreshTasks = () => {
        window.location.reload(false);
    };

    render() {
        return (
        <div>
            <form onSubmit={this.submitForm} className="form-inline my-2 my-lg-0 float-right">
                <input name="input" className="form-control mr-sm-2" type="search" 
                placeholder="Search for..." aria-label="Search"
                onChange={this.inputChange} />
                <button className="btn btn-outline-info my-2 my-sm-0 float-right" type="reset"
                onClick={() => this.refreshTasks(this.state.tasks)} >Refresh</button>                
            </form>
            
        </div>
        )
    }
} 

export default TaskSearch