import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { actionsAsyncFetchGetCartItems } from '../../redux/actions/asyncActions';
import { getIsCartFetching, getIsCartError, getCartErrorMessage, getCartLines, getCartItemImages, getCartTotals, getUserProfile } from '../../redux/selectors';
import CartLine from './CartLine/CartLine';
import Loading from '../../assets/gifs/loading-arrow.gif';
import ErrorImage from '../../assets/images/FETCH_ERROR.jpg';

const StyledContainer = styled.div`
	
	width: 100%;
	padding: 20px 20px 50px 20px;

	background-color: white;
	
`;

const StyledCartTitle = styled.h6`
	padding: 0;
	margin: 0;
	width: 100%;
	text-align: center;
	font-family: 'Lilita One', Verdana, Geneva, Tahoma, sans-serif;
	font-size: 2rem;
	color: #4B5C96;
	text-shadow: 0 0 2px #ffc107;
	letter-spacing: 1px;
`;

const StyledLoading = styled.div`

	width: 100%;
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		max-width: 100px;
	}
`;

const StyledError = styled.div`

	width: 100%;
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		max-width: 100px;
	}
`;

const StyledTable = styled.table`

	width: 90%;
	margin: 0 auto;

`;

const StyledTHead = styled.thead`

	font-size: 1.2rem;

`;

const StyledTBody = styled.tbody`

		

`;

const StyledTotalsTableContainer = styled.div`

	width: 100%;
	display: flex;
	justify-content: flex-end;
	margin: 20px 0;
	padding-right: 120px;
	margin-bottom: 30px;

`;

const StyledTotalsTable = styled.table`

	width: 30%;

	tr {
		font-size: 1.2rem;
	}

`;

const StyledButtons = styled.div`

	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	button {
		margin-left: 20px;
	}

`;

function RoundDecimalNumber(num) {

	return (Math.round(num * 100) / 100).toFixed(2);

}

function CartPage({ dispatch, isFetching, isFetchingError, fetchErrorMessage, cartLines, cartItemImages, cartTotals, userProfile }) {

	useEffect(() => {
		
		dispatch(actionsAsyncFetchGetCartItems(userProfile._id));

	}, []);

	const dataLines = (
		<>		
			{cartLines.map(line => {
			
				return (
					<CartLine key={line._id} lineObject={line} itemObject={line.item[0]} imageObject={cartItemImages(line.item[0]._id)[0]} />
				);
			
			})}
		</>
	);

	let container = null;

	if (isFetching) {
		container = (<StyledLoading><img src={Loading} alt="" /></StyledLoading>);
	} else if (isFetchingError) {
		container = (<StyledError><img src={ErrorImage} alt="" /><br />{fetchErrorMessage}</StyledError>)

	} else {

		container = (			
			<StyledContainer>
				<StyledCartTitle>Your Cart</StyledCartTitle>
				<StyledTable>
					<StyledTHead>
						<tr>
							<th> </th>
							<th>Name</th>
							<th> </th>
							<th style={{ textAlign: 'center' }}>Qty</th>
							<th> </th>
							<th style={{ textAlign: 'right' }}>Price</th>
							<th style={{ textAlign: 'right' }}>Item Total</th>
						</tr>
					</StyledTHead>
					<StyledTBody>
						{dataLines}
					</StyledTBody>
				</StyledTable>
				<StyledTotalsTableContainer>
					<StyledTotalsTable>
						<thead>
							<tr>
								<th>({cartTotals.count ? cartTotals.count : 0} Items )</th>
							</tr>
							<tr>							
								<th>SubTotal :</th>
								<th style={{ textAlign: 'right' }}>$ {cartTotals.subtotal ? RoundDecimalNumber(cartTotals.subtotal.$numberDecimal) : 0 }</th>
							</tr>
							<tr>
								<th>Tax :</th>
								<th style={{ textAlign: 'right' }}>$ {cartTotals.tax ? RoundDecimalNumber(cartTotals.tax.$numberDecimal) : 0 }</th>
							</tr>
							<tr>
								<th>Total :</th>
								<th style={{ textAlign: 'right' }}>$ {cartTotals.total ? RoundDecimalNumber(cartTotals.total.$numberDecimal) : 0 }</th>
							</tr>
						</thead>						
					</StyledTotalsTable>
				</StyledTotalsTableContainer>
				
				
				<StyledButtons>
					<Link to="/cart"><Button variant="warning" size="lg">Checkout</Button></Link>
					<Link to="/"><Button variant="primary" size="lg">Continue Shopping</Button></Link>
				</StyledButtons>					
			</StyledContainer>
		);

	}
		

	return (
		<>
			{container}		
		</>
	);
}

const mapStateToProps = state => {

	return {
		isFetching: getIsCartFetching(state),
		isFetchingError: getIsCartError(state),
		fetchErrorMessage: getCartErrorMessage(state),
		cartLines: getCartLines(state),
		cartItemImages: itemId => getCartItemImages(state, itemId),
		cartTotals: getCartTotals(state),
		userProfile: getUserProfile(state)
	};

};


export default connect(mapStateToProps, null)(CartPage);
