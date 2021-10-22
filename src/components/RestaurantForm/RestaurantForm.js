import { Form, Button, Alert } from 'react-bootstrap';

const RestaurantForm = ({ handleSubmit, formData, handleChange, error }) => {
	return (
		<div className='w-75 p-3'>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						required
						autoFocus
						type='text'
						value={formData.name}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='cuisine'>
					<Form.Label>Cuisine</Form.Label>
					<Form.Control
						required
						type='text'
						value={formData.cuisine}
						onChange={handleChange}
					/>
				</Form.Group>

				<Button type='submit' disabled={error}>
					Submit
				</Button>
				{error && (
					<Alert variant='danger'>
						Oops, something went wrong! Please try again!
					</Alert>
				)}
			</Form>
		</div>
	);
};

export default RestaurantForm;
