//Dependencies to project
import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';
import App from 'javascripts/App';

class Home extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {historyData: []};
	}


  	render() {

	    return (
			<div className="dashboard">
				<h1>Histórico</h1>
			</div>
    );
  }
}
export default Home
