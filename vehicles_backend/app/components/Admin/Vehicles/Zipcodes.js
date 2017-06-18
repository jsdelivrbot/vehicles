import React from 'react';
import request from 'superagent';
import { DropdownButton,MenuItem } from 'react-bootstrap';

export default class Zipcodes extends React.Component {
    constructor(){
        super();
        this.state = {
            zipcodeArray : [],
            addedZipcode : undefined,
            addedPriceIncease : undefined,
            newrecord : undefined,
            changedRecordNum : undefined,
            changedRecordNum : undefined,
            processedStatus : undefined,
            processedResult : undefined
        }
        this.zipcodeSelect = this.zipcodeSelect.bind(this);
        this.priceInceaseSelect = this.priceInceaseSelect.bind(this);
        this.processRecord = this.processRecord.bind(this);
        this.deleteZipcode = this.deleteZipcode.bind(this);
        console.log("from 5 Zipcode");
    }    

    zipcodeSelect (eventKey){
         console.log("zipcodeSelect evtKey",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);

        var newState = this.state;         
         var old_zipcode;
         var new_zipcode = eventKey.target.value;
        console.log("new_zipcode:"+new_zipcode);
             
         if (newState["zipcodeArray"][row]) {
             old_zipcode = newState["zipcodeArray"][row].zip_code;
             
             console.log("old_zipcode:"+
                 old_zipcode);
            if ( old_zipcode != 
                    new_zipcode ) {
                newState["zipcodeArray"][row].zip_code=new_zipcode;
                console.log("new_zipcode changing to :"+
                     new_zipcode);
                newState["changedRecordNum"]= row;
                this.setState(newState);
            }
        } else {
            newState["newrecord"]= 1;
            newState["addedZipcode"]=new_zipcode;
            this.setState(newState);            
        }
    } // end of - zipcodeSelect

    priceInceaseSelect (eventKey){
         console.log("priceInceaseSelect evtKey",eventKey);
         var row = eventKey.target.name;

         console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);

        var newState = this.state;         
         var old_priceIncease;
         var new_priceIncease = eventKey.target.value;
        console.log("new_priceIncease:"+new_priceIncease);
             
         if (newState["zipcodeArray"][row]) {
             old_priceIncease = newState["zipcodeArray"][row].price_increase;
             
             console.log("old_priceIncease:"+
                 old_priceIncease);
            if ( old_priceIncease != 
                    old_priceIncease ) {
                newState["zipcodeArray"][row].price_increase=new_priceIncease;
                console.log("new_priceIncease changing to :"+
                     new_priceIncease);
                newState["changedRecordNum"]= row;
                this.setState(newState);
            }
        } else {
            newState["newrecord"]= 1;
            newState["addedPriceIncease"]=new_priceIncease;
            this.setState(newState);            
        }
    } // end of - priceInceaseSelect

    processRecord (eventKey){
        console.log("inside processRecord");
        console.log("status 6:"+(typeof(this.state.processedStatus)));
        console.log("processedStatus:"+this.state.processedStatus);
        console.log("processedResult:"+this.state.processedResult);
        if ( ("undefined" !== typeof this.state.changedRecordNum) ||
        ("undefined" !== typeof this.state.newrecord) ) {
            console.log("changedRecordNum:"+this.state.changedRecordNum);
            var x = this;
            var temp_zipcode = ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.zipcodeArray[this.state.changedRecordNum].zip_code :
                                this.state.addedZipcode );
            console.log("temp_zipcode:"+temp_zipcode);
            var temp_priceIncrease = ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.zipcodeArray[this.state.changedRecordNum].price_increase :
                                this.state.addedPriceIncease );
            console.log("temp_priceIncrease:"+temp_priceIncrease);

            if ( ( typeof temp_zipcode !== 'undefined') &&
                ( typeof temp_priceIncrease !== 'undefined') ) {
                request
                    .post('/editzipcode')
                    .send({
                            id: ( typeof this.state.changedRecordNum !== 'undefined' ? this.state.zipcodeArray[this.state.changedRecordNum].id :
                                ''),
                            zipcode: temp_zipcode,
                            priceIncrease: temp_priceIncrease
                            })
                    .accept('application/json')
                    .withCredentials()
                    .end(function(err, res){
                        var newState = x.state;
                        newState["processedStatus"] = res.body.status;
                         newState["processedResult"] = res.body.description;
                         newState["addedZipcode"] = "";
                        newState["addedPriceIncease"] = "";
                        console.log("editzipcode body:"+JSON.stringify(res.body));
                         console.log("editzipcode processedStatus:"+newState["processedStatus"]);
                         console.log("editzipcode processedResult:"+newState["processedResult"]);
                        console.log("status:"+(typeof(newState["processedStatus"])));
                        x.setState(newState);
                        x.state.changedRecordNum = undefined;
                        x.state.newrecord = undefined;

                        var url="/listzipcode"
                        request.get(url).then((response) => {
                            console.log("listzipcode response:",JSON.stringify(response.body));
                            
                            var newState2 = x.state;
                            newState2["zipcodeArray"] = response.body;
                            x.setState(newState2);
                            x.state.addedPriceIncease = "";
                            x.state.addedZipcode = "";
                        });

                    });
                console.log("status 5:"+(typeof(this.state.processedStatus)));
            }                
        } else {
            console.log("No change in changedRecordNum");
        }
    } // end of - processRecord

    deleteZipcode (eventKey){
        console.log("deleteZipcode evtKey",eventKey);
        console.log("name:"+eventKey.target.name);
         var fields = eventKey.target.name.split('_');
         var row=fields[1];
         
         console.log("row:"+row);
        
        var x = this;
        request
            .post('/deleteZipcode')
            .send({
                    id: this.state.zipcodeArray[row].id
                })
            .accept('application/json')
            .withCredentials()
            .end(function(err, res){
                var newState = x.state;
                newState["processedStatus"] = res.body.status;
                 newState["processedResult"] = res.body.description;
                 console.log("deleteZipcode body:"+JSON.stringify(res.body));
                 console.log("deleteZipcode processedStatus:"+newState["processedStatus"]);
                 console.log("deleteZipcode processedResult:"+newState["processedResult"]);
                console.log("status:"+(typeof(newState["processedStatus"])));

                var url="/listzipcode"
                request.get(url).then((response) => {
                    console.log("listzipcode response:",JSON.stringify(response.body));
                    
                    var newState = x.state;
                    newState["zipcodeArray"] = response.body;
                    x.setState(newState);
                });
            });
    } // end of - deleteZipcode

    componentWillMount(){
        // This method: componentWillMount is being 
        //   called the first time the component is loaded right before
        //   the component is added to the page
        var url="/listzipcode";
        var x = this;
        request.get(url).then((response) => {
            console.log("response",JSON.stringify(response.body));
            
            x.setState({
                zipcodeArray : response.body
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
                            <div className="col-md-4"><label>Zipcode </label></div>
                            <div className="col-md-4"><label>PriceIncrease </label></div>
                        </div>    
                        {this.state.zipcodeArray &&
                            this.state.zipcodeArray.map((tempzipcode, rownum) => (
                            <div key={rownum}>
                                <div className="row" onBlur={this.processRecord}>
                                <div className="col-md-4">
                                    <input className="zipcode"
                                        id={"zipcode"+
                                                tempzipcode.id}
                                        type="text"
                                        name={"zipcode_"+rownum}
                                        ref={rownum}
                                        value={
                                        (
                                            this.state.zipcodeArray &&
                                            this.state.zipcodeArray[rownum]
                                        ) ?
                                            this.state.zipcodeArray[rownum].zip_code :
                                            ""
                                        }
                                        onChange={this.zipcodeSelect}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                    <input className="priceIncrease"
                                        id={"priceIncrease"+
                                                tempzipcode.id}
                                            type="text"
                                            name={"priceIncrease_"+rownum}
                                            ref={rownum}
                                            defaultValue={
                                            (
                                                this.state.zipcodeArray &&
                                                this.state.zipcodeArray[rownum]
                                            ) ?
                                                this.state.zipcodeArray[rownum].price_increase:
                                                ""
                                            }
                                            onChange={this.priceInceaseSelect}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                    <button className="submitButton"
                                        type="submit"
                                            name={"removezipcode_"+rownum}
                                        onClick={this.deleteZipcode} 
                                         >Delete zipcode
                                    </button>
                                    </div>
                                </div>                                 
                            </div>         
                        ))}
                        <div className="row" onBlur={this.processRecord}>
                            <div className="col-md-4">
                                <input className="zipcode" 
                                    type="text"
                                    name={"zipcode_"+(this.state.zipcodeArray.length+1)}
                                    value={this.state.addedZipcode}
                                    onChange={this.zipcodeSelect}
                                />
                            </div>
                            <div className="col-md-4">
                                <input className="priceIncrease" 
                                    type="text"
                                    name={"priceIncrease_"+(this.state.zipcodeArray.length+1)}
                                    value={this.state.addedPriceIncease}
                                    onChange={this.priceInceaseSelect}
                                />    
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}