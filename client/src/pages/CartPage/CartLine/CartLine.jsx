import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledRow = styled.tr`

	
`;

const StyledCellImage = styled.td`


`;

const StyledCellName = styled.th`

	width: 35%;

`;

const StyledCellQuantity = styled.td`

	text-align: center;

`;

const StyledCellPlusQuantity = styled.td`

	text-align: left;
	padding-bottom: 15px;
`;

const StyledCellMinusQuantity = styled.td`

	text-align: right;
	padding-bottom: 15px;
`;

const StyledQuantityButton = styled.button`

	background-color: transparent;
	border: none;
	color: blue;

	&:focus {
		outline: none;		
	}

`;

const StyledCellAmounts = styled.td`

	text-align: right;

`;

const StyledCellTrash = styled.td`

	text-align: right;
	padding-bottom: 15px;

`;

const StyledTrashButton = styled.button`

	background-color: transparent;
	border: none;
	color: green;

	&:focus {
		outline: none;
		color: #ffc107;
	}

`;


const StyledImage = styled.img`

	max-width: 70px;
	
`;

const StyledName = styled.p`

	font-size: 1.2rem;

`;

const StyledQuantity = styled.p`

	font-size: 1.2rem;

`;

const StyledPrice = styled.p`

	font-size: 1.2rem;

`;


const StyledItemTotal = styled.p`

font-size: 1.2rem;

`;

function RoundDecimalNumber(num) {

	return (Math.round(num * 100) / 100).toFixed(2);

}


function CartLine({ lineObject, itemObject, imageObject, handleDelete }) {

	const itemPagePath = `/itemsheet/${itemObject._id}`;


	const handleDeleteButton = lineId => {

		handleDelete(lineId);

	};

		
	return (
		<>
			<StyledRow>
				<StyledCellImage>
					<StyledImage src={imageObject.imageURL} alt="" />
				</StyledCellImage>
				<StyledCellName>
					<StyledName><Link to={itemPagePath}>{itemObject.shortName}</Link></StyledName>
				</StyledCellName>
				<StyledCellMinusQuantity>
					<StyledQuantityButton >
						<FontAwesomeIcon icon="minus-square" size="md" />
					</StyledQuantityButton>
				</StyledCellMinusQuantity>
				<StyledCellQuantity>
					<StyledQuantity>{lineObject.quantity}</StyledQuantity>
				</StyledCellQuantity>
				<StyledCellPlusQuantity>
					<StyledQuantityButton >
						<FontAwesomeIcon icon="plus-square" size="md" />
					</StyledQuantityButton>
				</StyledCellPlusQuantity>
				<StyledCellAmounts>
					<StyledPrice>$ {RoundDecimalNumber(lineObject.price.$numberDecimal)}</StyledPrice>
				</StyledCellAmounts>
				<StyledCellAmounts>
					<StyledItemTotal>$ {RoundDecimalNumber(lineObject.itemTotal.$numberDecimal)}</StyledItemTotal>
				</StyledCellAmounts>
				<StyledCellTrash>
					<StyledTrashButton onClick={e => handleDeleteButton(lineObject._id)}>
						<FontAwesomeIcon icon="trash-alt" size="md" />
					</StyledTrashButton>
					
				</StyledCellTrash>				
			</StyledRow>			
		</>
	);
}

export default CartLine;
