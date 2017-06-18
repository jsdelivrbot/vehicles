import React from 'react';
import { Link }  from 'react-router';
import { Button } from 'react-bootstrap';

import VehicleTypes from './VehicleTypes';
import ServiceTypes from './ServiceTypes';

export default class VehicleServices extends React.Component {
    
    constructor(){
        super();
        this.state = {};
        console.log("from VehicleServices ");
    }

    render(){
        return (
            <div className="row"> 
                <div className="col-md-6">
                    <VehicleTypes key="1"/>
                </div>
                <div className="col-md-6">
                    <ServiceTypes key="2"/>
                </div>
            </div>
        )
    }
}