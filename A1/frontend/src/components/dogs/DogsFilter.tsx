import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../constants";
import { Dogs } from "../../models/Dogs";


export const DogsFilter= () => {
    const[loading, setLoading] = useState(true)
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
    fetch(`${BACKEND_API_URL}/dogs/avg-by-toy-price`)
        .then(res => res.json())
        .then(data => {setDogs(data); setLoading(false);})
    }, []);

    console.log(dogs);

    
    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All Dogs Ordered By The Avg price of their toys</h1>

        {loading && <CircularProgress />}

        {!loading && dogs.length == 0 && <div>No dogs found</div>}

        {!loading && dogs.length > 0 && (

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Name</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Breed</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Colour</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>IsHealthy</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>DateOfBirth</TableCell>
                            <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Avg Price of Toys</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dogs.map((dogs:Dogs, index) => (
                            <TableRow key={dogs.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{dogs.name}</TableCell>
                                <TableCell align="center">{dogs.breed}</TableCell>
                                <TableCell align="center">{dogs.colour}</TableCell>
                                <TableCell align="center">{dogs.is_healthy.toString()}</TableCell>
                                <TableCell align="center">{dogs.date_of_birth}</TableCell>
                                <TableCell align="center">{dogs.avg_price}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
        )
        }
    </Container>
        
    );       
};
