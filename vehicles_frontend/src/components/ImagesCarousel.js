import React from 'react';
import Request from 'superagent';

import { Carousel} 
    from 'react-bootstrap';

export default class ImagesCarousel extends React.Component {
    constructor(){
        super();
        this.state = {
            images:[] 
        };
        console.log("from ImagesCarousel");
    }

    componentWillMount(){
        // This method: componentWillMount is being 
        //   called the first time the component is loaded right before
        //   the component is added to the page 
        // var url="https://api.edmunds.com/api/media/v2/styles/200703383/photos?pagenum=1&pagesize=10&view=basic&fmt=json&api_key=4uasf83jngg8m56shtht377v";
        
        var url="/downloadGCImages";
        var x=this;
        Request.get(url).then((response) => {
            console.log("response",JSON.stringify(response.body));
            
            // console.log(" response.body.photos[0].sources[0].link.href", response.body.photos[0].sources[0].link.href);
            
            var tempImages = [];
            tempImages = response.body.map(function(obj) { 
               var rObj ={};
               rObj="static/gcimages/"+obj.name;
               return rObj;
            });

            console.log("tempImages",tempImages);

            x.setState({
                images: tempImages
            })

        })

    }

    render() {
      return (
          <div className="carouselImg">
              <Carousel interval={2000}>
                  {this.state.images && this.state.images.map((gcimg, index) => 
                  <Carousel.Item key={index}  >
                      <img  id={index} height={200}
                        src={gcimg}  className="carouselImg"/>
                  </Carousel.Item>
              )}
              </Carousel>
            </div>
      );
    }
}