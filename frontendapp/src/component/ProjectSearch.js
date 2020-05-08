import React, {Component} from 'react';
import Service from './Service';

class ProjectSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchProject: '',
            results: [],
            message: null
        }
    }

    getResult = () => {
        Service.searchProject(this.state.searchProject)
            .then((res) => {
                const data = res.data;
                console.log(data);
                
                this.setState({
                    results: data
                })
                this.props.search(data);
                
            })
            
    }    
    
    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        this.getResult();
    }

    refreshTasks = () => {
        window.location.reload(false);
    };

    render() {
        return (
        <div>
            <form onSubmit={this.submitForm} className="form-inline my-2 my-lg-0 float-right">
                <input name="searchProject" className="form-control mr-sm-2" type="search" 
                placeholder="Enter project title" aria-label="Search"
                onChange={this.inputChange} />
                <button className="btn btn-outline-info my-2 my-sm-0 float-right" type="reset"
                onClick={() => this.refreshTasks(this.state.projects)} >Refresh</button>                 
            </form>
        </div>
        )
    }
} 

export default ProjectSearch