import React, {Component} from 'react';
import Service from './Service';

class ProjectSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchProject: '',
            results: []
        }
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        Service.searchProject(this.state.searchProject)
            .then((res) => {
                const data = res.data;
                console.log(data);
                
                this.setState({
                    results: data
                })
                console.log(data);
                this.props.search(data);     
            })      
    }

    refreshTasks = () => {
        window.location.reload(false);
    };

    render() {
        return (
        <div>
            <form onSubmit={this.submitForm} className="form-inline my-2 my-lg-0">
                <input name="searchProject" className="form-control mr-sm-2" type="search" 
                placeholder="Search for..." aria-label="Search"
                onChange={this.inputChange} />
                <button className="btn button-color-info my-2 my-sm-0 float-right" type="reset"
                onClick={() => this.refreshTasks(this.state.projects)} >Back to List</button>                 
            </form>
        </div>
        )
    }
} 

export default ProjectSearch