import { Card, CardActions, CardContent, IconButton, Toolbar, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Dogs } from "../../models/Dogs";
import { BACKEND_API_URL } from "../../constants";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";

export const DogsDetails = () => {
	const { dogId } = useParams();
    const [dog, setDogs] = useState<Dogs>();
	const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(1000000 / 100);

	useEffect(() => {
		const fetchDog = async () => {
			try {
                const response = await axios.get(`${BACKEND_API_URL}/dogs/${dogId}`);
                const dog = response.data;
                setDogs(dog);
             } catch (error) {
                console.log(error);
             }
		};
		fetchDog();
	}, [dogId]);



	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/dogs`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Dogs Details</h1>
					<p>Dog Name: {dog?.name}</p>
					<p>Dog Breed: {dog?.breed}</p>
					<p>Dog Colour: {dog?.colour}</p>
					<p>Dog IsHealthy: {dog?.is_healthy.toString()}</p>
                    <p>Dog DateOfBirth: {dog?.date_of_birth.toString()}</p>
                    <p>Dogs toys:</p>
					<ul>
						{dog?.toys?.map((toy) => (
							<li key={toy.id}>{toy.name} {toy.colour} {toy.material} with price: {toy.price}</li>
						))}
					</ul>
                    <p>Dog owners:</p>
					<ul>
						{dog?.owners?.map((dog_owner) => (
							<li key={dog_owner.owner?.id}>{dog_owner.owner?.last_name} {dog_owner.owner?.first_name} from {dog_owner.owner?.city}</li>
						))}
					</ul>
					
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/dogs/${dogId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/dogs/${dogId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};