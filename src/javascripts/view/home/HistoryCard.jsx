//Dependencies to project
import React from 'react';
import App from 'javascripts/App';
import { Link } from 'react-router'
import ExamVisualizerCard from 'javascripts/view/exame/ExamVisualizerCard';
import ExamRequestCard from 'javascripts/view/exame/ExamRequestCard';
import PrescriptionVisualizerCard from 'javascripts/view/prescricao/PrescriptionVisualizerCard';
import PrescriptionRequestCard from 'javascripts/view/prescricao/PrescriptionRequestCard';
import TermVisualizerCard from 'javascripts/view/terms/TermVisualizerCard';
import TermRequestCard from 'javascripts/view/terms/TermRequestCard';
import RouteHelper from 'javascripts/RouteHelper';
//material-ui
import InjectTapEventPlugin from "react-tap-event-plugin";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import 'stylesheets/view/examvisualizer.scss';

class HistoryCard extends React.Component {

	constructor()
	{
		super();
		this.onDeleteSucess = this.onDeleteSucess.bind(this);
		this.onDeleteError = this.onDeleteError.bind(this);
		this.styles = {
			style: {
				float:"right", 
				height:0, 
				width:24, 
			},iconStyle : {
				boxShadow:"none", 
				height:24, 
				width:24, 
				padding: 0, 
				transform:"rotate(90deg)", 
				WebkitTransform: "rotate(90deg)", 
				MozTransform: "rotate(90deg)", 
				OTransform: "rotate(90deg)", 
				MsTransform: "rotate(90deg)"
			}};
	}

	onPatientClick() {

	}

	onOwnerClick () {

	}

	onVisualizeClick(procedureId,tableName)
  	{
		switch(tableName)
		{
			case "Prescription":
				App.showModal(PrescriptionVisualizerCard,PrescriptionRequestCard,"Prescription",null,procedureId);
			break;
			case "ExamRequest":
				App.showModal(ExamVisualizerCard,ExamRequestCard,"ExamRequest",null,procedureId);
			break;
			case "Term":
				App.showModal(TermVisualizerCard,TermRequestCard,"Term",null,procedureId);
			break;
		}
 	}

	onDeleteClick(pointer)
	{
		console.log("Id BEFORE", pointer.id);
		App.showDialog("Deseja excluir esse registro?","Uma vez confirmado essa ação não poderá ser desfeita!",this.onDeleteConfirm.bind(this, pointer));
  	}

	onDeleteConfirm(pointer)
	{
		var ctx = this;
	    var DeleteRegistry = Parse.Object.extend(pointer);
	    var query = new DeleteRegistry();
	    query.set("isDeleted", true);
	    console.log("Id", pointer.id);
	    query.save(null, {
			success: function(results) {
				ctx.onDeleteSucess(results);
			},
			error: function(object, error) {
				ctx.onDeleteError();
				console.log("Error getting data: " + error.message);
				}
		});
	}

	onDeleteSucess()
	{
		this.props.cardData[0].callback();
		App.showSnackBar("Registro excluído com sucesso!");
	}

	onDeleteError()
	{
		App.showSnackBar("Ocorreu um erro ao excluir esse item do seu histórico, por favor tente novamente");
	}

  render()
	{
		var ctx = this;
		var infos = this.props.cardData.map(function(item,index)
		{
			var ownerLink = RouteHelper.getOwnerRoute(item.ownerId);
			var patientLink = RouteHelper.getPatientRoute(item.patientId);
			var documentLink = "";
			return(
				<div key={"cardData"+index+"/"+item.dateTime} className="data-container-inner">
					<div className="container-texts">
						<div className="patient-name"><Link to={ownerLink}>{item.ownerName}</Link></div>

						<div className="procedure-text">O animal <Link to={patientLink}>{item.patientName}</Link> recebeu um <Link role="button" onClick={ctx.onVisualizeClick.bind(ctx, item.procedureId, item.tableName)}>{item.procedureName}</Link>.</div>
						<IconMenu useLayerForClickAway={true} style={ctx.styles.style} iconButtonElement={<IconButton style={ctx.styles.iconStyle}><MoreVertIcon /></IconButton>} anchorOrigin={{horizontal: 'right', vertical: 'top'}} targetOrigin={{horizontal: 'right', vertical: 'top'}}>
						<MenuItem primaryText="Visualizar" onClick={ctx.onVisualizeClick.bind(ctx, item.procedureId, item.tableName)}/>
						<MenuItem primaryText="Excluir" onClick={ctx.onDeleteClick.bind(ctx,item.pointer)}/>
						</IconMenu>
					</div>
					
			 	</div>
			);
		});
    return(
      <div className="box-history">
		<div className="data-container-general">
			<div className="time-data">{this.props.cardData[0].dateTime}</div>
			{infos}
		</div>
     </div>
   );
  }
}

export default HistoryCard
