import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';

class NotFound extends React.Component {
	constructor()
	{
		super();
	}

  render()
  {
      return(
        <div style={{"marginTop": "100px"}}>
          <Link to="/scup/home"><h1>A página que você está procurando não existe, clique aqui para ser direcionado a página inicial.</h1></Link>
        </div>
      )
  }
}
export default NotFound;
