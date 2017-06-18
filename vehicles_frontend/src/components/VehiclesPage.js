import React,{Component} from 'react'
import axios from 'axios'
import { ButtonGroup,Button,DropdownButton,MenuItem } from 'react-bootstrap';

import { Link }  from 'react-router';

export default class VehiclePage extends Component {

    constructor(props){
        super(props);
        console.log("VehiclePage props",JSON.stringify(props.params));
        this.state = {
        }
    }

    render() {
        return(
            <div className="">
                <Button>
                    <Link  to="/vehicleservices" >
                        Browse for Vehicle and Service Types</Link>
                </Button>
                <br/><br/>
                <Button>
                    <Link  to="/zipcodescombined" >
                        Browse for Zipcode, Location and Vehicle condition</Link>
                </Button>
                <br/><br/>
                <Button>
                    <Link  to="/availableservices" >
                        Browse for Available Services</Link>
                </Button>
                <br/><br/>
                <Button>
                    <Link  to="/specialservices" >
                        Browse for Special Services</Link>
                </Button>    
        </div>
        );
    }
}