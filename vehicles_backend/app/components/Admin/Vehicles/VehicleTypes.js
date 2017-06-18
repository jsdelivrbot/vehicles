import React from 'react';
import request from 'superagent';
import { DropdownButton,MenuItem } from 'react-bootstrap';

export default class VehicleTypes extends React.Component {
    constructor(){
        super();
        this.state = {
            vehicleTypes : [],
            addedVehicleType : undefined,
            addedVdisplayText :undefined,
            newrecord : undefined,
            changedRecordNum : undefined,
            changedRecordNum : undefined,
            processedStatus : undefined,
            processedResult : undefined
        }
        this.vehicleTypeSelect = this.vehicleTypeSelect.bind(this);
        this.vdisplayTextSelect = this.vdisplayTextSelect.bind(this);
        this.processRecord = this.processRecord.bind(this);
        this.deleteVehicleType = this.deleteVehicleType.bind(this);
        console.log("from 5 VehicleTypes");
    }
    

    vehicleTypeSelect (eventKey){
         console.log("vehicleTypeSelect evtKey",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);

        var newState = this.state;         
         var old_vehicleType;
         var new_vehicleType = eventKey.target.value;
        console.log("new_vehicleType:"+new_vehicleType);
             
         if (newState["vehicleTypes"][row]) {
             old_vehicleType = newState["vehicleTypes"][row].type ;
             
             console.log("old_vehicleType:"+
                 old_vehicleType);
            if ( old_vehicleType != 
                    new_vehicleType ) {
                newState["vehicleTypes"][row].type=new_vehicleType;
                console.log("new_vehicleType changing to :"+
                     new_vehicleType);
                newState["changedRecordNum"]= row;
                this.setState(newState);
            }
        } else {
            newState["newrecord"]= 1;
            newState["addedVehicleType"]=new_vehicleType;
            this.setState(newState);            
        }
    } // end of - vehicleTypeSelect

    vdisplayTextSelect (eventKey){
         console.log("vdisplayTextSelect evtKey",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);

        var newState = this.state;         
         var old_vdisplayText;
         var new_vdisplayText = eventKey.target.value;
        console.log("new_vdisplayText:"+new_vdisplayText);
             
         if (newState["vehicleTypes"][row]) {
             old_vdisplayText = newState["vehicleTypes"][row].display_text ;
             
             console.log("old_vdisplayText:"+
                 old_vdisplayText);
            if ( old_vdisplayText != 
                    new_vdisplayText ) {
                newState["vehicleTypes"][row].display_text=new_vdisplayText;
                console.log("new_vdisplayText changing to :"+
                     new_vdisplayText);
                newState["changedRecordNum"]= row;
                this.setState(newState);
            }
        } else {
            newState["newrecord"]= 1;
            newState["addedVdisplayText"]=new_vdisplayText;
            this.setState(newState);            
        }
    } // end of - vdisplayTextSelect

    processRecord (eventKey){
        console.log("inside processRecord");
        console.log("status 6:"+(typeof(this.state.processedStatus)));
        console.log("processedStatus:"+this.state.processedStatus);
        console.log("processedResult:"+this.state.processedResult);
        
        if ( ("undefined" !== typeof this.state.changedRecordNum) ||
        ("undefined" !== typeof this.state.newrecord) ) {
            console.log("changedRecordNum:"+this.state.changedRecordNum);
            var x = this;
            var temp_vehicleType = ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.vehicleTypes[this.state.changedRecordNum].type :
                                this.state.addedVehicleType )
            var temp_vdisplayText = ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.vehicleTypes[this.state.changedRecordNum].display_text :
                                this.state.addedVdisplayText )
            if ( ( typeof temp_vehicleType !== 'undefined') &&
                 ( typeof temp_vdisplayText !== 'undefined') ) {
                request
                    .post('/editvehicletypes')
                    .send({
                            id: ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.vehicleTypes[this.state.changedRecordNum].id :
                                ''),
                            vehicleType: temp_vehicleType, 
                            vdisplayText: temp_vdisplayText
                            })
                    .accept('application/json')
                    .withCredentials()
                    .end(function(err, res){
                        var newState = x.state;
                        newState["processedStatus"] = res.body.status;
                         newState["processedResult"] = res.body.description;
                         newState["addedVehicleType"] = "";
                        newState["addedVdisplayText"] = "";
                        console.log("editvehicleTypes body:"+JSON.stringify(res.body));
                         console.log("editvehicleTypes processedStatus:"+newState["processedStatus"]);
                         console.log("editvehicleTypes processedResult:"+newState["processedResult"]);
                        console.log("status:"+(typeof(newState["processedStatus"])));
                        x.setState(newState);
                        x.state.changedRecordNum = undefined;
                        x.state.newrecord = undefined;

                        var url="/listvehicletypes"
                        request.get(url).then((response) => {
                            console.log("listvehicleTypes response:",JSON.stringify(response.body));
                            
                            var newState2 = x.state;
                            newState2["vehicleTypes"] = response.body;
                            x.setState(newState2);
                            x.state.addedVehicleType = "";
                            x.state.addedVdisplayText = "";
                        });

                    });
                console.log("status 5:"+(typeof(this.state.processedStatus)));
            }                
        } else {
            console.log("No change in changedRecordNum");
        }
    } // end of - processRecord

    deleteVehicleType (eventKey){
        console.log("deleteService evtKey",eventKey);
        console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);
        
        var x = this;
        request
            .post('/deletevehicletype')
            .send({
                    id: this.state.vehicleTypes[row].id
                })
            .accept('application/json')
            .withCredentials()
            .end(function(err, res){
                var newState = x.state;
                newState["processedStatus"] = res.body.status;
                 newState["processedResult"] = res.body.description;
                 console.log("deletevehicletype body:"+JSON.stringify(res.body));
                 console.log("deletevehicletype processedStatus:"+newState["processedStatus"]);
                 console.log("deleteService processedResult:"+newState["processedResult"]);
                console.log("status:"+(typeof(newState["processedStatus"])));

                var url="/listvehicletypes"
                request.get(url).then((response) => {
                    console.log("listvehicletypes response:",JSON.stringify(response.body));
                    
                    var newState = x.state;
                    newState["vehicleTypes"] = response.body;
                    x.setState(newState);
                });
            });
    } // end of - deleteVehicleType

    componentWillMount(){
        // This method: componentWillMount is being 
        //   called the first time the component is loaded right before
        //   the component is added to the page
        var url="/listvehicletypes";
        var x = this;
        request.get(url).then((response) => {
            console.log("response",JSON.stringify(response.body));
            
            x.setState({
                vehicleTypes : response.body
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
                            <div className="col-md-4"><label>vehicleType </label></div>
                        <div className="col-md-4"><label>vehicleDisplayText</label></div>
                            <div className="col-md-4"><label >Delete Option</label></div>
                        </div>    
                        {this.state.vehicleTypes &&
                            this.state.vehicleTypes.map((tempvehicletypes, rownum) => (
                            <div key={rownum} className="row" onBlur={this.processRecord}>
                            <div className="col-md-4">
                                <input className="vehicleType"
                                    id={"vehicleType"+
                                            tempvehicletypes.id}
                                        type="text"
                                        name={"vehicleType_"+rownum}
                                        ref={rownum}
                                        value={
                                        (
                                            this.state.vehicleTypes &&
                                            this.state.vehicleTypes[rownum]
                                        ) ?
                                            this.state.vehicleTypes[rownum].type :
                                            ""
                                        }
                                        onChange={this.vehicleTypeSelect}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input className="vdisplayText"
                                        id={"vdisplayText"+
                                            tempvehicletypes.id} 
                                        type="text"
                                        name={"vdisplayText_"+rownum}
                                        value={
                                            (
                                                this.state.vehicleTypes &&
                                                this.state.vehicleTypes[rownum]
                                            ) ?
                                                this.state.vehicleTypes[rownum].display_text :
                                                ""
                                            }
                                        onChange={this.vdisplayTextSelect} 
                                    />
                                </div>
                                <div className="col-md-4">
                                <button className="submitButton"
                                    type="submit"
                                    name={"removevehicle_"+rownum}
                                    onClick={this.deleteVehicleType} 
                                     >Delete Service
                                </button>
                                </div>
                            </div>                                      
                        ))}
                        <div className="row" onBlur={this.processRecord}>
                            <div className="col-md-4">
                                <input className="vehicleType" 
                                    type="text"
                                    name={"vehicleType_"+(this.state.vehicleTypes.length+1)}
                                    defaultValue={this.state.addedVehicleType}
                                    onChange={this.vehicleTypeSelect} 
                                />
                            </div>
                            <div className="col-md-4">
                                <input className="vdisplayText" 
                                    type="text"
                                    name={"vdisplayText_"+(this.state.vehicleTypes.length+1)}
                                    defaultValue={this.state.addedVdisplayText}
                                    onChange={this.vdisplayTextSelect} 
                                />
                            </div>
                            <div className="col-md-4">
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
      );
    }
}