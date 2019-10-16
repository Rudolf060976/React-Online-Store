/* eslint jsx-a11y/anchor-is-valid: "off" */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DepartmentsSmall.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import { actionsIUstate } from '../../redux/actions/actions';

class DepartmentsSmall extends Component {

	constructor(props) {
		super(props);

		this.state = {

			selectedLine: null,
			visible: false

		};

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
	}

	componentDidMount() {
		this.setState({
			visible: true
		});
	}

	handleMouseEnter(id, e) {

		this.setState({
			selectedLine: id
		});

	}

	handleClose() {
		this.setState({
			visible: false
		});

		setTimeout(() => {

			this.props.closeDepartments();
			
		}, 300);
		
	}


	render() {
		return (
			<CSSTransition in={this.state.visible} timeout={500} classNames="my-mobile-menu-effect">	
				<div id="departments-small-container">
					<button type="button" id="departments-small-close-button" onClick={(e) => this.handleClose()}>X</button>
					<ul id="departments-small-list">
						<li className="departments-small-list-line" onMouseEnter={(e) => this.handleMouseEnter(1, e)}>
							<a href="#">
							Departments
							</a>
							{ (this.state.selectedLine === 1) ? <FontAwesomeIcon className="departments-small-line-icon" icon="angle-right" size="lg" /> : null}
						</li>
					</ul>
				</div>
			</CSSTransition>
		);
	}
}

const mapDispatchToProps = dispatch => {

	return {

		closeDepartments: () => dispatch(actionsIUstate.departments.close()) 

	};

};

export default connect(null, mapDispatchToProps)(DepartmentsSmall);
