/*
import { useEffect, useState } from 'react'
import { Dogs } from '../../models/Dogs';

function DogsShowAll () {
    const [dogs, setDogs] = useState([]);

    useEffect(() =>{
    fetch('http://127.0.0.1:8000/dogs/')
      .then(res => res.json())
      .then((data)=>setDogs(data));
    },[]);
    
    if (dogs.length===0)
      {
        return <div>No dogs.</div>
      }

      
    return (
      
      <div className="App">
        
        <h1>Dogs Table</h1>
        <table>
            <tr>
                <th>#</th>
                <th>Dog name</th>
                <th>Breed</th>
                <th>Colour</th>
                <th>IsHealthy</th>
                <th>DateOfBirth</th>
            </tr>
            {dogs.map((dog:Dogs,index)=>(
              <tr key={index}>
                  <td>{index}</td>
                  <td>{dog.name}</td>
                  <td>{dog.breed}</td>
                  <td>{dog.colour}</td>
                  <td>{dog.is_healthy.toString()}</td>
                  <td>{dog.date_of_birth.toString()}</td>
              </tr>
            ))}
        </table>
      </div>
    );
  };
  
  export default DogsShowAll
  */


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
    Toolbar,
    Button,
  } from "@mui/material";
  import React from "react";
  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import ReadMoreIcon from "@mui/icons-material/ReadMore";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
  import AddIcon from "@mui/icons-material/Add";
import { Dogs } from "../../models/Dogs";
import { BACKEND_API_URL } from "../../constants";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

  export const DogsShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [dogs, setDogs] = useState<Dogs[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(1000000 / 100);

    useEffect(() => {
      setLoading(true);
      fetch(`${BACKEND_API_URL}/dogs/`)
        .then((response) => response.json())
        .then((data) => {
          setDogs(data);
          setLoading(false);
        });
    }, []);
    
    const orderByDateOfBirth = () => {
      const sorted = [...dogs].sort((a, b) => {
        const dateA = new Date(a.date_of_birth).getTime();
        const dateB = new Date(b.date_of_birth).getTime();
        return dateA - dateB;
      });
      setDogs(sorted);
    }

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        //console.log(currentPage);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        //console.log(currentPage);
      }
    };

    return (
      <Container>
        <h1>All dogs</h1>
  
        {loading && <CircularProgress />}
        {!loading && dogs.length === 0 && <p>No dogs found</p>}
        {!loading && (
          <Toolbar>
          <IconButton onClick={handlePrevPage} style={{ marginRight:'370px'}} component={Link} sx={{ mr: 3 }} to={`/dogs/?p=${currentPage - 1}`} disabled={currentPage === 1}>
            <Tooltip title="Previous">
             <ArrowBackIosIcon sx={{ color: "white" }} />
            </Tooltip>
          </IconButton>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/dogs/add`}>
            <Tooltip title="Add a new dog" arrow>
              <AddIcon color="primary" />
            </Tooltip>
          </IconButton>
          <Button
          onClick={orderByDateOfBirth}
          >Order ByDateOfBirth
        </Button>
        <IconButton style={{ marginLeft:'370px'}} onClick={handleNextPage} component={Link} sx={{ mr: 3 }}  to={`/dogs/?p=${currentPage + 1}`} disabled={currentPage === totalPages}>
            <Tooltip title="Next">
             <ArrowForwardIosIcon sx={{ color: "white" }} />
            </Tooltip>
          </IconButton>
        </Toolbar>
        )}
        {!loading && dogs.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Breed</TableCell>
                  <TableCell align="right">Colour</TableCell>
                  <TableCell align="right">IsHealthy</TableCell>
                  <TableCell align="right">DateOfBirth</TableCell>
                  <TableCell align="center">Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dogs.map((dog, index) => (
                  <TableRow key={dog.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={`/dogs/${dog.id}/details`} title="View dog details">
                        {dog.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{dog.breed}</TableCell>
                    <TableCell align="right">{dog.colour}</TableCell>
                    <TableCell align="right">{dog.is_healthy.toString()}</TableCell>
                    <TableCell align="right">{dog.date_of_birth.toString()}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/dogs/${dog.id}/details`}>
                        <Tooltip title="View dog details" arrow>
                          <ReadMoreIcon color="primary" />
                        </Tooltip>
                      </IconButton>
  
                      <IconButton component={Link} sx={{ mr: 3 }} to={`/dogs/${dog.id}/edit`}>
                        <EditIcon />
                      </IconButton>
  
                      <IconButton component={Link} sx={{ mr: 3 }} to={`/dogs/${dog.id}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    );
  };