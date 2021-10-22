import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardGroup, Button } from 'react-bootstrap';
import API_URL from '../../apiConfig';

const Restaurants = ({ loggedIn }) => {
	const [restaurants, setRestaurants] = useState([]);

	const getRestaurantsIndex = async () => {
		try {
			const response = await fetch(API_URL + 'restaurants/');
			const data = await response.json();
			console.log(data);
			setRestaurants(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getRestaurantsIndex();
	}, []);

	if (!restaurants.length) {
		return null;
	}

	return (
		<Container>
			<h1>Restaurants</h1>
			{loggedIn && (
				<Link to='restaurants/new'>
					<Button>Add a restaurant</Button>
				</Link>
			)}
			<CardGroup>
				<Row>
					{restaurants.map((restaurant) => {
						return (
							<Col key={restaurant.id}>
								<Link
									to={`restaurants/${restaurant.id}`}
									style={{ color: 'black', textDecoration: 'none' }}>
									<Card>
										<Card.Img
											variant='top'
											src='https://cdn.pixabay.com/photo/2015/03/26/10/28/restaurant-691397_1280.jpg'
										/>
										<Card.Body>
											<Card.Title>{restaurant.name}</Card.Title>
											<Card.Text>
												Number of reviews: {restaurant.reviews.length}
											</Card.Text>
										</Card.Body>
									</Card>
								</Link>
							</Col>
						);
					})}
				</Row>
			</CardGroup>
		</Container>
	);
};

export default Restaurants;
