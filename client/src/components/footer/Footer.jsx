import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

import './footer.scss'
import { useState, useRef, useEffect } from 'react'

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__container">
				<div className="footer__menu menu-footer">
					<div className="menu-footer__block">
						<h5 className="menu-footer__title">Need Help</h5>
						<ul className="menu-footer__list">
							<li className="menu-footer__item">
								<Link to={'/home'} className="menu-footer__link">
									Contact Us
								</Link>
							</li>
							<li className="menu-footer__item">
								<Link to={'/home'} className="menu-footer__link">
									Track Order
								</Link>
							</li>
							<li className="menu-footer__item">
								<Link to={'/home'} className="menu-footer__link">
									Returns & Refunds
								</Link>
							</li>
							<li className="menu-footer__item">
								<Link to={'/home'} className="menu-footer__link">
									FAQ's
								</Link>
							</li>
							<li className="menu-footer__item">
								<Link to={'/home'} className="menu-footer__link">
									Career
								</Link>
							</li>
						</ul>
					</div>
					<div className="menu-footer__block">
						<h5 className="menu-footer__title">Company</h5>
						<ul className="menu-footer__list">
							<li className="menu-footer__item">
								<Link to={'/home'} href="#" className="menu-footer__link">
									About Us
								</Link>
							</li>
							<li className="menu-footer__item">
								<Link to={'/home'} href="#" className="menu-footer__link">
									Euphoria Blog
								</Link>
							</li>
							<li className="menu-footer__item">
								<Link to={'/home'} href="#" className="menu-footer__link">
									Euphoriastan
								</Link>
							</li>
							<li className="menu-footer__item">
								<Link to={'/home'} href="#" className="menu-footer__link">
									Collaboration
								</Link>
							</li>
							<li className="menu-footer__item">
								<Link to={'/home'} className="menu-footer__link">
									Media
								</Link>
							</li>
						</ul>
					</div>
					<div className="menu-footer__block">
						<h5 className="menu-footer__title">More Info</h5>
						<ul className="menu-footer__list">
							<li className="menu-footer__item">
								<Link to={'/home'} className="menu-footer__link">
									Term and Conditions
								</Link>
							</li>
							<li className="menu-footer__item">
								<Link to={'/home'} className="menu-footer__link">
									Privacy Policy
								</Link>
							</li>
							<li className="menu-footer__item">
								<Link to={'/home'} className="menu-footer__link">
									Shipping Policy
								</Link>
							</li>
							<li className="menu-footer__item">
								<Link to={'/home'} className="menu-footer__link">
									Sitemap
								</Link>
							</li>
						</ul>
					</div>
					<address className="menu-footer__block">
						<h5 className="menu-footer__title">Location</h5>
						<ul className="menu-footer__list">
							<li className="menu-footer__item">
								<a href="mailto:support@euphoria.in" className="menu-footer__link">
									support@euphoria.in
								</a>
							</li>
							<li className="menu-footer__item">Eklingpura Chouraha, Ahmedabad Main Road</li>
							<li className="menu-footer__item">(NH 8- Near Mahadev Hotel) Udaipur, India - 313002</li>
						</ul>
					</address>
				</div>
				<div className="footer__body">
					<div className="footer__social social-footer">
						<ul className="social-footer__list">
							<li className="social-footer__item">
								<a
									target="_blank"
									href="#"
									className="social-footer__link _icon-s-facebook"
									aria-label="Social Facebook">
									<FaFacebookF />
								</a>
							</li>
							<li className="social-footer__item">
								<a
									target="_blank"
									href="#"
									className="social-footer__link _icon-s-instagram"
									aria-label="Social instagram">
									<FaInstagram />
								</a>
							</li>
							<li className="social-footer__item">
								<a
									target="_blank"
									href="#"
									className="social-footer__link _icon-s-twitter"
									aria-label="Social Twitter">
									<FaTwitter />
								</a>
							</li>
							<li className="social-footer__item">
								<a
									target="_blank"
									href="#"
									className="social-footer__link _icon-s-linkedin"
									aria-label="Social Linkedin">
									<FaLinkedinIn />
								</a>
							</li>
						</ul>
					</div>
					<div className="footer__download download-apps">
						<h5 className="download-apps__title">Download The App</h5>
						<div className="download-apps__items">
							<a
								href="#"
								className="download-apps__item"
								target="_blank"
								aria-label="Download app from Google Play">
								<img src="/assets/img/footer/google.svg" alt="Google Play" />
							</a>
							<a href="#" className="download-apps__item" target="_blank">
								<img
									src="/assets/img/footer/apple.svg"
									alt="Google Play"
									aria-label="Download app from App Store"
								/>
							</a>
						</div>
					</div>
				</div>
				<div className="footer__copy">Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.</div>
			</div>
		</footer>
	)
}

export default Footer
