import Icons from '../assets/icons.svg';
import Graph from '../assets/graph.svg';
import Uis from '../assets/uidesigns.svg';



const HomeBody = () => {
	return (
		<>
		<div className="container-fluid body-cont d-md-flex flex-md-column align-items-md-center main-cont">
			<div className="pt-5" data-aos="fade-left">
				<img style={{ height: '70%' }} src={Icons} alt="" />
			</div>
			<div className="text-center" data-aos="fade-right">
				<p style={{ fontSize: '25px', color: '#9A9A9A' }}>
					Secure Payments So You Never <br /> Have to Worry
				</p>
			</div>
			<div className="container-fluid h-75">
				<div className="row h-100">
					<div className="col-md-8 h-100 d-flex justify-content-end align-items-center" data-aos="fade-up">
						<img style={{ height: '80%' }} src={Graph} alt="" />
					</div>
					<div className="col-md-4 d-flex align-items-center heading-cont pb-5" data-aos="fade-down">
						<h1 style={{ fontSize: '70px' }}>
							Grow Your <br /> Business. Make <br /> A Statement. <br /> Become A <br /> Seller
						</h1>
					</div>
				</div>
			</div>
		</div>
		<div className="container-fluid main-cont">
				<div className="col-12 h-25 text-center d-flex justify-content-center align-items-center" data-aos="fade">
					<h1 style={{color: '#5A5A5A'}}>Beautiful User Interface For The Best <br/> Experience</h1>
				</div>
				<div className="col-12 h-75 d-flex justify-content-center">
					<img src={Uis} alt="" data-aos="fade-up" />
				</div>
		</div>
		</>
	);
};

export default HomeBody;
