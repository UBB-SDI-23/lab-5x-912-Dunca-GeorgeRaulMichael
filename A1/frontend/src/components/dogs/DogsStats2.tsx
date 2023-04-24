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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_API_URL } from "../../constants";
import { Dogs } from "../../models/Dogs";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const DogsStats= () => {
    const[loading, setLoading] = useState(true)
    const [dogs, setDogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(1000000 / 10);

    useEffect(() => {
    fetch(`${BACKEND_API_URL}/dogs/nr-of-owners?p=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setDogs(data.results);
      
        setLoading(false);
    });
    }, []);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
          
          setCurrentPage(currentPage + 1);
          
          setLoading(true);
          fetch(`${BACKEND_API_URL}/dogs/nr-of-owners?p=${currentPage+1}`)
          .then((response) => response.json())
          .then((data) => {
            setDogs(data.results);
            setLoading(false);
          });
          
        }
      };
    
      const handlePrevPage = () => {
        if (currentPage > 1) {
          
          setCurrentPage(currentPage - 1);
          
          setLoading(true);
          fetch(`${BACKEND_API_URL}/dogs/nr-of-owners?p=${currentPage-1}`)
          .then((response) => response.json())
          .then((data) => {
            setDogs(data.results);
            setLoading(false);
          });
           
        }
      };
      

      const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    
        setLoading(true);
        fetch(`${BACKEND_API_URL}/dogs/nr-of-owners?p=${newPage}`)
          .then((response) => response.json())
          .then((data) => {
            setDogs(data.results);
            setLoading(false);
          });
      };
    
      const pageNumbers = [];
      for (
        let i = Math.max(1, currentPage - 5);
        i <= Math.min(totalPages, currentPage + 5);
        i++
      ) {
        pageNumbers.push(i);
      }


    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All Dogs Ordered By The nr of Owners they have </h1>
        <label>Current Page: {currentPage}</label> 
        {loading && <CircularProgress />}

        {!loading && dogs.length == 0 && <div>No dogs found</div>}
        
        {!loading && (
        <Toolbar>
          <div style={{width:"1200px"}}>
            {currentPage > 1 && (
              <button style={{margin:"3px"}} onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            )}
            {pageNumbers[0] > 1 && (
              <>
                <button style={{margin:"3px"}} onClick={() => handlePageChange(1)}>1</button>
                {pageNumbers[0] > 2 && <span style={{margin:"3px"}} >...</span>}
              </>
            )}
            {pageNumbers.map((pageNumber) => (
              <button
              style={{
                margin: "3px",
                backgroundColor: currentPage === pageNumber ? "grey" : "",
                pointerEvents: currentPage === pageNumber ? "none" : "auto"
              }}
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            {pageNumbers[pageNumbers.length - 1] <= totalPages - 1 && (
              <>
                {pageNumbers[pageNumbers.length - 1] <= totalPages - 2 && (
                  <span style={{margin:"3px"}}>...</span>
                )}
                <button style={{margin:"3px"}} onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </button>
              </>
            )}
            {currentPage < totalPages && (
              <button style={{margin:"3px"}} onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            )}
          </div>
            {/* <IconButton onClick={handlePrevPage} style={{marginLeft:'90px', marginRight:'370px'}} component={Link} sx={{ mr: 3 }} to={`/dogs/nr-of-owners?p=${currentPage}`} disabled={currentPage === 1}>
              <Tooltip title="Previous">
               <ArrowBackIosIcon sx={{ color: "white" }} />
              </Tooltip>
            </IconButton>

            <IconButton style={{ marginLeft:'370px',marginRight:'90px'}} onClick={handleNextPage} component={Link} sx={{ mr: 3 }}  to={`/dogs/nr-of-owners?p=${currentPage}`} disabled={currentPage === totalPages}>
            <Tooltip title="Next">
             <ArrowForwardIosIcon sx={{ color: "white" }} />
            </Tooltip>
          </IconButton> */}
            </Toolbar>
        )}
        {!loading && dogs.length > 0 && (
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center" >Name</TableCell>
                            <TableCell align="center" >Breed</TableCell>
                            <TableCell align="center" >Colour</TableCell>
                            <TableCell align="center" >IsHealthy</TableCell>
                            <TableCell align="center" >DateOfBirth</TableCell>
                            <TableCell align="center" >Nr of Owners</TableCell>
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
                                <TableCell align="center">{dogs.nr_of_owners}</TableCell>
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
