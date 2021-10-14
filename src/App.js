import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route } from "react-router";
import SignUp from "./components/SignUp";
import { useState } from "react";

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
			const response = await fetch("http://127.0.0.1:8000/users/me/", {
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
			const response = await fetch("http://127.0.0.1:8000/token/logout/", {
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
  }

  return (
    < >
      <Header loggedIn={loggedIn} handleLogout={handleLogout} userInfo={userInfo} />
      <Route exact path="/" render={() => <Home getUserInfo={getUserInfo} />} />
      <Route path="/login" render={() => <Login handleSetLoggedIn={handleSetLoggedIn} />} />
      <Route path="/signup" render={() => <SignUp />} />
    </>
  );
}

export default App;
