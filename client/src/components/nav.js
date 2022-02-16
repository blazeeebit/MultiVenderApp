import {Link} from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const Nav = () => {

	const {auth} = useSelector((state) => ({...state}));

	const dispatch = useDispatch();

	const history = useHistory();

	const logout = () => {
		dispatch({
			type: 'LOGOUT',
			payload: null
		});
		window.localStorage.removeItem('auth');
		history.push("/auth");
	}

	const guestNav = () => {
		return(
			<div className="col-lg-5 d-flex flex-lg-row flex-column justify-content-lg-around align-items-lg-center ps-lg-5 menu-links">
								<Link className="ps-lg-5" to="/">
									Home
								</Link>
								<a href="">Shop</a>
								<Link to="/auth">
									<h5>Sign Up</h5>
								</Link>
							</div>
		)
	}

	const buyerNav = () => {
		return(
			<div className="col-lg-6 d-flex flex-lg-row flex-column justify-content-lg-around align-items-lg-center ps-lg-5 menu-links">
								<Link className="ps-lg-5" to="/">
									Home
								</Link>
								<a href="">Shop</a>
								<Link to="/dashboard">
								{auth.user.name.split(" ")[0]}
								</Link>
								<Link to="/auth" onClick={logout}>
									<h5 style={{color: 'red'}}>Logout</h5>
								</Link>
							</div>
		)
	}

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light padding pt-5">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						Leatwear
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div
						className="collapse navbar-collapse d-lg-flex justify-content-lg-end"
						id="navbarSupportedContent"
					>
						<div className="col-lg-8 d-lg-flex justify-content-lg-between align-items-lg-center">
							<div className="position-relative">
								<i className="fas fa-search position-absolute s-icon" />
								<input type="text" className="searchBar ps-lg-5 ps-4 shadow-sm" placeholder="Search" />
							</div>
							{auth === null && guestNav()}
							{auth != null && buyerNav()}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
