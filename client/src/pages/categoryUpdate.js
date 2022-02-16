import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';

const CategoryUpdate = (props) => {
	const { auth } = useSelector((state) => ({ ...state }));

	const catId = props.match.params.slug;

	const [ catSlug, setCatSlug ] = useState('');

	const [ categoryName, setCatName ] = useState('');

	const history = useHistory();

	const getCategory = async (catId) => {
		try {
			const res = await axios.get(`http://localhost:5000/get-categories/${catId}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			});
			console.log(res.data);
			setCatName(res.data.name);
		} catch (error) {
			console.log(error);
		}
	};

	const UpdateCategory = async (e) => {
		e.preventDefault();
		const trimCatName = categoryName.trim();
		try {
			const res = await axios.put(
				`http://localhost:5000/update-category/${catId}`,
				{
					name: trimCatName
				},
				{
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				}
			);
			window.alert(res.data);
			history.push('/dashboard');
		} catch (error) {}
	};

	useEffect(() => {
		getCategory(catId);
	}, []);

	return (
		<div className="container-fluid h-100 d-flex align-items-center">
			<form className="container h-25" onSubmit={UpdateCategory}>
				<div className="input-group mb-3">
					<input
						type="text"
						value={categoryName}
						className="form-control w-75"
						placeholder="Update Category"
						aria-describedby="button-addon2"
						onChange={(e) => setCatName(e.target.value)}
					/>
					<button className="btn btn-secondary" type="submit" id="button-addon2">
						Update Category
					</button>
				</div>
			</form>
		</div>
	);
};

export default CategoryUpdate;
