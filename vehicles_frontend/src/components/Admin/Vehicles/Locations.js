import React from 'react';
import request from 'superagent';
import { DropdownButton,MenuItem } from 'react-bootstrap';

export default class Locations extends React.Component {
    constructor(){
        super();
        this.state = {
            locationArray : [],
            addedLoation : undefined,
            newrecord : undefined,
            changedRecordNum : undefined,
            changedRecordNum : undefined,
            processedStatus : undefined,
            processedResult : undefined
        }
        this.locationSelect = this.locationSelect.bind(this);
        this.processRecord = this.processRecord.bind(this);
        this.deleteLocation = this.deleteLocation.bind(this);
        console.log("from 5 Location");
    }    

    locationSelect (eventKey){
         console.log("locationSelect evtKey",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];         
         console.log("row:"+row);
        var newState = this.state;         
         var old_location;
         var new_location = eventKey.target.value;
        console.log("new_location:"+new_location);
             
         if (newState["locationArray"][row]) {
             old_location = newState["locationArray"][row].location;
             
             console.log("old_location:"+
                 old_location);
            if ( old_location != 
                    new_location ) {
                newState["locationArray"][row].location=new_location;
                console.log("new_location changing to :"+
                     new_location);
                newState["changedRecordNum"]= row;
                this.setState(newState);
            }
        } else {
            newState["newrecord"]= 1;
            newState["addedLoation"]=new_location;
            this.setState(newState);            
        }
    } // end of - locationSelect

    processRecord (eventKey){
        console.log("inside processRecord");
        console.log("status 6:"+(typeof(this.state.processedStatus)));
        console.log("processedStatus:"+this.state.processedStatus);
        console.log("processedResult:"+this.state.processedResult);
        if ( ("undefined" !== typeof this.state.changedRecordNum) ||
        ("undefined" !== typeof this.state.newrecord) ) {
            console.log("changedRecordNum:"+this.state.changedRecordNum);
            var x = this;
            var temp_location = ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.locationArray[this.state.changedRecordNum].location :
                                this.state.addedLoation )
            if ( ( typeof temp_location !== 'undefined')) {
                request
                    .post('/editlocation')
                    .send({
                            id: ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.locationArray[this.state.changedRecordNum].id :
                                ''),
                            location: temp_location
                            })
                    .accept('application/json')
                    .withCredentials()
                    .end(function(err, res){
                        var newState = x.state;
                        newState["processedStatus"] = res.body.status;
                         newState["processedResult"] = res.body.description;
                         newState["addedLoation"] = "";
                        console.log("editlocation body:"+JSON.stringify(res.body));
                         console.log("editlocation processedStatus:"+newState["processedStatus"]);
                         console.log("editlocation processedResult:"+newState["processedResult"]);
                        console.log("status:"+(typeof(newState["processedStatus"])));
                        x.setState(newState);
                        x.state.changedRecordNum = undefined;
                        x.state.newrecord = undefined;

                        var url="/listlocationtype"
                        request.get(url).then((response) => {
                            console.log("listlocationtype response:",JSON.stringify(response.body));
                            
                            var newState2 = x.state;
                            newState2["locationArray"] = response.body;
                            x.setState(newState2);
                            x.state.addedLoation = "";
                        });

                    });
                console.log("status 5:"+(typeof(this.state.processedStatus)));
            }                
        } else {
            console.log("No change in changedRecordNum");
        }
    } // end of - processRecord

    deleteLocation (eventKey){
        console.log("deleteLocation evtKey",eventKey);
        console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);
        
        var x = this;
        request
            .post('/deletelocation')
            .send({
                    id: this.state.locationArray[row].id
                })
            .accept('application/json')
            .withCredentials()
            .end(function(err, res){
                var newState = x.state;
                newState["processedStatus"] = res.body.status;
                 newState["processedResult"] = res.body.description;
                 console.log("deletelocation body:"+JSON.stringify(res.body));
                 console.log("deletelocation processedStatus:"+newState["processedStatus"]);
                 console.log(" processedResult:"+newState["processedResult"]);
                console.log("status:"+(typeof(newState["processedStatus"])));

                var url="/listlocationtype"
                request.get(url).then((response) => {
                    console.log("listlocationtype response:",JSON.stringify(response.body));
                    
                    var newState = x.state;
                    newState["locationArray"] = response.body;
                    x.setState(newState);
                });
            });
    } // end of - deleteLocation

    componentWillMount(){
        // This method: componentWillMount is being 
        //   called the first time the component is loaded right before
        //   the component is added to the page
        var url="/listlocationtype";
        var x = this;
        request.get(url).then((response) => {
            console.log("response",JSON.stringify(response.body));
            
            x.setState({
                locationArray : response.body
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
                            <div className="col-md-4"><label>Location </label></div>
                        </div>    
                        {this.state.locationArray &&
                            this.state.locationArray.map((templocation, rownum) => (
                            <div key={rownum}>
                                <div className="row" onBlur={this.processRecord}>
                                    <div className="col-md-3">
                                        <input className="location"
                                            id={"location"+
                                                    templocation.id}
                                            type="text"
                                            name={"templocation_"+rownum}
                                            ref={rownum}
                                            value={
                                            (
                                                this.state.locationArray &&
                                                this.state.locationArray[rownum]
                                            ) ?
                                                this.state.locationArray[rownum].location :
                                                ""
                                            }
                                            onChange={this.locationSelect}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <button className="submitButton"
                                            type="submit"
                                            name={"removeLocation_"+rownum}
                                            onClick={this.deleteLocation} 
                                             >Delete Location
                                        </button>
                                    </div>
                                </div> 
                                
                            </div>         
                        ))}
                        <div className="row" onBlur={this.processRecord}>
                            <div className="col-md-3">
                                <input className="location" 
                                    type="text"
                                    name={"location"+(this.state.locationArray.length+1)}
                                    value={this.state.addedLoation}
                                    onChange={this.locationSelect} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}