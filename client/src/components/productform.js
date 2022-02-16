import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProductModal = () => {
	const [ values, setValues ] = useState({
		title: '',
		description: '',
		price: '',
		shipping: '',
		quantity: '',
		images: [],
		colors: [ 'black', 'red', 'brown', 'white', 'blue' ],
		brands: [ 'Nike', 'Adidas', 'Yeezys', 'Jordans', 'Gucci' ],
		color: '',
		brand: ''
	});

	const { auth } = useSelector((state) => ({ ...state }));

	const [ categories, setCategories ] = useState([]);

	const handlesubmit = async (e) => {
		e.preventDefault();
		const res = await axios
			.post(`http://localhost:5000/create-product`, values, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			.then((res) => {
				console.log(res);
				window.alert('Product created');
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		// console.log(e.target.name, ' ----- ', e.target.value);
	};

	const getCategories = async () => {
		const res = await axios.get(`http://localhost:5000/get-categories`, {
			headers: {
				Authorization: `Bearer ${auth.token}`
			}
		});
		setCategories(res.data);
	};

	useEffect(() => {
		getCategories();
	}, []);

	return (
		<form
			className="modal fade"
			id="staticBackdrop"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabindex="-1"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true"
			onSubmit={handlesubmit}
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">
							Create Product
						</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
					</div>
					<div class="modal-body">
						<div class="mb-3">
							<label for="title" class="form-label">
								Products Title
							</label>
							<input
								type="text"
								name="title"
								class="form-control"
								value={values.title}
								onChange={handleChange}
							/>
						</div>
						<div class="mb-3">
							<label for="price" class="form-label">
								Products Price
							</label>
							<input
								type="number"
								name="price"
								class="form-control"
								value={values.price}
								onChange={handleChange}
							/>
						</div>
						<div class="mb-3">
							<label for="quantity" class="form-label">
								Products Quantity
							</label>
							<input
								type="number"
								name="quantity"
								class="form-control"
								value={values.quantity}
								onChange={handleChange}
							/>
						</div>
						<select
							class="form-select"
							aria-label="Default select example"
							onChange={handleChange}
							name="shipping"
						>
							<option selected>Shipping</option>
							<option value="Yes">Yes</option>
							<option value="no">No</option>
						</select>
						<div class="mb-3">
							<label for="desc" class="form-label">
								Product Description
							</label>
							<textarea
								class="form-control"
								name="description"
								rows="3"
								value={values.description}
								onChange={handleChange}
							/>
						</div>
						<div class="mb-3">
							<label for="formFileSm" class="form-label" />
							<input class="form-control form-control-sm" name="img" id="formFileSm" type="file" />
						</div>
						<select
							class="form-select mb-3"
							aria-label="Default select example"
							onChange={handleChange}
							name="color"
						>
							<option selected>Select Color</option>
							{values.colors.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
						<select
							class="form-select mb-3"
							aria-label="Default select example"
							onChange={handleChange}
							name="category"
						>
							<option selected>Select Category</option>
							{categories.map((cat) => (
								<option key={cat} value={cat.name}>
									{cat.name}
								</option>
							))}
						</select>
						<select
							class="form-select"
							aria-label="Default select example"
							onChange={handleChange}
							name="brand"
						>
							<option selected>Select Brand</option>
							{values.brands.map((b) => (
								<option key={b} value={b}>
									{b}
								</option>
							))}
						</select>
					</div>
					<div class="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
							Close
						</button>
						<button type="submit" className="btn btn-primary">
							Post
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default ProductModal;
