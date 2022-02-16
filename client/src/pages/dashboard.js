import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashNav from '../components/dashboardNav';
import ProductModal from '../components/productform';
import axios from 'axios';
import { parse } from 'papaparse';
import CsvForm from '../components/csvform';
import { Link } from 'react-router-dom';
import ShowUsers from '../components/showusers';
import Categories from '../components/categories';
import Sub from '../components/sub';

const Dashboard = () => {
	const { auth } = useSelector((state) => ({ ...state }));

	const [ highLight, setHighLight ] = useState(false);

	const [ products, setProducts ] = useState([]);

	const [ users, setUsers ] = useState([]);

	const [ companies, setCompanies ] = useState([]);

	const [ currency, setCurrency ] = useState('');

	const [ categoryUpdate, setCategoryUpdate ] = useState('');

	const handleDrag = (e) => {
		e.preventDefault();
	};

	const dispatch = useDispatch();

	const handleDrop = (e) => {
		e.preventDefault();
		// console.log(e.dataTransfer.files);
		let newFileArray = Array.from(e.dataTransfer.files).filter(
			(file) => file.type === 'application/vnd.ms-excel' || file.type === 'text/csv'
		);
		newFileArray.forEach(async (e) => {
			const text = await e.text();
			const result = parse(text, { header: true });
			console.log(result.data);

			dispatch({
				type: 'CSV_FILE',
				payload: result.data
			});
		});
	};

	const getProducts = async () => {
		const res = await axios.get(`http://localhost:5000/products`);
		setProducts(res.data);
	};

	const getUsers = async () => {
		const res = await axios.get(`http://localhost:5000/users`, {
			headers: {
				Authorization: `Bearer ${auth.token}`
			}
		});
		console.log(res.data);
		setUsers(res.data);
	};

	const getCompanies = async () => {
		const res = await axios.get(`http://localhost:5000/companies`, {
			headers: {
				Authorization: `Bearer ${auth.token}`
			}
		});
		console.log(res.data);
		setCompanies(res.data);
	};

	const getSellerProducts = async () => {
		const res = await axios.get(`http://localhost:5000/seller-products`, {
			headers: {
				Authorization: `Bearer ${auth.token}`
			}
		});
		setProducts(res.data);
	};

	const deleteProduct = async (productId) => {
		const res = await axios
			.delete(`http://localhost:5000/delete-product/${productId}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			.then((res) => {
				window.alert('Product Deleted');
				window.location.reload();
			});
	};

	useEffect(() => {
		setCurrency('$');

		if (auth.user.role == 'admin') {
			getProducts();
			getUsers();
			getCompanies();
		}
		if (auth.user.role == 'company') {
			getSellerProducts();
		}
	}, []);

	const convertTl = (e) => {
		e.preventDefault();
		setCurrency('TRY');
	};

	const convertUsd = (e) => {
		e.preventDefault();
		setCurrency('$');
	};

	return (
		<div className="container-fluid h-auto padding">
			<div className="container-fluid pb-5">
				<div className="col-12 h-100 d-flex flex-column justify-content-between mt-5">
					<div className="container-fluid d-heading d-flex align-items-center justify-content-between">
						<h1 style={{ color: '#5a5a5a', fontSize: '3rem' }}>
							{auth.user.role.charAt(0).toUpperCase() + auth.user.role.slice(1)} Dashboard
						</h1>
						<div>
							<button type="button" className="btn btn-primary mx-2" onClick={convertTl}>
								TL
							</button>
							<button type="button" className="btn btn-primary mx-3" onClick={convertUsd}>
								USD
							</button>
							{auth.user.role == 'admin' && (
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-toggle="modal"
									data-bs-target="#staticBackdrop"
								>
									Add Products
								</button>
							)}
							{auth.user.role == 'company' && (
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-toggle="modal"
									data-bs-target="#staticBackdrop"
								>
									Add Products
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="col-12 d-flex">
					<ProductModal />
					<CsvForm />
				</div>
				<div className="col-12">
					<DashNav
						bg={highLight}
						role={auth.user.role}
						handledrag={handleDrag}
						handledrop={handleDrop}
						dragenter={() => {
							setHighLight(true);
						}}
						dragleave={() => {
							setHighLight(false);
						}}
					/>
				</div>
			</div>
			<div className="container-fluid fade-up h-100">
				<div className="row">
					{auth.user.role == 'admin' && (
						<div className="col-md-7 h-75 d-flex flex-wrap">
							<div className="w-100">
								<h1 style={{ color: '#5a5a5a', fontSize: '2rem' }}>All Products</h1>
							</div>
							{products.map((h) => (
								<div
									key={h.title}
									className="product-card col-md-3 mb-5 mt-5 col-10 shadow d-flex justify-content-center flex-column ms-3"
								>
									<div className="w-75 h-75 card-text d-flex justify-content-center align-items-start flex-column ps-5">
										<h2>{h.title}</h2>
										{currency == 'TRY' && (
											<p>
												{currency}
												{h.price * 14}
											</p>
										)}
										{currency == '$' && (
											<p>
												{currency}
												{h.price}
											</p>
										)}
										<Link className="btn-link">View More</Link>
									</div>
									<div className="d-flex w-100 justify-content-around">
										<button className="btn btn-primary align-self-start">Edit</button>
										<button
											className="btn btn-danger align-self-start"
											onClick={() => deleteProduct(h._id)}
										>
											Delete
										</button>
									</div>
								</div>
							))}
						</div>
					)}
					{auth.user.role == 'company' && (
						<div className="col-md-7 d-flex flex-wrap">
							<div className="w-100">
								<h1 style={{ color: '#5a5a5a', fontSize: '2rem' }}>{auth.user.name} Products</h1>
							</div>
							{products.map((h) => (
								<div
									key={h.title}
									className="product-card col-md-3 col-10 shadow mb-3 mt-3 d-flex justify-content-center flex-column ms-3"
								>
									<div className="w-75 h-75 card-text d-flex justify-content-center align-items-start flex-column ps-5">
										<h2>{h.title}</h2>
										{currency == 'TRY' && (
											<p>
												{currency}
												{h.price * 14}
											</p>
										)}
										{currency == '$' && (
											<p>
												{currency}
												{h.price}
											</p>
										)}
										<Link className="btn-link">View More</Link>
									</div>
									<div className="d-flex w-100 justify-content-around">
										<button className="btn btn-primary align-self-start">Edit</button>
										<button
											className="btn btn-danger align-self-start"
											onClick={() => deleteProduct(h._id)}
										>
											Delete
										</button>
									</div>
								</div>
							))}
						</div>
					)}
					{auth.user.role == 'admin' && (
						<div className="col-md-5">
							<div className="col-12 mb-5">
								<ShowUsers users={users} title="Users" type="users" />
							</div>
							<div className="col-12 mb-5">
								<ShowUsers users={companies} title="Companies" type="company" />
							</div>
							<div className="col-12 mb-5">
								<Categories />
							</div>
							<div className="col-12 mb-5">
								<Sub />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
