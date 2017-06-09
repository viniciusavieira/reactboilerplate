import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';
import App from "javascripts/App";
import NotFound from "javascripts/view/NotFound"
import Home from "javascripts/view/home/Home";


function startApp(){
	render((
		<Router baseName="/scup" history={browserHistory}>
			<Route path="/scup" component={App} onChange={App.onRouteChange}>
				<Route path="home" component={Home}/>
				<Route path="*" component={NotFound} />
			</Route>
		</Router>
	), document.getElementById('app'));
}

startApp();
