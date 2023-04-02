import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Dogs } from "../../models/Dogs";
import { BACKEND_API_URL } from "../../constants";

export const DogsAdd = () => {
	const navigate = useNavigate();

	const [dog, setDog] = useState<Dogs>({
		name: "",
		breed: "",
		colour: "",
        is_healthy: true,
        date_of_birth: "",
	});

	const addDog = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/dogs/`, dog);
			navigate("/dogs");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/dogs`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addDog}>
						<TextField
							id="name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDog({ ...dog, name: event.target.value })}
						/>
						<TextField
							id="breed"
							label="Breed"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDog({ ...dog, breed: event.target.value })}
						/>
						<TextField
							id="colour"
							label="Colour"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDog({ ...dog, colour: event.target.value })}
						/>
						<TextField
							id="is_healthy"
							label="IsHealthy"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) =>setDog({...dog,is_healthy: event.target.value === "true",})}
						/>
						<TextField
							id="date_of_birth"
							label="DateOfBirth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDog({ ...dog, date_of_birth: new Date(event.target.value).toISOString().substr(0, 10) })}
						/>

						<Button type="submit">Add Dog</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};