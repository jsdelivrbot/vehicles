import React from 'react';
import Request from 'superagent';

const Make = ["Toyota","Honda","Dodge",
    "Lexus","BMW",
    "Chevrolet","Nissan","Ford"];

export default class Gallery extends React.Component {
    
    constructor(){
        super();
        this.state = {
            images:[]
        };
    }

    componentWillMount(){
        // This method: componentWillMount is being 
        //   called the first time the component is loaded right before
        //   the component is added to the page 
        // var url="https://api.edmunds.com/api/media/v2/styles/200703383/photos?pagenum=1&pagesize=10&view=basic&fmt=json&api_key=4uasf83jngg8m56shtht377v";
        //var url="//getAutomotiveData"
        var url="/downloadGCImages";
        Request.get(url).then((response) => {
            console.log("response2",JSON.stringify(response.body));

            var tempImages = response.body.map(function(obj) { 
               var rObj ={};
               rObj="static/gcimages/"+obj.name;
               return rObj;
            });

            this.setState({
                images: tempImages
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.images.map((gcimg,index) =>
                      <img width={900} height={500}
                       alt="900x500" src={gcimg} key={index} />
                )}
            </div>
        );
    }
}