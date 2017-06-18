import React from 'react';
import request from 'superagent';
import { DropdownButton,MenuItem } from 'react-bootstrap';

export default class VehicleConditions extends React.Component {
    constructor(){
        super();
        this.state = {
            vehicleConditionArray : [],
            addedVehicleCondition : undefined,
            newrecord : undefined,
            changedRecordNum : undefined,
            changedRecordNum : undefined,
            processedStatus : undefined,
            processedResult : undefined
        }
        this.vehicleConditionselect = this.vehicleConditionselect.bind(this);
        this.processRecord = this.processRecord.bind(this);
        this.deleteVehicleCondition = this.deleteVehicleCondition.bind(this);
        console.log("from 5 Vehicle Condition");
    }    

    vehicleConditionselect (eventKey){
         console.log("vehicleConditionselect evtKey",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];         
         console.log("row:"+row);
        var newState = this.state;
         
         var old_vehicleCondition;
         var new_vehicleCondition = eventKey.target.value;
        console.log("new_vehicleCondition:"+new_vehicleCondition);
             
         if (newState["vehicleConditionArray"][row]) {
             old_vehicleCondition = newState["vehicleConditionArray"][row].condition;
             
             console.log("old_vehicleCondition:"+
                 old_vehicleCondition);
            if ( old_vehicleCondition != 
                    new_vehicleCondition ) {
                newState["vehicleConditionArray"][row].condition=new_servicename;
                console.log("new_vehicleCondition changing to :"+
                     new_vehicleCondition);
                newState["changedRecordNum"]= row;
                this.setState(newState);
            }
        } else {
            newState["newrecord"]= 1;
            newState["addedVehicleCondition"]=new_vehicleCondition;
            this.setState(newState);            
        }
    } // end of - vehicleConditionselect

    processRecord (eventKey){
        console.log("inside processRecord");
        console.log("status 6:"+(typeof(this.state.processedStatus)));
        console.log("processedStatus:"+this.state.processedStatus);
        console.log("processedResult:"+this.state.processedResult);
        if ( ("undefined" !== typeof this.state.changedRecordNum) ||
        ("undefined" !== typeof this.state.newrecord) ) {
            console.log("changedRecordNum:"+this.state.changedRecordNum);
            var x = this;
            var temp_vehicleCondition = ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.vehicleConditionArray[this.state.changedRecordNum].condition :
                                this.state.addedVehicleCondition )
            if ( ( typeof temp_vehicleCondition !== 'undefined')) {
                request
                    .post('/editvehiclecondition')
                    .send({
                            id: ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.vehicleConditionArray[this.state.changedRecordNum].id :
                                ''),
                            vehicleCondition: temp_vehicleCondition
                            })
                    .accept('application/json')
                    .withCredentials()
                    .end(function(err, res){
                        var newState = x.state;
                        newState["processedStatus"] = res.body.status;
                         newState["processedResult"] = res.body.description;
                         newState["addedVehicleCondition"] = "";
                        console.log("editvehiclecondition body:"+JSON.stringify(res.body));
                         console.log("editvehiclecondition processedStatus:"+newState["processedStatus"]);
                         console.log("editvehiclecondition processedResult:"+newState["processedResult"]);
                        console.log("status:"+(typeof(newState["processedStatus"])));
                        x.setState(newState);
                        x.state.changedRecordNum = undefined;
                        x.state.newrecord = undefined;

                        var url="/listvehiclecondition"
                        request.get(url).then((response) => {
                            console.log("listvehiclecondition response:",JSON.stringify(response.body));
                            
                            var newState2 = x.state;
                            newState2["vehicleConditionArray"] = response.body;
                            x.setState(newState2);
                            x.state.addedVehicleCondition = "";
                        });

                    });
                console.log("status 5:"+(typeof(this.state.processedStatus)));
            }                
        } else {
            console.log("No change in changedRecordNum");
        }
    } // end of - processRecord

    deleteVehicleCondition (eventKey){
        console.log("deleteVehicleCondition evtKey",eventKey);
        console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);
         console.log(" vehicleConditionArray row id:"+this.state.vehicleConditionArray[row].id);
        
        var x = this;
        request
            .post('/deletevehiclecondition')
            .send({
                    id: this.state.vehicleConditionArray[row].id
                })
            .accept('application/json')
            .withCredentials()
            .end(function(err, res){
                var newState = x.state;
                newState["processedStatus"] = res.body.status;
                 newState["processedResult"] = res.body.description;
                 console.log("deletevehiclecondition body:"+JSON.stringify(res.body));
                 console.log("deletevehiclecondition processedStatus:"+newState["processedStatus"]);
                 console.log("deletevehiclecondition processedResult:"+newState["processedResult"]);
                console.log("status:"+(typeof(newState["processedStatus"])));

                var url="/listvehiclecondition"
                request.get(url).then((response) => {
                    console.log("listvehiclecondition response:",JSON.stringify(response.body));
                    
                    var newState = x.state;
                    newState["vehicleConditionArray"] = response.body;
                    x.setState(newState);
                });
            });
    } // end of - deleteVehicleCondition

    componentWillMount(){
        // This method: componentWillMount is being 
        //   called the first time the component is loaded right before
        //   the component is added to the page
        var url="/listvehiclecondition";
        var x = this;
        request.get(url).then((response) => {
            console.log(" listvehiclecondition response:",JSON.stringify(response.body));
            
            x.setState({
                vehicleConditionArray : response.body
            })
        });
    } // end of - componentWillMount

    render() {
    return (
        <div className="row ">
            <div >
                { (this.state.processedStatus === true) &&
                        <div className="row">
                            hi Good. {this.state.processedResult}
                        </div>
                    }

                { (this.state.processedStatus === false) &&
                    <div className="row">
                        hi False. {this.state.processedResult}
                    </div>
                }

                    <div className="well">
                        <div className="row">
                            <div className="col-md-4"><label>VehicleCondition </label></div>
                        </div>    
                        {this.state.vehicleConditionArray &&
                            this.state.vehicleConditionArray.map((tempVehicleCondition, rownum) => (
                            <div key={rownum}>
                                <div className="row" onBlur={this.processRecord}>
                                <div className="col-md-3">
                                        <input className="vehicleCondition"
                                            id={"vehicleCondition"+
                                                    tempVehicleCondition.id}
                                            type="text"
                                            name={"vehicleCondition_"+rownum}
                                            ref={rownum}
                                            value={
                                            (
                                                this.state.vehicleConditionArray &&
                                                this.state.vehicleConditionArray[rownum]
                                            ) ?
                                                this.state.vehicleConditionArray[rownum].condition :
                                                ""
                                            }
                                            onChange={this.vehicleConditionselect}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <button className="submitButton"
                                            type="submit"
                                            name={"removeVcondition_"+rownum}
                                            onClick={this.deleteVehicleCondition} 
                                             >Delete Vehicle Condition
                                        </button>
                                    </div>
                                </div>                                    
                            </div>         
                        ))}
                        <div className="row" onBlur={this.processRecord}>
                            <div className="col-md-3">
                                <input className="vehicleCondition" 
                                    type="text"
                                    name={"vehicleCondition"+(this.state.vehicleConditionArray.length+1)}
                                    value={this.state.addedVehicleCondition}
                                    onChange={this.vehicleConditionselect} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}