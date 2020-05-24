import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function SideNav(props) {

    return (
        <nav className="sidebar-container" style={{backgroundColor: '#D3E3FC', color: '#374785'}}>
            <p className="logo" style={{color: '#374785'}}>ProTaMa</p> 
            <ul className="sidebar-navigation">
                {/* <li className="header">Navigation</li> */}
                <li >
                    <Link className="navigation-style" to="/api/main">Homepage</Link>
                </li>
                <li>
                    <Link className="navigation-style" to="/api/projects">Projects</Link>
                </li>
                <li>
                    <Link className="navigation-style" to="/api/projects/new">New project</Link>
                </li>
                <li>
                    <Link className="navigation-style" to="/api/projects/tasks">Tasks</Link>
                </li>
                {/* <li>Information</li> */}
            </ul>
            
        </nav>
    ); 

}

export default SideNav