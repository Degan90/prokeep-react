import React from 'react';
import { Container, Image } from 'react-bootstrap';

const Home = () => {
	return (
		<Container className='p-5 border rounded-3 bg-light'>
			<h1>DRF Restaurants</h1>
			<Image
				rounded
				fluid
				src='https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_1280.jpg'
			/>
		</Container>
	);
};

export default Home;
