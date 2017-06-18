import React from 'react';
import { Link }  from 'react-router';
import { Button } from 'react-bootstrap';

import Zipcodes from './Zipcodes';
import Locations from './Locations';
import VehicleConditions from './VehicleConditions';

export default class VehicleServices extends React.Component {

    constructor(){
        super();
        this.state = {};
        console.log("from VehicleServices ");
    }
    
    render(){
        return (
            <div className="row"> 
                <div className="col-md-4">
                    <Zipcodes />
                </div>
                <div className="col-md-4">
                    <Locations />
                </div>
                <div className="col-md-4">
                    <VehicleConditions />
                </div>

            </div>
        )
    }
}