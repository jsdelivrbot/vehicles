import React from 'react';
import request from 'superagent';
import { DropdownButton,MenuItem } from 'react-bootstrap';

export default class ServiceTypes extends React.Component {
    constructor(){
        super();
        this.state = {
            serviceTypes : [],
            addedServiceName : undefined,
            addedSdisplayName : undefined,
            addedSdescription : undefined,
            newrecord : undefined,
            changedRecordNum : undefined,
            changedRecordNum : undefined,
            processedStatus : undefined,
            processedResult : undefined
        }
        this.serviceNameselect = this.serviceNameselect.bind(this);
        this.sDisplayNameSelect = this.sDisplayNameSelect.bind(this);
        this.sDescriptionSelect = this.sDescriptionSelect.bind(this);
        this.processRecord = this.processRecord.bind(this);
        this.deleteServiceType = this.deleteServiceType.bind(this);
        console.log("from 5 ServiceTypes");
    }    

    serviceNameselect (eventKey){
         console.log("serviceNameselect evtKey",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);

        var newState = this.state;
         //newState[eventKey.target.name] = eventKey.target.value;
         
         var old_servicename;
         var new_servicename = eventKey.target.value;
        console.log("new_servicename:"+new_servicename);
             
         if (newState["serviceTypes"][row]) {
             old_servicename = newState["serviceTypes"][row].name ;
             
             console.log("old_servicename:"+
                 old_servicename);
            if ( old_servicename != 
                    new_servicename ) {
                newState["serviceTypes"][row].name=new_servicename;
                console.log("new_vehicleType changing to :"+
                     new_servicename);
                newState["changedRecordNum"]= row;
                this.setState(newState);
            }
        } else {
            newState["newrecord"]= 1;
            newState["addedServiceName"]=new_servicename;
            this.setState(newState);            
        }
    } // end of - serviceNameselect

    sDisplayNameSelect (eventKey){
         console.log("sDisplayNameSelect evtKey",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);

        var newState = this.state;
         //newState[eventKey.target.name] = eventKey.target.value;
         
         var old_sDisplayName;
         var new_sDisplayName = eventKey.target.value;
        console.log("new_sDisplayName:"+new_sDisplayName);
             
         if (newState["serviceTypes"][row]) {
             old_sDisplayName = newState["serviceTypes"][row].display_name ;
             
             console.log("old_sDisplayName:"+
                 old_sDisplayName);
            if ( old_sDisplayName != 
                    new_sDisplayName ) {
                newState["serviceTypes"][row].display_name=new_sDisplayName;
                console.log("new_sDisplayName changing to :"+
                     new_sDisplayName);
                newState["changedRecordNum"]= row;
                this.setState(newState);
            }
        } else {
            newState["newrecord"]= 1;
            newState["addedSdisplayName"]=new_sDisplayName;
            this.setState(newState);            
        }
    } // end of - sDisplayNameSelect

    sDescriptionSelect (eventKey){
         console.log("sDescriptionSelect evtKey",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);

        var newState = this.state;
         //newState[eventKey.target.name] = eventKey.target.value;
         
         var old_sDescription;
         var new_sDescription = eventKey.target.value;
        console.log("new_sDescription:"+new_sDescription);
             
         if (newState["serviceTypes"][row]) {
             old_sDescription = newState["serviceTypes"][row].description ;
             
             console.log("old_sDescription:"+
                 old_sDescription);
            if ( old_sDescription != 
                    new_sDescription ) {
                newState["serviceTypes"][row].description=new_sDescription;
                console.log("new_sDescription changing to :"+
                     new_sDescription);
                newState["changedRecordNum"]= row;
                this.setState(newState);
            }
        } else {
            newState["newrecord"]= 1;
            newState["addedSdescription"]=new_sDescription;
            this.setState(newState);            
        }
    } // end of - sDescriptionSelect

    processRecord (eventKey){
        console.log("inside processRecord");
        console.log("status 6:"+(typeof(this.state.processedStatus)));
        console.log("processedStatus:"+this.state.processedStatus);
        console.log("processedResult:"+this.state.processedResult);
        // var newState = this.state;
        // this.setState(newState);
        if ( ("undefined" !== typeof this.state.changedRecordNum) ||
        ("undefined" !== typeof this.state.newrecord) ) {
            console.log("changedRecordNum:"+this.state.changedRecordNum);
            var x = this;
            var temp_serviceName = ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.serviceTypes[this.state.changedRecordNum].name :
                                this.state.addedServiceName )
            var temp_sDisplayName = ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.serviceTypes[this.state.changedRecordNum].display_name :
                                this.state.addedSdisplayName )
            var temp_sDescription = ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.serviceTypes[this.state.changedRecordNum].description :
                                this.state.addedSdescription )
            if ( ( typeof temp_serviceName !== 'undefined') &&
                 ( typeof temp_sDisplayName !== 'undefined') &&
                 (typeof temp_sDescription !== 'undefined')) {
                request
                    .post('/editservicetypes')
                    .send({
                            id: ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.serviceTypes[this.state.changedRecordNum].id :
                                ''),
                            serviceName: temp_serviceName, 
                            sDisplayName: temp_sDisplayName,
                            sDescription: temp_sDescription
                            })
                    .accept('application/json')
                    .withCredentials()
                    .end(function(err, res){
                        var newState = x.state;
                        newState["processedStatus"] = res.body.status;
                         newState["processedResult"] = res.body.description;
                         newState["addedServiceName"] = "";
                        newState["addedSdisplayName"] = "";
                        newState["addedSdescription"] = "";
                        console.log("editserviceTypes body:"+JSON.stringify(res.body));
                         console.log("editserviceTypes processedStatus:"+newState["processedStatus"]);
                         console.log("editserviceTypes processedResult:"+newState["processedResult"]);
                        console.log("status:"+(typeof(newState["processedStatus"])));
                        x.setState(newState);
                        x.state.changedRecordNum = undefined;
                        x.state.newrecord = undefined;

                        var url="/listservicetypes"
                        request.get(url).then((response) => {
                            console.log("listserviceTypes response:",JSON.stringify(response.body));
                            
                            var newState2 = x.state;
                            newState2["serviceTypes"] = response.body;
                            x.setState(newState2);
                            x.state.addedServiceName = "";
                            x.state.addedSdisplayName = "";
                            x.state.addedSdescription = "";
                        });

                    });
                console.log("status 5:"+(typeof(this.state.processedStatus)));
            }                
        } else {
            console.log("No change in changedRecordNum");
        }
    } // end of - processRecord

    deleteServiceType (eventKey){
        console.log("deleteService evtKey",eventKey);
        console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);
        
        var x = this;
        request
            .post('/deleteservicetype')
            .send({
                    id: this.state.serviceTypes[row].id
                })
            .accept('application/json')
            .withCredentials()
            .end(function(err, res){
                var newState = x.state;
                newState["processedStatus"] = res.body.status;
                 newState["processedResult"] = res.body.description;
                 console.log("deleteservicetype body:"+JSON.stringify(res.body));
                 console.log("deleteservicetypes processedStatus:"+newState["processedStatus"]);
                 console.log("deleteService processedResult:"+newState["processedResult"]);
                console.log("status:"+(typeof(newState["processedStatus"])));

                var url="/listservicetypes"
                request.get(url).then((response) => {
                    console.log("listservicetypes response:",JSON.stringify(response.body));
                    
                    var newState = x.state;
                    newState["serviceTypes"] = response.body;
                    x.setState(newState);
                });
            });
    } // end of - deleteServiceType

    componentWillMount(){
        // This method: componentWillMount is being 
        //   called the first time the component is loaded right before
        //   the component is added to the page
        var url="/listservicetypes";
        var x = this;
        request.get(url).then((response) => {
            console.log("response",JSON.stringify(response.body));
            
            x.setState({
                serviceTypes : response.body
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
                            <div className="col-md-4"><label>ServiceName </label></div>
                            <div className="col-md-4"><label>ServiceDisplayName</label></div>
                            <div className="col-md-4"><label >ServiceDescription</label></div>
                        </div>    
                        {this.state.serviceTypes &&
                            this.state.serviceTypes.map((tempserviceTypes, rownum) => (
                            <div key={rownum}>
                                <div className="row" onBlur={this.processRecord}>
                                <div className="col-md-3">
                                    <input className="serviceName"
                                        id={"serviceName"+
                                                tempserviceTypes.id}
                                        type="text"
                                        name={"serviceName_"+rownum}
                                        ref={rownum}
                                        value={
                                        (
                                            this.state.serviceTypes &&
                                            this.state.serviceTypes[rownum]
                                        ) ?
                                            this.state.serviceTypes[rownum].name :
                                            ""
                                        }
                                        onChange={this.serviceNameselect}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <input className="sDisplayName"
                                            id={"sDisplayName"+
                                                tempserviceTypes.id} 
                                            type="text"
                                            name={"sDisplayName_"+rownum}
                                            value={
                                                (
                                                    this.state.serviceTypes &&
                                                    this.state.serviceTypes[rownum]
                                                ) ?
                                                    this.state.serviceTypes[rownum].display_name :
                                                    ""
                                                }
                                            onChange={this.sDisplayNameSelect} 
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <input className="sDescription"
                                            id={"sDescription"+
                                                tempserviceTypes.id} 
                                            type="text"
                                            name={"sDescription_"+rownum}
                                            value={
                                                (
                                                    this.state.serviceTypes &&
                                                    this.state.serviceTypes[rownum]
                                                ) ?
                                                    this.state.serviceTypes[rownum].description :
                                                    ""
                                                }
                                            onChange={this.sDescriptionSelect} 
                                        />
                                    </div>

                                    <div className="col-md-3">
                                        <button className="submitButton"
                                            type="submit"
                                            name={"removeservice_"+rownum}
                                            onClick={this.deleteServiceType} 
                                             >Delete Service
                                        </button>
                                    </div>
                                </div>                            
                            </div>         
                        ))}
                        <div className="row" onBlur={this.processRecord}>
                            <div className="col-md-3">
                                <input className="serviceName" 
                                    type="text"
                                    name={"serviceName_"+(this.state.serviceTypes.length+1)}
                                    value={this.state.addedServiceType}
                                    onChange={this.serviceNameselect} 
                                />
                            </div>
                            <div className="col-md-3">
                                <input className="sDisplayName" 
                                    type="text"
                                    name={"sDisplayName_"+(this.state.serviceTypes.length+1)}
                                    value={this.state.addedVdisplayText}
                                    onChange={this.sDisplayNameSelect} 
                                />
                            </div>
                            <div className="col-md-3">
                                <input className="sDescription" 
                                    type="text"
                                    name={"sDescription_"+(this.state.serviceTypes.length+1)}
                                    value={this.state.addedVdisplayText}
                                    onChange={this.sDescriptionSelect} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
      );
    }
}