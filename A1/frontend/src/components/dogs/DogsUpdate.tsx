import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Dogs } from "../../models/Dogs";

export const DogsUpdate = () => {
const navigate = useNavigate();
const { dogId } = useParams();

const [dog, setDog] = useState<Dogs>({
    name: "",
    breed: "",
    colour: "",
    is_healthy: true,
    date_of_birth: "",
});

useEffect(() => {
   const fetchDogs = async () => {
      try {
         
         const response = await fetch(`${BACKEND_API_URL}/dogs/${dogId}`);
         const dog = await response.json();
         setDog(dog);
         console.log(dog);
      } catch (error) {
         console.log(error);
      }
   };
   fetchDogs();
}, [dogId]);

const updateDog = async (event: { preventDefault: () => void }) => {
   event.preventDefault();
   try {
   await axios.put(`${BACKEND_API_URL}/dogs/${dogId}`, dog);
   navigate("/dogs");
   } catch (error) {
   console.log(error);
   }
};

   return (
      <Container>
         <Card>
         <CardContent>
            <IconButton component={Link} sx={{ mr: 3 }} to={`/dogs/${dogId}`}>
               <ArrowBackIcon />
            </IconButton>{" "}
            <form onSubmit={updateDog}>
            <TextField
               id="name"
               label="Name"
               variant="outlined"
               fullWidth
               sx={{ mb: 2 }}
               value={dog.name}
               onChange={(event) => setDog({ ...dog, name: event.target.value })}
            />
            <TextField
              id="breed"
              label="Breed"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
               value={dog.breed}
               onChange={(event) => setDog({ ...dog, breed: event.target.value })}
            />
            <TextField
              id="colour"
              label="Colour"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
               value={dog.colour}
               onChange={(event) => setDog({ ...dog, colour: event.target.value })}
            />
            <TextField
              id="is_healthy"
              label="IsHealthy"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
               value={dog.is_healthy}
               onChange={(event) =>setDog({...dog,is_healthy: event.target.value === "true",})}
            />
            <TextField
              id="date_of_birth"
              label="DateOfBirth"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
               value={dog.date_of_birth}
               onChange={(event) => setDog({ ...dog, date_of_birth: new Date(event.target.value).toISOString().substr(0, 10) })}
            />
            <Button type="submit">Update</Button>
            </form>
   </CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};