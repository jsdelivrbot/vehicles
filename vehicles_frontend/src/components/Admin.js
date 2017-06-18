import React from 'react';

import { Link }  from 'react-router';
import { Button } from 'react-bootstrap';

export default class Admin extends React.Component {

    constructor(){
        super();
        this.state = {};
        console.log("from Admin ");
    }
    
    render(){
        return (
            <div> 
                <Button>
                    <Link  to="/vehicles" >
                        Browse for Vehicle Maintenance</Link>
                </Button>
            </div>
        )
    }
}