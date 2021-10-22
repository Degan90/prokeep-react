import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Button } from 'react-bootstrap';
import API_URL from '../../apiConfig';
const RestaurantDetail = ({ userInfo, loggedIn }) => {
	const [restaurant, setRestaurant] = useState(null);
	const { id } = useParams();
	const getRestaurantDetail = async () => {
		try {
			const response = await fetch(API_URL + `restaurants/${id}`);
			const data = await response.json();
			console.log(data);
			if (response.status === 200) {
				setRestaurant(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getRestaurantDetail();
	}, []);

	if (!restaurant) {
		return null;
	}

	return (
		<Container className='p-5 border rounded-3 bg-light'>
			<div className='d-flex justify-content-between'>
				<div>
					<h2>{restaurant.name}</h2>
				</div>
				{userInfo && userInfo.username === restaurant.owner && (
					<div>
						<Button variant='secondary'>Edit</Button>
						<Button variant='danger'>Delete</Button>
					</div>
				)}
			</div>
			<h3>Cuisine: {restaurant.cuisine}</h3>
			<Image
				rounded
				fluid
				src='https://cdn.pixabay.com/photo/2015/09/02/12/43/food-918639_1280.jpg'
			/>
			<h2>Reviews: </h2>
			{!restaurant.reviews.length && <p>No reviews yet!</p>}
			{loggedIn && <Button>Write a review</Button>}
			{restaurant.reviews.length > 0 &&
				restaurant.reviews.map((review) => {
					return (
						<Container
							className='p-5 border rounded-3 bg-light'
							key={review.id}>
							<h4>{review.title}</h4>
							<p>{review.body}</p>
							<small>
								Posted by: {review.owner} at{' '}
								{new Date(review.created).toLocaleString()}
							</small>
							{userInfo && userInfo.username === review.owner && (
								<div>
									<Button variant='secondary'>Edit</Button>
									<Button variant='danger'>Delete</Button>
								</div>
							)}
						</Container>
					);
				})}
		</Container>
	);
};

export default RestaurantDetail;
