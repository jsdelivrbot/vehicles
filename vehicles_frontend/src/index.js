import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

import Nav from './Nav';
import Gallery from './components/Gallery';
import Price from './components/Price';
import Schedule from './components/Schedule';
import Home from './components/Home';
import Admin from './components/Admin';
import VehiclesPage from './components/VehiclesPage';
import VehicleServices from './components/Admin/Vehicles/VehicleServices';
import ZipcodesCombined from './components/Admin/Vehicles/ZipcodesCombined';
import AvailableServices from './components/Admin/Vehicles/AvailableServices';
import SpecialServices from './components/Admin/Vehicles/SpecialServices';


const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory}>
          <Route path="/" component={Nav}>
              <IndexRoute component={Home} />
              <Route path="gallery" component={Gallery} />
              <Route path="price" component={Price} />
              <Route path="schedule" component={Schedule} />
              <Route path="admin" component={Admin} />
              <Route path="vehicles" component={VehiclesPage}/>
              <Route path="vehicleServices" component={VehicleServices}/>
              <Route path="zipcodescombined" component={ZipcodesCombined}/>
              <Route path="availableservices" component={AvailableServices}/>
              <Route path="specialservices" component={SpecialServices}/>
          </Route>
      </Router>
  </Provider>
  , document.querySelector('.container'));
