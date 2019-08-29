import React, { Component } from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

class Footer extends Component {
	render() {
		return (
			<footer id="footer-container">
				<div id="footer-main-link"><a href="/">Back to Top</a></div>
				<div id="footer-body">
					<div id="footer-columns">
						<div id="footer-col-about" className="footer-col">
							<h6>About Us</h6>
							<ul>
								<li><Link to="/">The company</Link></li>
								<li><Link to="/">Customer comments</Link></li>								
							</ul>
						</div>
						<div id="footer-col-help" className="footer-col">
							<h6>Let us Help You</h6>
							<ul>
								<li><Link to="/">Contact Us</Link></li>
								<li><Link to="/">Shipping Rates & Policies</Link></li>
								<li><Link to="/">Returns & Replacements</Link></li>
								<li><Link to="/">Help</Link></li>
							</ul>
						</div>
					</div>
					<div id="footer-bottom">
						<p>Powered by: Rafael E Urbina N. All rights reserved.</p>
					</div>
				</div>							
			</footer>
		);
	}
}

export default Footer;
