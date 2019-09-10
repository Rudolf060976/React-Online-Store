import React from 'react';
import './EmailNotification.scss';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/LOGO.png';

function EmailNotification({ image, title, content, buttonTitle, linkPath }) {
	return (
		<div id="email-notification-container">
			<div id="email-notification-header">
				<img src={Logo} alt="" />
				<h6 id="email-notification-header-title">BitZone Store</h6>
			</div>
			<div id="email-notification-body">
				<img src={image} alt="" />
				<h5 id="email-notification-title">{title}</h5>
				<div id="email-notification-content">
					{content}
				</div>
				<Link to={linkPath}>
					<Button variant="info" id="email-notification-button" size="lg">
						{buttonTitle}
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default EmailNotification;
