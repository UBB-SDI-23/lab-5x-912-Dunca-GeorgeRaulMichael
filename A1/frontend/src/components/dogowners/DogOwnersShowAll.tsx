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
import { DogOwners } from "../../models/DogOwner";

  export const DogOwnersShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [dogowners, setDogOwners] = useState<DogOwners[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(10000000 / 10);

    useEffect(() => {
      setLoading(true);
      console.log(currentPage);
      fetch(`${BACKEND_API_URL}/dogowners/?p=${currentPage}`)
        .then((response) => response.json())
        .then((data) => {
            setDogOwners(data.results);
          console.log(data.results);
          setLoading(false);
        });
    }, []);
    

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        
        setCurrentPage(currentPage + 1);
        console.log(currentPage);
        setLoading(true);
        fetch(`${BACKEND_API_URL}/dogowners/?p=${currentPage+1}`)
        .then((response) => response.json())
        .then((data) => {
          setDogOwners(data.results);
          setLoading(false);
        });
        
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        
        setCurrentPage(currentPage - 1);
        console.log(currentPage);
        setLoading(true);
        fetch(`${BACKEND_API_URL}/dogowners/?p=${currentPage-1}`)
        .then((response) => response.json())
        .then((data) => {
          setDogOwners(data.results);
          setLoading(false);
        });
         
      }
    };

    return (
      <Container>
        <h1>All dogowners</h1>
        <label>Current Page: {currentPage}</label> 
        {loading && <CircularProgress />}
        {!loading && dogowners.length === 0 && <p>No dogowners found</p>}
        {!loading && (
          <Toolbar>
          <IconButton onClick={handlePrevPage} style={{ marginRight:'370px'}} component={Link} sx={{ mr: 3 }} to={`/dogowners/?p=${currentPage}`} disabled={currentPage === 1}>
            <Tooltip title="Previous">
             <ArrowBackIosIcon sx={{ color: "white" }} />
            </Tooltip>
          </IconButton>
          <IconButton component={Link} sx={{ mr: 3 }} to={`/dogowners/add`}>
            <Tooltip title="Add a new dogowner" arrow>
              <AddIcon color="primary" />
            </Tooltip>
          </IconButton>
        <IconButton style={{ marginLeft:'370px'}} onClick={handleNextPage} component={Link} sx={{ mr: 3 }}  to={`/dogowners/?p=${currentPage }`} disabled={currentPage === totalPages}>
            <Tooltip title="Next">
             <ArrowForwardIosIcon sx={{ color: "white" }} />
            </Tooltip>
          </IconButton>
        </Toolbar>
        )}
        {!loading && dogowners.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">Dog</TableCell>
                  <TableCell align="left">Owner</TableCell>
                  <TableCell align="right">Adoption Date</TableCell>
                  <TableCell align="right">Adoption Fee</TableCell>
                  <TableCell align="center">Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dogowners.map((dogowner, index) => (
                  <TableRow key={dogowner.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={`/dogs/${dogowner.dog}/details`} title="View dog details">
                        {dogowner.dog.toString()}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={`/owners/${dogowner.owner}/details`} title="View owner details">
                        {dogowner.owner.toString()}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{dogowner.adoption_date.toString()}</TableCell>
                    <TableCell align="right">{dogowner.adoption_fee}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/dogowners/${dogowner.dog}/${dogowner.owner}/details`}>
                        <Tooltip title="View dogowner details" arrow>
                          <ReadMoreIcon color="primary" />
                        </Tooltip>
                      </IconButton>
  
                      <IconButton component={Link} sx={{ mr: 3 }} to={`/dogowners/${dogowner.dog}/${dogowner.owner}/edit`}>
                        <EditIcon />
                      </IconButton>
  
                      <IconButton component={Link} sx={{ mr: 3 }} to={`/dogowners/${dogowner.dog}/${dogowner.owner}/delete`}>
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