import axios from 'axios';
import { useSelector } from 'react-redux';

const ShowUsers = (props) => {
	const { auth } = useSelector((state) => ({ ...state }));

	const deleteUser = async (userId, type) => {
		const res = await axios
			.delete(`http://localhost:5000/delete-${type}/${userId}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			.then((res) => {
				window.alert('User Deleted');
				window.location.reload();
			});
	};

	return (
		<div className="container-fluid pt-5 pb-5 shadow bg-light">
			<div className="w-100 mb-3">
				<h1 style={{ color: '#5a5a5a', fontSize: '2rem' }}>Registered {props.title}</h1>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Email</th>
						<th scope="col">Role</th>
						<th scope="col">Edit</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>
				<tbody>
					{props.users.map((user) => (
						<tr key={user}>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td>
								<button className="btn btn-primary">Edit</button>
							</td>
							<td>
								<button className="btn btn-danger" onClick={() => deleteUser(user._id, props.type)}>
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

export default ShowUsers;
