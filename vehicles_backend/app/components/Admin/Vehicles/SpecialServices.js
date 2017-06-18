import React from 'react';
import request from 'superagent';
import axios from 'axios';
import { DropdownButton,
    MenuItem } from 'react-bootstrap';

export default class SpecialServices extends React.Component {
    constructor(){
        super();
        console.log("inside SpecialServices");
        this.state = {
            vehicleTypesHash : {},
            vehicleTypesArray : [],
            specialServicesHash : {},
            specialServicesHtmlHash : {},
            specialServicesArray: [],
            changedRecordNum : 0,
            processedStatus : undefined,
            processedResult : undefined,
            affectedSSId:undefined,
            affectedVehicleTypeId:undefined,
            affectedQNum:undefined,
            affectedQName:undefined,
            affectedQuestion:undefined,
            affectedPrice:undefined
        };

        this.nameSelect = this.nameSelect.bind(this);
        this.questionSelect = this.questionSelect.bind(this);
        this.priceSelect = this.priceSelect.bind(this);
        this.getSpecialServicesInfo = 
            this.getSpecialServicesInfo.bind(this);
        this.processRecord = this.processRecord.bind(this);
        console.log("from 5 SpecialServices");
    }

    nameSelect (eventKey){
         console.log("nameSelect evtKey 2",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         //basePrice_"+tempvehicleTypes.id+"_"+tempserviceTypes.id+"_"+tempVCElement.id
         var fields = eventKey.target.name.split('_');
         var ssId = fields[1];
         var vId = fields[2];
         var questionNum = fields[3];
         
         console.log("ssId:vId:questionNum",ssId.toString()+":"+vId.toString()+":"+questionNum.toString());

        var newState = this.state;         
         var old_name;
         var new_name = eventKey.target.value;
        console.log("new_name:"+new_name);
        newState["changedRecordNum"] = 1;
             
         if ( (newState["specialServicesHash"]) &&
              (newState["specialServicesHash"][vId]) && 
              (newState["specialServicesHash"][vId][questionNum])
             ) {
             old_name = newState["specialServicesHash"][vId][questionNum]['name'] ;
             
             console.log("old_name:"+
                 old_name);
            if ( old_name == 
                    new_name ) { 
                newState["changedRecordNum"] = 0;
            }
        }
        //newState["specialServicesHash"][vId][questionNum][vcId].name=new_name;
        console.log("new_name changing to :"+
             new_name);
        if( newState["changedRecordNum"] == 1 ) {
            newState["affectedSSId"]= ssId;
            newState["affectedVehicleTypeId"]= vId;
            newState["affectedQNum"]= questionNum;
            newState["affectedQName"]= new_name;
            
        }
        this.setState(newState);
        // end of - nameSelect
    }

    questionSelect (eventKey){
         console.log("questionSelect evtKey 2",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         //basePrice_"+tempvehicleTypes.id+"_"+tempserviceTypes.id+"_"+tempVCElement.id
         var fields = eventKey.target.name.split('_');
         var ssId = fields[1];
         var vId = fields[2];
         var questionNum = fields[3];
         
         console.log("ssId:vId:questionNum",ssId.toString()+":"+vId.toString()+":"+questionNum.toString());

        var newState = this.state;         
         var old_question;
         var new_question = eventKey.target.value;
        console.log("new_question:"+new_question);
        newState["changedRecordNum"] = 1;
             
         if ( (newState["specialServicesHash"]) &&
              (newState["specialServicesHash"][vId]) && 
              (newState["specialServicesHash"][vId][questionNum])
             ) {
             old_question = newState["specialServicesHash"][vId][questionNum]['question'] ;
             
             console.log("old_question:"+
                 old_question);
            if ( old_question == 
                    new_question ) { 
                newState["changedRecordNum"] = 0;
            }
        }
        //newState["specialServicesHash"][vId][questionNum][vcId].question=new_question;
        console.log("new_question changing to :"+
             new_question);
        if( newState["changedRecordNum"] == 1 ) {
            newState["affectedSSId"]= ssId;
            newState["affectedVehicleTypeId"]= vId;
            newState["affectedQNum"]= questionNum;
            newState["affectedQuestion"]= new_question;

        }
        this.setState(newState);
        // end of - questionSelect
    }

    priceSelect (eventKey){
         console.log("priceSelect evtKey 2",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         //basePrice_"+tempvehicleTypes.id+"_"+tempserviceTypes.id+"_"+tempVCElement.id
         var fields = eventKey.target.name.split('_');
         var ssId = fields[1];
         var vId = fields[2];
         var questionNum = fields[3];
         
         console.log("ssId:vId:questionNum",ssId.toString()+":"+vId.toString()+":"+questionNum.toString());

        var newState = this.state;         
         var old_price;
         var new_price = eventKey.target.value;
        console.log("new_price:"+new_price);
        newState["changedRecordNum"] = 1;
             
         if ( (newState["specialServicesHash"]) &&
              (newState["specialServicesHash"][vId]) && 
              (newState["specialServicesHash"][vId][questionNum])
             ) {
             old_price = newState["specialServicesHash"][vId][questionNum]['price'] ;
             
             console.log("old_price:"+
                 old_price);
            if ( old_price == 
                    new_price ) { 
                newState["changedRecordNum"] = 0;
            }
        }
        console.log("new_price changing to :"+
             new_price);
        if( newState["changedRecordNum"] == 1 ) {
            newState["affectedSSId"]= ssId;
            newState["affectedVehicleTypeId"]= vId;
            newState["affectedQNum"]= questionNum;
            newState["affectedPrice"]= new_price;
        }
        this.setState(newState);
    }     // end of - priceSelect

    getSpecialServicesInfo () {

        console.log("inside getSpecialServicesInfo");
        var x = this;
        var url="/listspecialservices";
        request.get(url).then((ssresponse) => {
            console.log("listspecialservices ssresponse:",JSON.stringify(ssresponse.body));
            var tempvtid;
            var tempssid;
            var tempName;
            var tempQuestion;
            var tempPrice;
            var tempArray = ssresponse.body;
            console.log("ssresponse.body",ssresponse.body);
          var tempSpecialServicesHtmlHash = {};
          var tempSpecialServicesHash = {};
          var tempSSHashLength;
            if(tempArray) {
                for(var i = 0; i < tempArray.length ; i++ ) {
                    tempssid = tempArray[i].id;
                    tempvtid = tempArray[i].vehicle_type_id;
                    tempName = tempArray[i].name;
                    tempQuestion = tempArray[i].question;
                    tempPrice = tempArray[i].price;
                    // .toString()
                    if (tempvtid.toString() in tempSpecialServicesHtmlHash == false) {
                        console.log("Hash doesn't contain tempvtid:"+tempvtid);
                        tempSpecialServicesHtmlHash[tempvtid.toString()] = []; //new Array();
                        tempSpecialServicesHash[tempvtid.toString()] = [];
                    }
                    
                    tempSSHashLength = tempSpecialServicesHtmlHash[tempvtid.toString()].length;
                    console.log("tempSSHashLength:"+tempSSHashLength);
                    
                    tempSpecialServicesHash[tempvtid.toString()][tempSSHashLength] = {};
                    tempSpecialServicesHash[tempvtid.toString()][tempSSHashLength]['name'] = tempName;
                    tempSpecialServicesHash[tempvtid.toString()][tempSSHashLength]['question'] = tempQuestion;
                    tempSpecialServicesHash[tempvtid.toString()][tempSSHashLength]['price'] = tempPrice;
                    tempSpecialServicesHtmlHash[tempvtid.toString()].push(
                    <div sclassName="row"
                        onBlur={this.processRecord}>
                        <div className="col-md-4">
                            <input className="ssName"
                                type="text"
                                defaultValue={
                                    (    (tempArray[i].name) 
                                    ) ?
                                    tempArray[i].name :
                                    ""
                                }
                            />
                        </div>
                        <div className="col-md-4">
                            <input className="ssQuestion" 
                                type="text"
                                name={"ssQuestion_"+tempssid+"_"+tempvtid+"_"+tempSSHashLength}
                                defaultValue={
                                    (    (tempArray[i].question) 
                                    ) ?
                                    tempArray[i].question :
                                    ""
                            }
                                onChange={this.questionSelect} 
                            />
                        </div>
                        <div className="col-md-4">
                            <input className="ssPrice" 
                                type="text"
                                name={"ssPrice_"+tempssid+"_"+tempvtid+"_"+tempSSHashLength}
                                defaultValue={
                                    (    (tempArray[i].price) 
                                    ) ?
                                    tempArray[i].price :
                                    ""
                            }
                                onChange={this.priceSelect} 
                            />
                        </div>
                    </div>
                    );
                    // end of - upto above - tempSpecialServicesHtmlHash[tempvtid.toString()].push(
                    // end of - upto below - for(var i = 0; i < tempArray.length ; i++ ) {
                }

                /*
                    for (const [key, value] of Object.entries(tempSpecialServicesHtmlHash[tempvtid.toString()])) {
                      console.log(`key: ${key}, value: ${value}.toString()`)
                    }
                */
                // end of - if(tempArray) {
            }

            //console.log("tempSpecialServicesHtmlHash:"+
            //    JSON.stringify(tempSpecialServicesHtmlHash));
            /*
            console.log("tempSpecialServicesHtmlHash 1:"+
                (JSON.stringify(tempSpecialServicesHtmlHash[1][0].toString())));
            */
            x.setState({                
                    specialServicesHtmlHash : tempSpecialServicesHtmlHash,
                    specialServicesHash : tempSpecialServicesHash,
                    specialServicesArray: ssresponse.body
                })
        });

    } // end of - getSpecialServicesInfo

    processRecord (eventKey){
        console.log("inside processRecord");
        console.log("status 6:"+(typeof(this.state.processedStatus)));
        console.log("processedStatus:"+this.state.processedStatus);
        console.log("processedResult:"+this.state.processedResult);
        // var newState = this.state;
        // this.setState(newState);
        if ( this.state.changedRecordNum  == 1 ) {
            console.log("changedRecordNum:"+this.state.changedRecordNum);
            var x = this;
            
            var temp_SSId = this.state.affectedSSId;
            var temp_vehicleTypeId = this.state.affectedVehicleTypeId ;
            var temp_QNum = this.state.affectedQNum ;
            var temp_QName = (typeof this.state.affectedQName !== 'undefined') ? this.state.affectedQName : 
              ( (typeof this.state.specialServicesHash[temp_vehicleTypeId][temp_QNum] !== 'undefined') ?  this.state.specialServicesHash[temp_vehicleTypeId][temp_QNum]['name'] : "" );
            var temp_Question = (typeof this.state.affectedQuestion !== 'undefined') ? this.state.affectedQuestion :
              ( (typeof this.state.specialServicesHash[temp_vehicleTypeId][temp_QNum] !== 'undefined') ?  this.state.specialServicesHash[temp_vehicleTypeId][temp_QNum]['question'] : "" );
            var temp_QPrice = (typeof this.state.affectedPrice !== 'undefined') ?  this.state.affectedPrice :
              ( (typeof this.state.specialServicesHash[temp_vehicleTypeId][temp_QNum] !== 'undefined') ?  this.state.specialServicesHash[temp_vehicleTypeId][temp_QNum]['price'] : "" );
            console.log("temp_SSId:"+temp_SSId);
            console.log("temp_vehicleTypeId:"+temp_vehicleTypeId);
            console.log("temp_QNum:"+temp_QNum);
            console.log("temp_QName:"+temp_QName);
            console.log("temp_Question:"+temp_Question);
            console.log("temp_QPrice:"+temp_QPrice);
            if ( ( temp_QNum > -1) &&
                 ( temp_vehicleTypeId > 0) &&
                 ( typeof temp_QNum !== 'undefined') &&
                 ( typeof temp_QName !== 'undefined') &&
                 ( typeof temp_Question !== 'undefined') &&
                 ( typeof temp_QPrice !== 'undefined') ) {
                request
                    .post('/editspecialservices')
                    .send({
                            ssId : temp_SSId,
                            vehicleTypeId: temp_vehicleTypeId, 
                            QName: temp_QName, 
                            Question : temp_Question,
                            QPrice: temp_QPrice
                            })
                    .accept('application/json')
                    .withCredentials()
                    .end(function(err, res){
                        var newState = x.state;
                        newState["processedStatus"] = res.body.status;
                         newState["processedResult"] = res.body.description;

                         newState["affectedSSId"] = undefined;
                        newState["affectedVehicleTypeId"] = undefined;
                        newState["affectedQNum"] = undefined;                        
                        newState["affectedQName"] = undefined;
                        newState["affectedQuestion"] = undefined;                        
                        newState["affectedPrice"] = undefined;
                        console.log("editspecialservices body:"+JSON.stringify(res.body));
                         console.log("editspecialservices processedStatus:"+newState["processedStatus"]);
                         console.log("editspecialservices processedResult:"+newState["processedResult"]);
                        console.log("status:"+(typeof(newState["processedStatus"])));
                        x.setState(newState);
                        x.state.changedRecordNum = undefined;

                        var url="/listavailableservices"
                        request.get(url).then((response) => {
                            console.log("listavailableservices response:",JSON.stringify(response.body));
                            
                            var newState2 = x.state;
                            x.setState(newState2);
                            x.state.affectedSSId = undefined;
                            x.state.affectedVehicleTypeId = undefined;
                            x.state.affectedQNum = undefined;
                            x.state.affectedQName = undefined;
                            x.state.affectedQuestion = undefined;
                            x.state.affectedPrice = undefined;

                            x.getSpecialServicesInfo();

                        });

                    });
                console.log("status 5:"+(typeof(this.state.processedStatus)));
            }                
        } else {
            console.log("No change in changedRecordNum");
        }

    } // end of - processRecord

    componentWillMount(){
        // This method: componentWillMount is being 
        //   called the first time the component is loaded right before
        //   the component is affected to the page 
    
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

        x.getSpecialServicesInfo();

    } // end of - componentWillMount

    render(){
        return (
            <div className="specialServicesComponent">

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

                            <div className="row" >

                                <div className = "vehicleType">{tempvehicleTypes.display_text}
                                </div>

                                <div>
                                    <div className="row">
                                        <div className="col-md-4">Name</div>
                                        <div className="col-md-4">Question</div>
                                        <div className="col-md-4">Price</div>
                                    </div>

                                    {tempvehicleTypes.id in this.state.specialServicesHtmlHash &&
                                        this.state.specialServicesHtmlHash[tempvehicleTypes.id]
                                    }

                                    <div className="row" onBlur={this.processRecord}>
                                       
                                    <div className="col-md-4">
                                            <input className="ssname" 
                                                type="text"
                                                name={"ssName_"+0+"_"+(tempvehicleTypes.id)+"_"+
                                                (tempvehicleTypes.id in 
                                                    this.state.specialServicesHtmlHash ? 
                                                    (this.state.specialServicesHtmlHash[tempvehicleTypes.id].length)
                                                    : 0
                                                )}
                                                defaultValue={this.state.affectedQName}
                                                onChange={this.nameSelect} 
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <input className="ssQuestion" 
                                                type="text"
                                                name={"ssQuestion_"+0+"_"+(tempvehicleTypes.id)+"_"+
                                                (tempvehicleTypes.id in 
                                                    this.state.specialServicesHtmlHash ? 
                                                    (this.state.specialServicesHtmlHash[tempvehicleTypes.id].length)
                                                    : 0
                                                )}
                                                defaultValue={this.state.affectedQuestion}
                                                onChange={this.questionSelect} 
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <input className="ssPrice" 
                                                type="text"
                                                name={"ssPrice_"+0+"_"+(tempvehicleTypes.id)+"_"+
                                                (tempvehicleTypes.id in 
                                                    this.state.specialServicesHtmlHash ? 
                                                    (this.state.specialServicesHtmlHash[tempvehicleTypes.id].length)
                                                    : 0
                                                )}
                                                defaultValue={this.state.affectedPrice}
                                                onChange={this.priceSelect} 
                                            />
                                        </div>
                                        
                                </div>

                                </div>
                            </div>
                        )                
                    )
                }

        </div>
      )
    }
}