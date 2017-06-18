import React from 'react';
import ImagesCarousel from './ImagesCarousel';

export default class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row " height={200} >
                    <div className="col-md-4">
                        <img src="../static/simages/logo.png" alt="logo" height={200} width={390}/>
                    </div>
                    <div className="col-md-8">
                        <ImagesCarousel/>
                    </div>
                </div>
                        
                  <p className="para">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                       sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>
        );
    }
}