import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import API_URL from '../../apiConfig';

const Login = ({ handleSetLoggedIn }) => {
	const initialFormData = {
		email: '',
		password: '',
	};
	const history = useHistory();
	const [formData, setFormData] = useState(initialFormData);
	const handleChange = (event) => {
		setFormData((prevState) => {
			return { ...prevState, [event.target.id]: event.target.value };
		});
	};
	const _handleLogin = async (event) => {
		event.preventDefault();
		try {
			const API_ENDPOINT = API_URL + 'token/login/';
			const response = await fetch(API_ENDPOINT, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			console.log(data);
			handleSetLoggedIn(data.auth_token);
			history.push('/');
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<h2>Log in</h2>
			<Form onSubmit={_handleLogin}>
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
				<Button type='submit'>Login</Button>
			</Form>
		</div>
	);
};

export default Login;
