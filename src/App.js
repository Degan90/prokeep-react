import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Restaurants from './components/Restaurants/Restaurants';
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail';
import RestaurantCreate from './components/RestaurantCreate/RestaurantCreate';
import './App.css';
import API_URL from './apiConfig';

function App() {
	const [loggedIn, setLoggedIn] = useState(
		localStorage.getItem('token') ? true : false
	);
	const [userInfo, setUserInfo] = useState(null);
	const handleSetLoggedIn = (token) => {
		localStorage.setItem('token', token);
		getUserInfo();
		console.log(localStorage.getItem('token'));
		setLoggedIn(true);
	};

	const getUserInfo = async () => {
		try {
			const response = await fetch(API_URL + 'users/me/', {
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
			const data = await response.json();
			console.log(data);
			setUserInfo(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogout = async () => {
		console.log(localStorage.getItem('token'));
		try {
			const response = await fetch(API_URL + 'token/logout/', {
				method: 'POST',
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
			if (response.status === 204) {
				alert('You have been logged out!');
				setLoggedIn(false);
				setUserInfo(null);
				localStorage.removeItem('token');
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (loggedIn) {
			getUserInfo();
		}
	}, []);

	return (
		<>
			<Navigation
				loggedIn={loggedIn}
				handleLogout={handleLogout}
				userInfo={userInfo}
			/>
			<main>
				<Container>
					<Switch>
						<Route path='/' exact component={Home} />
						<Route
							exact
							path='/login'
							render={() => <Login handleSetLoggedIn={handleSetLoggedIn} />}
						/>
						<Route exact path='/signup' component={Signup} />
						<Route
							path='/restaurants/new'
							render={() => <RestaurantCreate loggedIn={loggedIn} />}
						/>
						<Route
							path='/restaurants'
							exact
							render={() => <Restaurants loggedIn={loggedIn} />}
						/>
						<Route
							path='/restaurants/:id'
							render={() => (
								<RestaurantDetail userInfo={userInfo} loggedIn={loggedIn} />
							)}
						/>
					</Switch>
				</Container>
			</main>
		</>
	);
}

export default App;
