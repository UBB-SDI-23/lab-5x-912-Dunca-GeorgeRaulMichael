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

export const DogsFilter= () => {
    const[loading, setLoading] = useState(true)
    const [dogs, setDogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(1000000 / 10);

    useEffect(() => {
    fetch(`${BACKEND_API_URL}/dogs/avg-by-toy-price?p=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setDogs(data.results);
        console.log(data.results);
        setLoading(false);
        
        
        })
    }, []);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
          
          setCurrentPage(currentPage + 1);
          console.log(currentPage);
          setLoading(true);
          fetch(`${BACKEND_API_URL}/dogs/avg-by-toy-price?p=${currentPage+1}`)
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
          console.log(currentPage);
          setLoading(true);
          fetch(`${BACKEND_API_URL}/dogs/avg-by-toy-price?p=${currentPage-1}`)
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
        fetch(`${BACKEND_API_URL}/dogs/avg-by-toy-price?p=${newPage}`)
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
    <Container style={{ height:'100vh'}}>
        <h1 style={{marginTop:"65px", color:"white"}}>All Dogs Ordered By The Avg price of their toys</h1>
        <label style={{color:"white"}}>Current Page: {currentPage}</label> 
        {loading && <CircularProgress />}

        {!loading && dogs.length == 0 && <div style={{color:"white"}}>No dogs found</div>}
        
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
            {/* <IconButton onClick={handlePrevPage} style={{marginLeft:'90px', marginRight:'370px'}} component={Link} sx={{ mr: 3 }} to={`/dogs/avg-by-toy-price?p=${currentPage}`} disabled={currentPage === 1}>
              <Tooltip title="Previous">
               <ArrowBackIosIcon sx={{ color: "white" }} />
              </Tooltip>
            </IconButton>

            <IconButton style={{ marginLeft:'370px',marginRight:'90px'}} onClick={handleNextPage} component={Link} sx={{ mr: 3 }}  to={`/dogs/avg-by-toy-price?p=${currentPage}`} disabled={currentPage === totalPages}>
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
