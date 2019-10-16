import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Departments.scss';
import DepList from './DepList';
import SubdepList from './SubdepList';
import DepImages from './DepImages';
import { actionsIUstate } from '../../redux/actions/actions';
import { getAllCategories, getSubcategoriesByCategoryId, getCategoryById, getCategoryImages } from '../../redux/selectors';

class DepartmentsLarge extends Component {

	constructor(props) {
		super(props);

		this.state = {
			departmentsList: this.props.getDepartments,
			selectedDepartment: this.props.getDepartments[0],
			subDepartmentsList: this.props.getSubDepartmentsById(this.props.getDepartments[0]._id),
			imagesList: this.props.getDepartmentImages(this.props.getDepartments[0]._id)
		};

		this.handleSelectedDepartment = this.handleSelectedDepartment.bind(this);

		this.handleClose = this.handleClose.bind(this);

	}
	
	handleSelectedDepartment(id) {
		
		this.setState({
			selectedDepartment: this.props.getDepartmentById(id),
			subDepartmentsList: this.props.getSubDepartmentsById(id),
			imagesList: this.props.getDepartmentImages(id)
		});

	}

	handleClose() {

		this.props.closeDepartments();

	}

	
	render() {

		return (
			<div id="departments-container">
				<DepList departmentsList={this.state.departmentsList} selectedDepartment={this.handleSelectedDepartment} initialDepId={this.state.selectedDepartment._id} />
				{
					this.state.selectedDepartment !== null ?
						(
							<>
								<SubdepList subDepartmentsList={this.state.subDepartmentsList} closeDepartments={this.handleClose} selectedDepartment={this.state.selectedDepartment} />
								<DepImages imagesList={this.state.imagesList} />
							</>
						)
						: null
				}				
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsLarge);
