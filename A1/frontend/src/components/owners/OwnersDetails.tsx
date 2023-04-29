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
import { Owners } from "../../models/Owners";

export const OwnersDetails = () => {
	const { ownerId } = useParams();
    const [owner, setOwners] = useState<Owners>();


	useEffect(() => {
		const fetchOwner = async () => {
			try {
                const response = await axios.get(`${BACKEND_API_URL}/owners/${ownerId}`);
                const owner = response.data;
                setOwners(owner);
             } catch (error) {
                console.log(error);
             }
		};
		fetchOwner();
	}, [ownerId]);

	return (
		<Container style={{ height:'100vh',marginTop:'100px'}}>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/owners`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Owners Details</h1>
					<p>Owner First Name: {owner?.first_name}</p>
					<p>Owner Last Name: {owner?.last_name}</p>
					<p>Owner Email: {owner?.email}</p>
					<p>Owner City: {owner?.city}</p>
                    <p>Owner DateOfBirth: {owner?.date_of_birth.toString()}</p>
                    <p>Owner dogs:</p>
					<ul>
						{owner?.dogs?.map((dog_owner) => (
							<li key={dog_owner.dog?.id}>{dog_owner.dog?.name} {dog_owner.dog?.breed} of colour {dog_owner.dog?.colour} with date of birth: {dog_owner.dog?.date_of_birth}</li>
						))}
					</ul>
					
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/owners/${ownerId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/owners/${ownerId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};