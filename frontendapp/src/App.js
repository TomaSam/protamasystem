import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProjectsList from './component/ProjectsList';
import NewProject from './component/NewProject';
import Main from './component/Main';
import SideNav from './component/SideNav';
import TopNav from './component/TopNav';
import Project from './component/Project';
import UpdateProject from './component/UpdateProject';
import AddTask from './component/AddTask';
import TasksList from './component/TasksList';

class App extends Component {

    render() {
        return (
          <div>
              <SideNav />
              <TopNav />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/api/main" exact component={Main} />
                    <Route path="/api/projects" exact component={ProjectsList} />
                    <Route path="/api/projects/new" exact component={NewProject} />
                    <Route path="/api/projects/tasks" exact component={TasksList} />
                    <Route path="/api/projects/:projectId" exact component={Project} />
                    <Route path="/api/projects/update/:projectId" exact component={UpdateProject} />
                    <Route path="/api/projects/:projectId/tasks/new" exact component={AddTask} />
                    
                    
                </Switch>
          </div>
        )
    }
}

export default App
