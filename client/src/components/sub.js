import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sub = (props) => {
	const [ category, setcategory ] = useState('');

	const [ sub, setSub ] = useState([]);

	const [ parentCat, setParentCat ] = useState('');

	const [ error, setError ] = useState('');

	const [ color, setColor ] = useState('');

	const { auth } = useSelector((state) => ({ ...state }));

	const [ categories, setCategories ] = useState([]);

	useEffect(() => {
		setcategory('');
		setError('');
		setColor('');
		getCategories();
		getSub();
	}, []);

	const categorySubmit = async (e) => {
		e.preventDefault();
		if (category == '') {
			setError('Please Enter a Category');
			setColor('red');
		} else {
			const trimCategory = category.trim();

			const res = await axios
				.post(
					`http://localhost:5000/sub`,
					{
						name: trimCategory,
						parent: parentCat
					},
					{
						headers: {
							Authorization: `Bearer ${auth.token}`
						}
					}
				)
				.then((res) => {
					window.alert('Category created');
					window.location.reload();
				});
		}
	};

	const getCategories = async () => {
		const res = await axios.get(`http://localhost:5000/get-categories`, {
			headers: {
				Authorization: `Bearer ${auth.token}`
			}
		});
		setCategories(res.data);
	};

	const getSub = async () => {
		const res = await axios.get(`http://localhost:5000/get-sub`, {
			headers: {
				Authorization: `Bearer ${auth.token}`
			}
		});
		setSub(res.data);
	};

	const deleteCategory = async (categoryId) => {
		const res = await axios
			.delete(`http://localhost:5000/delete-sub/${categoryId}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			.then((res) => {
				window.alert('Category Deleted');
				window.location.reload();
			});
	};

	return (
		<div className="container-fluid shadow pt-5 pb-5 bg-light">
			<h1 style={{ color: '#5a5a5a', fontSize: '2rem' }}>Add Sub Categories</h1>
			<form className="container-fluid h-25" onSubmit={categorySubmit}>
				<select
					class="form-select mb-3"
					aria-label="Default select example"
					name="category"
					onChange={(e) => setParentCat(e.target.value)}
				>
					<option selected>Select Category</option>
					{categories.map((cat) => (
						<option key={cat} value={cat._id}>
							{cat.name}
						</option>
					))}
				</select>
				<div className="input-group mb-3 w-100">
					<input
						type="text"
						value={category}
						onChange={(e) => setcategory(e.target.value)}
						className="form-control w-75"
						placeholder="Add Sub Category"
						aria-describedby="button-addon2"
					/>
					<button className="btn btn-secondary" type="submit" id="button-addon2">
						Add Sub
					</button>
				</div>
				<span className={`${color}`} style={{ fontWeight: 'bold' }}>
					{error}
				</span>
			</form>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Sub Category</th>
						<th scope="col">Edit</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>
				<tbody>
					{sub.map((category) => (
						<tr key={category}>
							<td>{category.name}</td>
							<td>
								<button className="btn btn-primary" onClick={props.updateCat}>
									<Link
										style={{ color: 'white', textDecoration: 'none' }}
										to={`/dashboard/category-update/${category._id}`}
									>
										Edit
									</Link>
								</button>
							</td>
							<td>
								<button className="btn btn-danger" onClick={() => deleteCategory(category._id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Sub;
