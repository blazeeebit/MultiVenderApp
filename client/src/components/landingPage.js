import PhoneUi from '../assets/product.svg';
import PhoneUi2 from '../assets/phoneui2.svg';

const Home = () => {
	return (
		<div className="container-fluid padding cont-main pb-3">
			<div className="row h-100">
				<div className="col-lg-6 h-100 d-md-flex align-items-md-center">
					<div className="text-cont h-50 w-100 d-inline-flex flex-column justify-content-center">
						<h1>Leatwear</h1>
						<p>
							The go to marketplace for getting the best deals on amazing shoes. Buy your favourite brands
							at the best prices.
						</p>
						<a className="shadow" href="">
							Check it out now
						</a>
					</div>
				</div>
				<div className="col-lg-6 h-100 d-flex justify-content-end pb-3">
					<img className="svg-1" style={{ height: '70%', alignSelf: 'center' }} src={PhoneUi2} alt="" />
					<img className="svg-2" style={{ height: '70%', alignSelf: 'end' }} src={PhoneUi} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Home;
