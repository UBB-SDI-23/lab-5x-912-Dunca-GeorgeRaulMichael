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
import { Owners } from "../../models/Owners";

export const OwnersUpdate = () => {
const navigate = useNavigate();
const { ownerId } = useParams();

const [owner, setOwner] = useState<Owners>({
    first_name: "",
    last_name: "",
    email: "",
    city:" ",
    date_of_birth: "",
});

useEffect(() => {
   const fetchOwners = async () => {
      try {
         
         const response = await fetch(`${BACKEND_API_URL}/owners/${ownerId}`);
         const owner = await response.json();
         setOwner(owner);
         console.log(owner);
      } catch (error) {
         console.log(error);
      }
   };
   fetchOwners();
}, [ownerId]);

const updateOwner = async (event: { preventDefault: () => void }) => {
   event.preventDefault();
   try {
   await axios.put(`${BACKEND_API_URL}/owners/${ownerId}`, owner);
   navigate("/owners");
   } catch (error) {
   console.log(error);
   }
};


const [DateError, setDateError] = useState('');
	function handleDateChange(event:any) {
		const input = event.target.value;
		const regex= /^\d{4}-\d{1,2}-\d{1,2}$/;
		const max_date="2016-01-01"
		if (regex.test(input))
		{	
			if (input >max_date) {
	
        setDateError('Date must be smaller than '+max_date);
        setOwner({ ...owner, date_of_birth: input });
		} else {
		  setDateError('');
		  setOwner({ ...owner, date_of_birth: input });
		}
	}
		else
		{
			setDateError('Invalid date!');
         setOwner({ ...owner, date_of_birth: input });
		}
	}

	
	const [EmailError, setEmailError] = useState('');
	function handleEmailChange(event:any) {
		const input = event.target.value;
		const regex= /^.+@.+\..+$/;
      
		if (! regex.test(input))
		{	
			
			setEmailError('Invalid email !');
			setOwner({ ...owner, email: input });
		} else {
        
			setEmailError('');
		  setOwner({ ...owner, email: input });
		}
	}

   return (
      <Container>
         <Card>
         <CardContent>
            <IconButton component={Link} sx={{ mr: 3 }} to={`/owners/${ownerId}/details`}>
               <ArrowBackIcon />
            </IconButton>{" "}
            <form onSubmit={updateOwner}>
            <TextField
               id="first_name"
               label="First Name"
               variant="outlined"
               fullWidth
               sx={{ mb: 2 }}
               value={owner.first_name}
               onChange={(event) => setOwner({ ...owner, first_name: event.target.value })}
            />
            <TextField
              id="last_name"
              label="Last Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={owner.last_name}
              onChange={(event) => setOwner({ ...owner, last_name: event.target.value })}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={owner.email}
              onChange={handleEmailChange}
        			error={!!EmailError}
        			helperText={EmailError}
            />
            <TextField
              id="city"
              label="City"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
               value={owner.city}
               onChange={(event) =>setOwner({...owner,city: event.target.value})}
            />
            <TextField
              id="date_of_birth"
              label="DateOfBirth"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={owner.date_of_birth}
              onChange={handleDateChange}
        		  error={!!DateError}
        		  helperText={DateError}
            />
            <Button type="submit">Update</Button>
            </form>
   </CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
      
	);
};