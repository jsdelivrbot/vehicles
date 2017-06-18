import React from 'react';
import { Link }  from 'react-router';

export default class Navigationbar extends  React.Component {
    render(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">AppName</Link>
                    </div>
                    <div
                      className=""
                      id="bs-example-navbar-collapse-1"
                    >
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/price">Price</Link></li>
                            <li><Link to="/schedule">Schedule</Link></li>
                            <li><Link to="/admin">Admin</Link></li>
                        </ul>
                    </div>
                </div>
         </nav>
        );
    }
}
