import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import RestaurantForm from '../RestaurantForm/RestaurantForm';
import API_URL from '../../apiConfig';
const RestaurantCreate = ({ loggedIn }) => {
	const initialRestaurantData = {
		name: '',
		cuisine: '',
	};
	const history = useHistory();
	const [newRestaurant, setNewRestaurant] = useState(initialRestaurantData);
	const handleChange = (event) => {
		setNewRestaurant((prevState) => {
			return { ...prevState, [event.target.id]: event.target.value };
		});
	};
	const createRestaurant = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch(API_URL + 'restaurants/', {
				method: 'POST',
				body: JSON.stringify(newRestaurant),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
			if (response.status === 201) {
				history.push('/restaurants');
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (!loggedIn) {
		return <Redirect to='/login' />;
	}

	return (
		<div>
			<h2>Add a restaurant</h2>
			<RestaurantForm
				handleSubmit={createRestaurant}
				handleChange={handleChange}
				formData={newRestaurant}
			/>
		</div>
	);
};

export default RestaurantCreate;
