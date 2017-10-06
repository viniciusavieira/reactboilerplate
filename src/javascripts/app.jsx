import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';
import ModalContainer from 'javascripts/ModalContainer';
import 'bootstrap/dist/css/bootstrap.css';
import 'stylesheets/base.scss';

class App extends React.Component {

	static BASEPATH;
	static Snackbar;

	constructor(){
		super();
		App.BASEPATH = "reactboilerplate/";

	}

	componentDidMount()
	{
		App.ModalContainer =  this.refs.modalContainer;
	}

	static onRouteChange()
	{
		App.hideModal();
	}

	static showModal()
	{
		App.ModalContainer.show();
	}

	static hideModal()
	{
		App.ModalContainer.hide();
	}

	static changeRoute(routeString, replace)
	{
		if(replace)
		{
			browserHistory.replace("/reactboilerplate/"+routeString);
		}else{
			browserHistory.push("/reactboilerplate/"+routeString);
		}
	}

	render()
	{
		return (
			<div>
				<div className="children">
						{this.props.children}
				</div>
				<ModalContainer ref="modalContainer"/>
			</div>
		);
	}
}

export default App
