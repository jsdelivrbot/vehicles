// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");
//import Gallery from './Gallery';

import routes from './config/routes';
import Main from './Main';

// Renders the contents according to the route page.
ReactDOM.render(routes, document.getElementById('app'));
