import React from 'react';
import request from 'superagent';
import axios from 'axios';
import { DropdownButton,
    MenuItem } from 'react-bootstrap';

export default class AvailableServices extends React.Component {
    constructor(){
        super();
        console.log("inside AvailableServices");
        this.state = {
            vehicleTypesHash : {},
            vehicleTypesArray : [],
            serviceTypesHash : {},
            serviceTypesArray : [],
            V_C_Hash : {},
            V_C_Array : [],
            AvailableServicesImagesHash : {},
            ASVehiclesHash : {},
            AvailableServicesHash : {},
            changedRecordNum : 0,
            processedStatus : undefined,
            processedResult : undefined,
            affectedVehicleTypeId:undefined,
            affectedServiceTypesId:undefined,
            affectedVehicleConditionId:undefined,
            affectedBasePrice:undefined,
            affectedBCFile:undefined,
            affectedBCImage:undefined,
            affectedACImage:undefined
        };

        this.serviceSelect = this.serviceSelect.bind(this);
        this.basePriceSelect = this.basePriceSelect.bind(this);
        this.beforeCleanFileSelect =
            this.beforeCleanFileSelect.bind(this);    
        this.afterCleanFileSelect =
            this.afterCleanFileSelect.bind(this);
        this.imageIsLoaded = this.imageIsLoaded.bind(this);
        this.getVehicleTypesData =
            this.getVehicleTypesData.bind(this);
        this.getServiceTypesData = 
            this.getServiceTypesData.bind(this);
        this.getVehicleConditionData = 
            this.getVehicleConditionData.bind(this);
        this.getImagesData = 
            this.getImagesData.bind(this);
        this.getAvailableServiceData = 
            this.getAvailableServiceData.bind(this);
        this.processRecord = this.processRecord.bind(this);
        this.processImageRecord =
            this.processImageRecord.bind(this);
        console.log("from 5 AvailableServices");
    }


    serviceSelect (eventKey){
         console.log("serviceSelect evtKey",eventKey);
         var fields = eventKey.split('_');
         var row=fields[1];
         var dropdownindex=fields[2];
         console.log("row:"+row);
         console.log("dropdownindex:"+dropdownindex);
         var newState = this.state;
        var new_service_type_id = newState["serviceTypesArray"][dropdownindex].id;
        console.log("new_service_type_id:"+new_service_type_id);

        newState["changedRecordNum"] = 1;
        newState["affectedServiceTypesId"]= new_service_type_id;
        this.setState(newState);
        
    } // end of - serviceSelect

    basePriceSelect (eventKey){
         console.log("basePriceSelect evtKey",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         //basePrice_"+tempvehicleTypes.id+"_"+tempserviceTypes.id+"_"+tempVCElement.id
         var fields = eventKey.target.name.split('_');
         var vId = fields[1];
         var sId = fields[2];
         var vcId = fields[3];
         
         console.log("vId:sId:vcId",vId+":"+sId+":"+ vcId);
        var newState = this.state;         
         var old_base_price;
         var new_base_price = eventKey.target.value;
        console.log("new_base_price:"+new_base_price);
        newState["changedRecordNum"] = 1;
             
         if ( (newState["AvailableServicesHash"]) &&
              (newState["AvailableServicesHash"][vId]) && 
              (newState["AvailableServicesHash"][vId][sId]) && 
              (newState["AvailableServicesHash"][vId][sId][vcId])  && 
              (newState["AvailableServicesHash"][vId][sId][vcId]['base_price']) 
             ) {
             old_base_price = newState["AvailableServicesHash"][vId][sId][vcId]['base_price'] ;
             
             console.log("old_base_price:"+
                 old_base_price);
            if ( old_base_price == 
                    new_base_price ) { 
                newState["changedRecordNum"] = 0;
            }
        }
        console.log("new_base_price changing to :"+
             new_base_price);
        if( newState["changedRecordNum"] == 1 ) {
            newState["affectedVehicleTypeId"]= vId;
            if ( sId !== "X" ) {
                newState["affectedServiceTypesId"]= sId;
            }
            newState["affectedVehicleConditionId"]= vcId;
            newState["affectedBasePrice"]= new_base_price;
        }
        this.setState(newState);
    } // end of - basePriceSelect (eventKey){

    beforeCleanFileSelect (eventKey){
         console.log("beforeCleanFileSelect evtKey",eventKey);
         var row = eventKey.target.name;
         var files = eventKey.target.files; // FileList objectvar reader = new FileReader();

         console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var vId = fields[1];
         var sId = fields[2];
         
         console.log("vId:sId",vId+":"+sId);
         var reader = new FileReader();
         reader.temptype = "before";
         reader.vId = fields[1];
         reader.sId = fields[2];
        reader.onload = this.imageIsLoaded;
        reader.readAsDataURL(files[0]);
         console.log("files 0:"+files[0]);

        var newState = this.state;         
         var old_before_clean_file;
         var old_before_clean_image;
         var new_before_clean_file = eventKey.target.value;
        console.log("new_before_clean_file:"+new_before_clean_file);
        newState["changedRecordNum"] = 1;
        var new_before_clean_image;             

         if ( (newState["AvailableServicesImagesHash"]) &&
              (newState["AvailableServicesImagesHash"][vId]) && 
              (newState["AvailableServicesImagesHash"][vId][sId]) && 
              (newState["AvailableServicesImagesHash"][vId][sId]['before_clean_image']) 
             ) {
             old_before_clean_file = newState["AvailableServicesImagesHash"][vId][sId]['before_clean_file'] ;
             old_before_clean_image = newState["AvailableServicesImagesHash"][vId][sId]['before_clean_image'] ;
             console.log("old_before_clean_file:"+
                 old_before_clean_file);
             newState["changedRecordNum"] = 1;
            if ( old_before_clean_image == 
                    new_before_clean_image ) { 
                newState["changedRecordNum"] = 0;
            }
        }
        console.log("new_before_clean_file changing to :"+
             new_before_clean_file);
        if( newState["changedRecordNum"] == 1 ) {
            newState["affectedVehicleTypeId"]= vId;
            newState["affectedServiceTypesId"]= sId;
        }
        this.setState(newState);
    } // end of - beforeCleanFileSelect (eventKey){

    afterCleanFileSelect (eventKey){
         console.log("afterCleanFileSelect evtKey",eventKey);
         var row = eventKey.target.name;
         var files = eventKey.target.files; // FileList objectvar reader = new FileReader();

         console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var vId = fields[1];
         var sId = fields[2];
         
         console.log("vId:sId",vId+":"+sId);
         var reader = new FileReader();
         reader.temptype = "after";
         reader.vId = fields[1];
         reader.sId = fields[2];
        reader.onload = this.imageIsLoaded;
        reader.readAsDataURL(files[0]);
         console.log("files 0:"+files[0]);

        var newState = this.state;         
         var old_after_clean_file;
         var old_after_clean_image;
         var new_after_clean_file = eventKey.target.value;
        console.log("new_after_clean_file:"+new_after_clean_file);
        newState["changedRecordNum"] = 1;
        var new_after_clean_image;             

         if ( (newState["AvailableServicesImagesHash"]) &&
              (newState["AvailableServicesImagesHash"][vId]) && 
              (newState["AvailableServicesImagesHash"][vId][sId]) && 
              (newState["AvailableServicesImagesHash"][vId][sId]['after_clean_image']) 
             ) {
             old_after_clean_file = newState["AvailableServicesImagesHash"][vId][sId]['after_clean_file'] ;
             old_after_clean_image = newState["AvailableServicesImagesHash"][vId][sId]['after_clean_image'] ;
             console.log("old_after_clean_file:"+
                 old_after_clean_file);
             newState["changedRecordNum"] = 1;
            if ( old_after_clean_image == 
                    new_after_clean_image ) { 
                newState["changedRecordNum"] = 0;
            }
        }

        console.log("new_after_clean_file changing to :"+
             new_after_clean_file);
        if( newState["changedRecordNum"] == 1 ) {
            newState["affectedVehicleTypeId"]= vId;
            newState["affectedServiceTypesId"]= sId;
        }
        this.setState(newState);
    } // end of - afterCleanFileSelect

    imageIsLoaded(e) {
        console.log("inside imageIsLoaded");
        console.log("temptype:"+e.target.temptype);
        var newState = this.state;
        var tempBinaryData = e.target.result.replace(/^data:image\/jpeg;base64,/, "") ;
        tempBinaryData = tempBinaryData.replace(/^data:image\/png;base64,/, "") ;
        if ( e.target.temptype === "before" ) {
            newState["affectedBCImage"]=tempBinaryData;
            console.log("updating before image");
        } else {
            newState["affectedACImage"]=tempBinaryData;
            console.log("updating after image");            
        }
        console.log("updated memory with new selected image");
        this.setState(newState);
    }; // end of - imageIsLoaded

    processImageRecord (eventKey){
        console.log("inside processImageRecord");
        if ( this.state.changedRecordNum  == 1 ) {
            console.log("changedRecordNum:"+this.state.changedRecordNum);
            var x = this;
            var temp_vehicleTypeId = this.state.affectedVehicleTypeId ;
            var temp_serviceTypeId = this.state.affectedServiceTypesId ;
            var temp_BCImage = (typeof this.state.affectedBCImage !== 'undefined') ? this.state.affectedBCImage : "";
            var temp_ACImage = (typeof this.state.affectedACImage !== 'undefined') ? this.state.affectedACImage : "";

            request
                    .post('/editavailableserviceimages')
                    .send({
                            vehicleTypeId: temp_vehicleTypeId, 
                            serviceTypeId: temp_serviceTypeId, 
                            BCImage: temp_BCImage,
                            ACImage: temp_ACImage
                            })
                    .accept('application/json')
                    .withCredentials()
                    .end(function(err, res){
                        var newState = x.state;
                        newState["processedStatus"] = res.body.status;
                         newState["processedResult"] = res.body.description;
                        newState["affectedBCFile"] = undefined;
                        newState["affectedBCImage"] = undefined;
                        newState["affectedACImage"] = undefined;

                        console.log("editavailableserviceimages body:"+JSON.stringify(res.body));
                         console.log("editavailableserviceimages processedStatus:"+newState["processedStatus"]);
                         console.log("editavailableserviceimages processedResult:"+newState["processedResult"]);
                        console.log("status:"+(typeof(newState["processedStatus"])));
                        x.setState(newState);
                        x.state.changedRecordNum = undefined;
                        x.state.affectedBCFile = undefined;
                        x.state.affectedBCImage = undefined;
                        x.state.affectedACImage = undefined;

                        x.getImagesData();
                    })
                console.log("status 5:"+(typeof(this.state.processedStatus)));
        
        } // end of - if ( this.state.changedRecordNum  == 1 ) {

    } // end of - processImageRecord (eventKey)

    processRecord (eventKey){
        console.log("inside processRecord");
        console.log("status 6:"+(typeof(this.state.processedStatus)));
        console.log("processedStatus:"+this.state.processedStatus);
        console.log("processedResult:"+this.state.processedResult);
        if ( this.state.changedRecordNum  == 1 ) {
            console.log("changedRecordNum:"+this.state.changedRecordNum);
            var x = this;
            var temp_vehicleTypeId = this.state.affectedVehicleTypeId ;
            var temp_serviceTypeId = this.state.affectedServiceTypesId ;
            var temp_vehicleConditionId = this.state.affectedVehicleConditionId ;
            var temp_basePrice = (typeof this.state.affectedBasePrice !== 'undefined') ? this.state.affectedBasePrice :
                (    (typeof this.state.AvailableServicesHash[temp_vehicleTypeId] !== 'undefined') &&
                    (typeof this.state.AvailableServicesHash[temp_vehicleTypeId][temp_serviceTypeId] !== 'undefined') &&
                    (typeof this.state.AvailableServicesHash[temp_vehicleTypeId][temp_serviceTypeId][temp_vehicleConditionId] !== 'undefined') &&
                    (typeof this.state.AvailableServicesHash[temp_vehicleTypeId][temp_serviceTypeId][temp_vehicleConditionId]['base_price'] !== 'undefined') ? this.state.AvailableServicesHash[temp_vehicleTypeId][temp_serviceTypeId][temp_vehicleConditionId]['base_price'] : "");
            
            if ( ( temp_vehicleTypeId > 0) &&
                 ( temp_serviceTypeId > 0) &&
                 ( temp_vehicleConditionId > 0) &&
                 ( typeof temp_basePrice !== 'undefined') ) {
                request
                    .post('/editavailableservices')
                    .send({
                            vehicleTypeId: temp_vehicleTypeId, 
                            serviceTypeId: temp_serviceTypeId, 
                            vehicleConditionId: temp_vehicleConditionId,
                            basePrice: temp_basePrice
                            })
                    .accept('application/json')
                    .withCredentials()
                    .end(function(err, res){
                        var newState = x.state;
                        newState["processedStatus"] = res.body.status;
                         newState["processedResult"] = res.body.description;
                         newState["affectedVehicleTypeId"] = undefined;
                        newState["affectedServiceTypesId"] = undefined;
                        newState["affectedVehicleConditionId"] = undefined;
                        newState["affectedBasePrice"] = undefined;

                        console.log("editavailableservices body:"+JSON.stringify(res.body));
                         console.log("editavailableservices processedStatus:"+newState["processedStatus"]);
                         console.log("editavailableservices processedResult:"+newState["processedResult"]);
                        console.log("status:"+(typeof(newState["processedStatus"])));
                        x.setState(newState);
                        x.state.changedRecordNum = undefined;
                        x.getAvailableServiceData();
                    });
                console.log("status 5:"+(typeof(this.state.processedStatus)));
            }                
        } else {
            console.log("No change in changedRecordNum");
        }
    } // end of - processRecord (eventKey){

    getVehicleTypesData() {
        var url="/listvehicletypes";
        var x = this;
        request.get(url).then((vtresponse) => {
            console.log("listvehicletypes vtresponse:",JSON.stringify(vtresponse.body));
            var tempVehicleTypes = {}
            vtresponse.body.map((vehicles, index) => (
                tempVehicleTypes[vehicles.id] = {
                    type:vehicles.type,
                    display_text:vehicles.display_text
                }
            ))
            console.log("tempVehicleTypes:"+JSON.stringify(tempVehicleTypes))
            x.setState({
                vehicleTypesHash : tempVehicleTypes,
                vehicleTypesArray : vtresponse.body
            })
        });

    } // end of - getVehicleTypesData

    getServiceTypesData() {
        var url="/listservicetypes";
        var x = this;
        request.get(url).then((stresponse) => {
            console.log("listservicetypes stresponse:",JSON.stringify(stresponse.body));
            var tempServiceTypes = {}
            stresponse.body.map((services, index) => (
                tempServiceTypes[services.id] = {
                    name:services.name,
                    display_name:services.display_name,
                    description:services.description
                }
            ));

            console.log("tempServiceTypes:"+JSON.stringify(tempServiceTypes))
            x.setState({
                serviceTypesHash : tempServiceTypes,
                serviceTypesArray : stresponse.body                    
            })
        });

    } // end of - getServiceTypesData

    getVehicleConditionData() {

        var url="/listvehiclecondition";
        var x = this;
        request.get(url).then((vcresponse) => {
            console.log("listvehiclecondition vcresponse:",JSON.stringify(vcresponse.body));
            var temp_V_C_info = {}
            vcresponse.body.map((services, index) => (
                temp_V_C_info[services.id] = {
                    id : services.id,                                
                    condition:services.condition
                }
            ))

            x.setState({        
                V_C_Hash : temp_V_C_info,        
                V_C_Array : vcresponse.body
            })
        });

    } // end of - getVehicleConditionData

    getAvailableServiceData() {
        var url="/listavailableservices";
        var x = this;
        request.get(url).then((asresponse) => {
            console.log("listavailableservices asresponse:",JSON.stringify(asresponse.body));
            var tempvtid;
            var tempstid;
            var tempvcid;
            var tempbaseprice;
            var tempArray = asresponse.body;
            console.log("asresponse.body",asresponse.body);
          var tempAvailableServicesHash = {};
          var tempASVehiclesHash = {};
          var serviceypeExists;
          var tempLength;

            if(tempArray) {
                for(var i = 0; i < tempArray.length ; i++ ) {
                    tempvtid = tempArray[i].vehicle_type_id;
                    tempstid = tempArray[i].service_type_id;
                    tempvcid = tempArray[i].vehicle_condition_id;
                    tempbaseprice = tempArray[i].base_price;

                    if (tempvtid in tempAvailableServicesHash == false) {
                        console.log("Hash doesn't contain tempvtid:"+tempvtid);
                        tempAvailableServicesHash[tempvtid] = []; //{};
                        tempASVehiclesHash[tempvtid] = [];
                    }

                    if (tempstid in tempAvailableServicesHash[tempvtid] == false) {
                        console.log("Hash doesn't contain tempstid:"+tempstid);
                        tempAvailableServicesHash[tempvtid][tempstid] = []; //{};
                    }

                    serviceypeExists = undefined;
                    tempLength = tempASVehiclesHash[tempvtid].length;
                    console.log("lenght:"+tempLength);
                    for(var j = 0;
                        j < tempLength;
                        j++ ) {
                            if (tempASVehiclesHash[tempvtid][j].service_type_id === tempstid) {
                                serviceypeExists = 1;
                            }
                    }

                    if ( typeof serviceypeExists === 'undefined' ) {
                        console.log("for adding service type");
                        tempASVehiclesHash[tempvtid].
                            push({
                                'service_type_id' : tempstid
                            });

                    }

                    tempAvailableServicesHash[tempvtid][tempstid][tempvcid] = {};
                    tempAvailableServicesHash[tempvtid][tempstid][tempvcid]['base_price'] = tempbaseprice;

                };
            }

            console.log("tempAvailableServicesHash:"+
                JSON.stringify(tempAvailableServicesHash));
            console.log("tempASVehiclesHash:"+
                JSON.stringify(tempASVehiclesHash));

            x.setState({                
                    AvailableServicesHash : tempAvailableServicesHash,
                    ASVehiclesHash : tempASVehiclesHash
                })
        });

    } // end of - getAvailableServiceData

    getImagesData() {

        var url="/listavailableserviceimages";
        var x = this;
        request.get(url).then((imageresponse) => {
            console.log("listavailableserviceimages imageresponse:",
                JSON.stringify(imageresponse.body));
            var tempvtid;
            var tempstid;
            var tempBeforeCleanImage;
            var tempAfterCleanImage;

            var tempArray = imageresponse.body;
          var tempAvailableServiceImagesHash = {};

            if(tempArray) {
                for(var i = 0; i < tempArray.length ; i++ ) {
                    tempvtid = tempArray[i].vehicle_type_id;
                    tempstid = tempArray[i].service_type_id;
                    tempBeforeCleanImage = tempArray[i].before_clean_image;
                    tempAfterCleanImage = tempArray[i].after_clean_image;

                    if (tempvtid in tempAvailableServiceImagesHash == false) {
                        console.log("Hash doesn't contain tempvtid:"+tempvtid);
                        tempAvailableServiceImagesHash[tempvtid] = []; 
                    }

                    if (tempstid in tempAvailableServiceImagesHash[tempvtid] == false) {
                        console.log("Hash doesn't contain tempstid:"+tempstid);
                        tempAvailableServiceImagesHash[tempvtid][tempstid] = []; //{};
                    }
                    
                    tempAvailableServiceImagesHash[tempvtid][tempstid]['before_clean_file'] = '';
                    tempAvailableServiceImagesHash[tempvtid][tempstid]['before_clean_image'] = tempBeforeCleanImage;
                    tempAvailableServiceImagesHash[tempvtid][tempstid]['after_clean_image'] = tempAfterCleanImage;
                } // end of - for(var i = 0; i < tempArray.le
            } // end of - if(tempArray) {

            console.log("tempAvailableServiceImagesHash:"+tempAvailableServiceImagesHash)
            var newState = x.state;
            newState["AvailableServicesImagesHash"] = tempAvailableServiceImagesHash;
            x.setState(newState);                        

        });

    } // end of - getImagesData

    componentWillMount() {
        // This method: componentWillMount is being 
        //   called the first time the component is loaded right before
        //   the component is affected to the page 
    
        this.getVehicleTypesData();
        this.getServiceTypesData();
        this.getVehicleConditionData();
        this.getImagesData();
        this.getAvailableServiceData();

    } // end of - componentWillMount(){

    render(){
        return (
            <div className="availableservicesComponent">
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

                {this.state.vehicleTypesArray &&
                    this.state.vehicleTypesArray.map(
                        (tempvehicleTypes, rownum) => (

                            <div key={rownum}>

                                <div
                                    className = "row vehicleType"
                                    >{tempvehicleTypes.display_text}
                                </div>

                                {
                                    (tempvehicleTypes.id in 
                                            this.state.ASVehiclesHash
                                    ) && this.state.ASVehiclesHash
                                    [tempvehicleTypes.id].map(
                                        (tempserviceTypes, vsrownum) => (
                                             <div key={vsrownum}>    
                                                <div className="row">
                                                    <div className="col-md-1" >
                                                    </div>                            
                                                    <div
                                                         className="col-md-2">
                                                            {this.state.serviceTypesHash[tempserviceTypes.service_type_id].display_name}
                                                    </div>
                                                    ,
                                                        {this.state.V_C_Array &&
                                                            this.state.V_C_Array.map(
                                                                (tempVCElement, vcrownum) => (
                                                                    <div
                                                                        key={vcrownum}
                                                                         className="col-md-2"
                                                                        onBlur={this.processRecord} >
                                                                             {tempVCElement.condition}
                                                                    <input 
                                                                            type="text"
                                                                            size="4"
                                                                            name={"basePrice_"+tempvehicleTypes.id+"_"+tempserviceTypes.service_type_id+"_"+tempVCElement.id}
                                                                            ref={rownum}
                                                                            defaultValue={
                                                                                (    (tempvehicleTypes.id in this.state.AvailableServicesHash) &&
                                                                                    (tempserviceTypes.service_type_id in this.state.AvailableServicesHash[tempvehicleTypes.id]) &&
                                                                                    (tempVCElement.id in this.state.AvailableServicesHash[tempvehicleTypes.id][tempserviceTypes.service_type_id])
                                                                                ) ?
                                                                                this.state.AvailableServicesHash[tempvehicleTypes.id][tempserviceTypes.service_type_id][tempVCElement.id]['base_price']:
                                                                                ""
                                                                        }
                                                                            onChange={this.basePriceSelect} 
                                                                        />

                                                                    </div>
                                                            )
                                                        )
                                                    }

                                                </div>

                                                <div className="row">
                                                    <div className="col-md-2"></div>
                                                  <div className="col-md-5">Before Clean Image</div>
                                                  <div className="col-md-5">After Clean Image</div>
                                                </div>
                                                 <div>
                                                     <div className="col-md-2"></div>
                                                     <div className="col-md-5"
                                                      onBlur={this.processImageRecord} >
                                                        <input className="beforeCleanFile" 
                                                            type="file"
                                                            name={"beforeCleanFile_"+tempvehicleTypes.id+"_"+tempserviceTypes.service_type_id}
                                                            ref={rownum}
                                                            defaultValue={
                                                                (    (tempvehicleTypes.id in this.state.AvailableServicesImagesHash) &&
                                                                    (tempserviceTypes.id in this.state.AvailableServicesImagesHash[tempvehicleTypes.id])
                                                                ) ?
                                                                this.state.AvailableServicesImagesHash[tempvehicleTypes.id][tempserviceTypes.service_type_id]['before_clean_file'] :
                                                                ""
                                                        }
                                                            onChange={this.beforeCleanFileSelect} 
                                                        />

                                                        <img id="myImg"
                                                             name={"beforeCleanImage_"+tempvehicleTypes.id+"_"+tempserviceTypes.service_type_id}                                                                    
                                                             alt="your image" 
                                                            src={
                                                                (    (tempvehicleTypes.id in this.state.AvailableServicesImagesHash) &&
                                                                    (tempserviceTypes.service_type_id in this.state.AvailableServicesImagesHash[tempvehicleTypes.id]) &&
                                                                    (typeof this.state.AvailableServicesImagesHash[tempvehicleTypes.id][tempserviceTypes.service_type_id]['before_clean_image'] !== 'undefined' )
                                                                ) ?
                                                                this.state.AvailableServicesImagesHash[tempvehicleTypes.id][tempserviceTypes.service_type_id]['before_clean_image'] :
                                                                ""
                                                        }
                                                        />
                                                    </div>    
                                                    <div className="col-md-5"
                                                          onBlur={this.processImageRecord} >
                                                      <input className="afterCleanFile" 
                                                            type="file"
                                                            name={"afterCleanFile_"+tempvehicleTypes.id+"_"+tempserviceTypes.service_type_id}
                                                            ref={rownum}
                                                            defaultValue={
                                                                (    (tempvehicleTypes.id in this.state.AvailableServicesImagesHash) &&
                                                                    (tempserviceTypes.id in this.state.AvailableServicesImagesHash[tempvehicleTypes.id])
                                                                ) ?
                                                                this.state.AvailableServicesImagesHash[tempvehicleTypes.id][tempserviceTypes.service_type_id]['after_clean_file'] :
                                                                ""
                                                        }
                                                            onChange={this.afterCleanFileSelect} 
                                                        />

                                                    <img id="myImg"
                                                         name={"afterCleanImage_"+tempvehicleTypes.id+"_"+tempserviceTypes.service_type_id}                                                                    
                                                         alt="your image" 
                                                        src={
                                                            (    (tempvehicleTypes.id in this.state.AvailableServicesImagesHash) &&
                                                                (tempserviceTypes.service_type_id in this.state.AvailableServicesImagesHash[tempvehicleTypes.id]) &&
                                                                (typeof this.state.AvailableServicesImagesHash[tempvehicleTypes.id][tempserviceTypes.service_type_id]['after_clean_image'] !== 'undefined' )
                                                            ) ?
                                                            this.state.AvailableServicesImagesHash[tempvehicleTypes.id][tempserviceTypes.service_type_id]['after_clean_image'] :
                                                            ""
                                                    }/>                                                    
                                                    </div>
                                                </div>    
                                            </div>
                                        )                
                                    )
                                }
                                    
                                <div className="row">

                                    <div className="col-md-1" >
                                    </div>

                       <div className="col-md-2"><DropdownButton

                        id="my_dropdown"
                        title={(
                            this.state.serviceTypesHash &&
                                    this.state.serviceTypesHash[this.state.affectedServiceTypesId]
                            ) ?
                                this.state.serviceTypesHash[this.state.affectedServiceTypesId].display_name :
                                "Service Types"
                        }
                        name={"ServiceTypesName_"+tempvehicleTypes.id+
                        "_X"}
                        onSelect={this.serviceSelect}>
                        {
                            this.state.serviceTypesArray &&
                            this.state.serviceTypesArray.map(
                                (services, servicedropdownindex) => (
                                      <MenuItem eventKey={'rowcol_'+
                                      (tempvehicleTypes.id)+'_'+
                                      servicedropdownindex}
                                      key={servicedropdownindex}
                                      >
                                          {services.display_name}                                          
                                      
                                      </MenuItem>
                                  )
                              )
                          }
                    </DropdownButton></div>

                                    ,
                                        {this.state.V_C_Array &&
                                            this.state.V_C_Array.map(
                                                (tempVCElement, vcrownum) => (
                                                    <div
                                                        key={vcrownum}
                                                         className="col-md-2"
                                                        onBlur={this.processRecord} >
                                                             {tempVCElement.condition}
                                                    <input 
                                                            type="text"
                                                            size="4"
                                                            name={"basePrice_"+tempvehicleTypes.id+"_X"+"_"+tempVCElement.id}
                                                            ref={rownum}
                                                            defaultValue=""
                                                            onChange={this.basePriceSelect} 
                                                        />

                                                    </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                    )
                    )                    
                }
            </div>
        )
    }
}