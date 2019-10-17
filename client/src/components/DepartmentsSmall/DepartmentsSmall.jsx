/* eslint jsx-a11y/anchor-is-valid: "off" */
/* eslint jsx-a11y/control-has-associated-label: "off" */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DepartmentsSmall.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import { actionsIUstate } from '../../redux/actions/actions';
import DepList from './DepList';
import SubdepList from './SubdepList';
import { getAllCategories, getSubcategoriesByCategoryId, getCategoryById, getCategoryImages } from '../../redux/selectors';

class DepartmentsSmall extends Component {

	constructor(props) {
		super(props);

		this.state = {

			selectedLine: null,
			visible: false,
			depListVisible: false,
			subDepListVisible: false,
			departmentsList: this.props.getDepartments,
			selectedDepartment: null,
			subDepartmentsList: [],
			imagesList: []
		};

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleMouseClick = this.handleMouseClick.bind(this);
		this.handleCloseDepartments = this.handleCloseDepartments.bind(this);
		this.handleCloseSubdepartments = this.handleCloseSubdepartments.bind(this);
		this.handleSelectedDepartment = this.handleSelectedDepartment.bind(this);
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
			visible: false,
			depListVisible: false,
			subDepListVisible: false
		});

		setTimeout(() => {

			this.props.closeDepartments();
			
		}, 300);
		
	}

	handleMouseClick() {

		this.setState({
			depListVisible: true
		});

	}

	handleSelectedDepartment(id) {
		
		this.setState({
			selectedDepartment: this.props.getDepartmentById(id),
			subDepartmentsList: this.props.getSubDepartmentsById(id),
			imagesList: this.props.getDepartmentImages(id),
			subDepListVisible: true
		});

	}

	handleCloseDepartments() {

		this.setState({
			selectedDepartment: null,
			subDepartmentsList: null,
			depListVisible: false,
			subDepListVisible: false,
			imagesList: null
		});

	}

	handleCloseSubdepartments() {

		this.setState({
			subDepartmentsList: null,
			subDepListVisible: false,
			imagesList: null
		});

	}


	render() {

		const DepListComponent = (<DepList departmentsList={this.state.departmentsList} selectedDepartment={this.handleSelectedDepartment} handleClose={this.handleCloseDepartments} />);

		const subDepListComponent = (<SubdepList subDepartmentsList={this.state.subDepartmentsList} imagesList={this.state.imagesList} selectedDepartment={this.state.selectedDepartment} handleClose={this.handleCloseSubdepartments} />);


		return (
			<CSSTransition in={this.state.visible} timeout={500} classNames="my-mobile-menu-effect">	
				<div id="departments-small-container">
					
					{ this.state.depListVisible ? DepListComponent : null}
					
					{ this.state.subDepListVisible ? subDepListComponent : null}
					
					<button type="button" id="departments-small-close-button" onClick={(e) => this.handleClose()}><FontAwesomeIcon className="departments-small-close-button-icon" icon="times" size="lg" /></button>
					<ul id="departments-small-list">
						<li className="departments-small-list-line" onMouseEnter={(e) => this.handleMouseEnter(1, e)}>
							<a href="#" onClick={this.handleMouseClick}>
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

const mapStateToProps = state => {

	return {
		getDepartments: getAllCategories(state),
		getSubDepartmentsById: id => getSubcategoriesByCategoryId(state, id),
		getDepartmentById: id => getCategoryById(state, id),
		getDepartmentImages: categoryId => getCategoryImages(state, categoryId)
	};

};

const mapDispatchToProps = dispatch => {

	return {

		closeDepartments: () => dispatch(actionsIUstate.departments.close()) 

	};

};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsSmall);
