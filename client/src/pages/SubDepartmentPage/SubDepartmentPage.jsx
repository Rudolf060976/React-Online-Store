import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import SubDepartmentInfo from './SubDepartmentInfo';
import ResultsInfo from '../../components/ResultsInfo/ResultsInfo';
import ItemsList from '../../components/ItemsList/ItemsList';
import PaginationControl from '../../components/PaginationControl/PaginationControl';


const StyledContainer = styled.div`

	background-color: white;
	width: 100%;
	padding: 20px;

`;


function SubDepartmentPage() {

	const params = useParams();

	const { subdepId } = params;

	
	return (
		<StyledContainer>
			<SubDepartmentInfo />
			<ResultsInfo />
			<ItemsList />
			<PaginationControl />
		</StyledContainer>
	);
}

export default SubDepartmentPage;
