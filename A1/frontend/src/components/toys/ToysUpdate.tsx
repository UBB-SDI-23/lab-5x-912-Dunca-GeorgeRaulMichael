import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField, debounce } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Dogs } from "../../models/Dogs";
import { Toys } from "../../models/Toys";

export const ToysUpdate = () => {
const navigate = useNavigate();
const { toyId } = useParams();

const myDog: Dogs = {
    name: "Spike",
    breed: "Labrador",
    colour: "Golde",
    is_healthy: true,
    date_of_birth: "2020-05-05",
  };
const [toy, setToy] = useState<Toys>({
    name: "",
    dog: myDog,
    material: "",
    colour: "",
    price:1,
    descriptions: "",
});

useEffect(() => {
   const fetchToys = async () => {
      try {
         
         const response = await fetch(`${BACKEND_API_URL}/toys/${toyId}`);
         const toy = await response.json();
         setToy(toy);
         console.log(toy);
      } catch (error) {
         console.log(error);
      }
   };
   fetchToys();
}, [toyId]);

const updateToy = async (event: { preventDefault: () => void }) => {
   event.preventDefault();
   try {
   await axios.put(`${BACKEND_API_URL}/toys/${toyId}`, toy);
   navigate("/toys");
   } catch (error) {
   console.log(error);
   }
};

const [dogs,setDogs]=useState<Dogs[]>([]);
    const fetchSuggestions= async(query: string) => {
        try {
            const response=await axios.get<Dogs[]>(
            
                `${BACKEND_API_URL}/dogs/autocomplete?query=${query}`
            );
            const data= await response.data;
            setDogs(data);
        } catch (error) {
            console.log("Error fetching suggestions",error);
            
        }

    };

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions,300),[]);

    //  useEffect(()=>{
    //      return () => {
    //          debouncedFetchSuggestions.cancel();
    //      };
    //  },[debouncedFetchSuggestions]);

    const handleInputChange=(event:any,value:any,reason:any)=>
    {
        console.log("input",value,reason);
        if (reason=="input")
        {
            
            debouncedFetchSuggestions(value);
        }
    }
   return (
      <Container>
         <Card>
         <CardContent>
            <IconButton component={Link} sx={{ mr: 3 }} to={`/toys/${toyId}/details`}>
               <ArrowBackIcon />
            </IconButton>{" "}
            <form onSubmit={updateToy}>
            <TextField
				id="name"
				label="Name"
				variant="outlined"
				fullWidth
				sx={{ mb: 2 }}
                value={toy.name}
				onChange={(event) => setToy({ ...toy, name: event.target.value })}
			/>
			<Autocomplete
               
                sx={{ mb: 2 }}
                
                id="dog"
                options={dogs}       
                getOptionLabel={(option)=> `${option.name} - ${option.breed} - ${option.colour}`}
                renderInput={(params)=> <TextField {...params} label="Dog" />}
                filterOptions={(x)=>x}
                onInputChange={handleInputChange}
                onChange={(event,value)=>
                {

                                
                    if (value)
                    {
                        
                        console.log("VALUE:",value);
                        setToy({...toy, dog: value.id})
                        console.log(toy.dog);
                    }
                }}
                />
				<TextField
				    id="material"
					label="Material"
					variant="outlined"
					fullWidth
					sx={{ mb: 2 }}
                    value={toy.material}
					onChange={(event) => setToy({ ...toy, material: event.target.value })}
				/>
				<TextField
				    id="colour"
					label="Colour"
					variant="outlined"
					fullWidth
					sx={{ mb: 2 }}
                    value={toy.colour}
					onChange={(event) =>setToy({...toy,colour: event.target.value})}
				/>
				<TextField
					id="price"
					label="Price"
					variant="outlined"
					fullWidth
					sx={{ mb: 2 }}
                    value={toy.price}
					onChange={(event) => setToy({ ...toy, price: parseInt(event.target.value) })}
				/>
                <TextField
					id="descriptions"
					label="Descriptions"
					variant="outlined"
					fullWidth
					sx={{ mb: 2 }}
                    value={toy.descriptions}
					onChange={(event) => setToy({ ...toy, descriptions: event.target.value })}
				/>

            <Button type="submit">Update</Button>
            </form>
   </CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
      
	);
};