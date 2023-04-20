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
import { Owners } from "../../models/Owners";

  export const OwnersShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [owners, setOwners] = useState<Owners[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(1000000 / 10);

    useEffect(() => {
      setLoading(true);
      console.log(currentPage);
      fetch(`${BACKEND_API_URL}/owners/?p=${currentPage}`)
        .then((response) => response.json())
        .then((data) => {
          setOwners(data.results);
          
          setLoading(false);
        });
    }, []);
    


    const handleNextPage = () => {
      if (currentPage < totalPages) {
        
        setCurrentPage(currentPage + 1);
        console.log(currentPage);
        setLoading(true);
        fetch(`${BACKEND_API_URL}/owners/?p=${currentPage+1}`)
        .then((response) => response.json())
        .then((data) => {
          setOwners(data.results);
          setLoading(false);
        });
        
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        
        setCurrentPage(currentPage - 1);
        console.log(currentPage);
        setLoading(true);
        fetch(`${BACKEND_API_URL}/owners/?p=${currentPage-1}`)
        .then((response) => response.json())
        .then((data) => {
          setOwners(data.results);
          setLoading(false);
        });
         
      }
    };

    return (
      <Container>
        <h1>All owners</h1>
        <label>Current Page: {currentPage}</label> 
        {loading && <CircularProgress />}
        {!loading && owners.length === 0 && <p>No owners found</p>}
        {!loading && (
          <Toolbar>
          <IconButton onClick={handlePrevPage} style={{ marginRight:'370px'}} component={Link} sx={{ mr: 3 }} to={`/owners/?p=${currentPage}`} disabled={currentPage === 1}>
            <Tooltip title="Previous">
             <ArrowBackIosIcon sx={{ color: "white" }} />
            </Tooltip>
          </IconButton>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/owners/add`}>
            <Tooltip title="Add a new owner" arrow>
              <AddIcon color="primary" />
            </Tooltip>
          </IconButton>
        <IconButton style={{ marginLeft:'370px'}} onClick={handleNextPage} component={Link} sx={{ mr: 3 }}  to={`/owners/?p=${currentPage }`} disabled={currentPage === totalPages}>
            <Tooltip title="Next">
             <ArrowForwardIosIcon sx={{ color: "white" }} />
            </Tooltip>
          </IconButton>
        </Toolbar>
        )}
        {!loading && owners.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="right">City</TableCell>
                  <TableCell align="right">DateOfBirth</TableCell>
                  <TableCell align="right">NrOfDogs</TableCell>
                  <TableCell align="center">Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {owners.map((owner, index) => (
                  <TableRow key={owner.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={`/owners/${owner.id}/details`} title="View owner details">
                        {owner.first_name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{owner.last_name}</TableCell>
                    <TableCell align="right">{owner.email}</TableCell>
                    <TableCell align="right">{owner.city}</TableCell>
                    <TableCell align="right">{owner.date_of_birth.toString()}</TableCell>
                    <TableCell align="right">{owner.nr_of_dogs}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/owners/${owner.id}/details`}>
                        <Tooltip title="View owner details" arrow>
                          <ReadMoreIcon color="primary" />
                        </Tooltip>
                      </IconButton>
  
                      <IconButton component={Link} sx={{ mr: 3 }} to={`/owners/${owner.id}/edit`}>
                        <EditIcon />
                      </IconButton>
  
                      <IconButton component={Link} sx={{ mr: 3 }} to={`/owners/${owner.id}/delete`}>
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