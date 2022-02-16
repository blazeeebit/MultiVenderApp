import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = ({ history }) => {
	const [ authoption, setauthOption ] = useState('signup');
	const [ email, setEmail ] = useState('');
	const [ name, setName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ cPassword, setCPassword ] = useState('');
	const [ role, setRole ] = useState('');
	const [ error, setError ] = useState('');
	const [ success, setSuccess ] = useState('');
	const [ register, setRegister ] = useState('');
	const [ btnDisabled, setBtnDisabled ] = useState('');

	const usedispatch = useDispatch();

	useEffect(() => {
		setauthOption('buyer');
		setEmail('');
		setName('');
		setPassword('');
		setCPassword('');
		setRole('');
		setError('');
		setRegister('');
		setBtnDisabled('');
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		//check if inputs are empty
		console.log('submitted');

		if (!email || !name || !password || !cPassword || !role) {
			setError('No fields should be left empty');
		} else {
			//clean string

			const trimEmail = email.trim();
			const trimName = name.trim();
			const trimPassword = password.trim();
			const trimRole = role.trim();

			console.log(trimRole);

			if (trimPassword.length < 8) {
				setError('Password must be atleast 8 characters');
			} else {
				if (trimPassword != cPassword) {
					setError('Passwords do not match');
				} else {
					setBtnDisabled('off');
					try {
						const res = await axios.post(`http://localhost:5000/register`, {
							name: trimName,
							email: trimEmail,
							password: trimPassword,
							role: trimRole
						});
						setSuccess('Registeration Successfull');
						setTimeout(() => {
							setauthOption('seller');
						}, 2000);
						setRegister('true');
						setBtnDisabled('on');
					} catch (error) {
						console.log('Error', error);
						if (error.response.status === 400) {
							setError(error.response.data);
							setRegister('false');
							setBtnDisabled('on');
						}
					}
				}
			}
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!email || !password || !role) {
			setError('Fields can not be left empty');
		} else {
			const trimEmail = email;
			const trimPassword = password;
			const trimRole = role;
			setBtnDisabled('off');
			try {
				const res = await axios.post(`http://localhost:5000/login`, {
					email: trimEmail,
					password: trimPassword,
					role: trimRole
				});
				console.log(res);
				if (res.data) {
					//use redux and usedispatch

					//save in localstorage (must be json data)
					window.localStorage.setItem('auth', JSON.stringify(res.data));

					//save user and token to redux
					usedispatch({
						type: 'LOGGED_IN_USER',
						payload: res.data
					});
					setBtnDisabled('on');
					history.push('/dashboard');
				}
			} catch (error) {
				console.log('Error ', error);
				if (error.response.status === 400) {
					setError(error.response.data);
					setBtnDisabled('on');
				}
			}
		}
	};

	const HandleLogin = (e) => {
		e.preventDefault();
		setError('');
		setauthOption('seller');
	};

	const HandleSignUP = (e) => {
		e.preventDefault();
		setError('');
		setauthOption('buyer');
	};

	const SignUpForm = () => {
		return (
			<form
				className={`d-flex w-75 flex-column justify-content-center h-100 ${authoption == 'buyer'
					? 'active'
					: 'inactive'}`}
				onSubmit={handleSubmit}
			>
				<h1 className="heading">Sign Up</h1>
				<div className="form-group">
					<label for="exampleInputPassword1">Name</label>
					<input
						type="text"
						class="form-control"
						id="exampleInputPassword1"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input
						type="email"
						class="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<small id="emailHelp" class="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input
						type="password"
						class="form-control"
						id="exampleInputPassword1"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputPassword1">Confirm Password</label>
					<input
						type="password"
						class="form-control"
						id="exampleInputPassword1"
						value={cPassword}
						onChange={(e) => setCPassword(e.target.value)}
					/>
				</div>
				<select
					className="form-select mb-4"
					aria-label="Default select example"
					value={role}
					onChange={(e) => setRole(e.target.value)}
				>
					<option selected>Select Role</option>
					<option value="User">User</option>
					<option value="Company">Company</option>
				</select>
				<div className="d-flex justify-content-between align-items-center mt-3">
					<button
						type="submit"
						class="btn btn-primary align-self-start"
						disabled={btnDisabled == 'off' ? true : false}
					>
						Register
					</button>
					<p>
						Already have an Account?{' '}
						<span className="signin" onClick={HandleLogin}>
							Sign In
						</span>
					</p>
				</div>
				<span className={register == 'true' ? 'success' : 'failed'}>
					{register == 'true' ? success : error}
				</span>
			</form>
		);
	};

	const LoginForm = () => {
		return (
			<form
				className={`d-flex w-75 flex-column justify-content-center h-100 ${authoption == 'seller'
					? 'active'
					: 'inactive'}`}
				onSubmit={handleLogin}
			>
				<h1 className="heading">Sign In</h1>

				<div className="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input
						type="email"
						class="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<small id="emailHelp" class="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input
						type="password"
						class="form-control"
						id="exampleInputPassword1"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<select
					className="form-select mb-4"
					aria-label="Default select example"
					value={role}
					onChange={(e) => setRole(e.target.value)}
				>
					<option selected>Select Role</option>
					<option value="User">User</option>
					<option value="Company">Company</option>
				</select>
				<div className="d-flex justify-content-between align-items-center mt-3">
					<button
						type="submit"
						class="btn btn-primary align-self-start"
						disabled={btnDisabled == 'off' ? true : false}
					>
						Login
					</button>
					<p>
						Already have an Account?{' '}
						<span className="signin" onClick={HandleSignUP}>
							Sign Up
						</span>
					</p>
				</div>
				<span className={register == 'true' ? 'success' : 'failed'}>
					{register == 'true' ? success : error}
				</span>
			</form>
		);
	};

	return (
		<div className="container-fluid main-cont">
			<div className="row h-100 d-flex justify-content-center align-items-center">
				<div className="col-9 h-100 d-flex justify-content-center align-items-center">
					{authoption == 'buyer' ? SignUpForm() : LoginForm()}
				</div>
			</div>
		</div>
	);
};

export default SignUp;
