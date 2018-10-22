import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import PrintCenterOptions from './components/print_center_options';
import SuccessMessage from './components/sucess';


ReactDOM.render(
    <BrowserRouter>
    <div>
    <Switch>
    <Route path="/success" component={SuccessMessage} />
    <Route path="/print" component={PrintCenterOptions} />
    <Route path="/" component={App} />
    </Switch>

    </div>
    </BrowserRouter>
  , document.querySelector('.container'));
