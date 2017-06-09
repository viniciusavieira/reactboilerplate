import React from 'react';
import ReactDOM from 'react-dom';
import 'stylesheets/view/modal.scss';
import App from 'javascripts/App';
import $ from 'jquery';

class ModalContainer extends React.Component {

  constructor(){
		super();
    this.state = {
      open:false,
    };
	}

  componentDidMount()
  {
    var ctx = this;
    $('#containerModalCards').on('hidden.bs.modal', function (){
      ctx.hide();
    });
  }

  show()
  {
		this.setState({open:true, callback:_callback},function(){$('#containerModalCards').modal('show');});
	}

  hide()
  {
    this.setState({open:false},function(){$('#containerModalCards').modal('hide');});
  }

  render()
  {
    return(
      <div className="modal fade" id="containerModalCards">
          <div>
            Modal
          </div>
      </div>
    )
  }
}

export default ModalContainer
