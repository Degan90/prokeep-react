import { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import API_URL from '../../apiConfig';

const Signup = () => {
	const initialFormData = {
		email: '',
		username: '',
		password: '',
		re_password: '',
	};

	const history = useHistory();
	const [formData, setFormData] = useState(initialFormData);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const handleChange = (event) => {
		setFormData((prevState) => {
			return { ...prevState, [event.target.id]: event.target.value };
		});
	};

	const _handleSignup = async (event) => {
		event.preventDefault();
		if (!error) {
			try {
				const response = await fetch(API_URL + 'users/', {
					method: 'POST',
					body: JSON.stringify(formData),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const data = await response.json();
				if (response.status === 201) {
					setSuccess(true);
					setTimeout(() => {
						history.push('/login');
					}, 3000);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handlePasswordMatch = (event) => {
		if (formData.password !== formData.re_password) {
			setError(true);
		} else {
			setError(false);
		}
	};

	return (
		<div className='w-75 p-3'>
			<h2>Create an account</h2>
			<Form onSubmit={_handleSignup}>
				<Form.Group controlId='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						required
						autoFocus
						type='text'
						value={formData.username}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						required
						autoFocus
						type='email'
						value={formData.email}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						required
						type='password'
						value={formData.password}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='re_password'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						required
						type='password'
						value={formData.re_password}
						onChange={handleChange}
						onBlur={handlePasswordMatch}
					/>
				</Form.Group>
				<Button type='submit' disabled={error}>
					Sign up
				</Button>
				{error && <Alert variant='danger'>Passwords must match!</Alert>}
				{success && (
					<Alert variant='success'>
						User successfully created! You will be redirected to log in. If you
						are not automatically redirected, please click{' '}
						{<Link to='login'>here</Link>}.
					</Alert>
				)}
			</Form>
		</div>
	);
};

export default Signup;
