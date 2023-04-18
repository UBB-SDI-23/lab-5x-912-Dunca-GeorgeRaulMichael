
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
    Input,
    Typography,
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
import { Toys } from "../../models/Toys";
import { Label } from "@mui/icons-material";

  export const ToysShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [toys, setToys] = useState<Toys[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(1000000 / 100);
    const [number, setNumber] = useState(1); // Set initial state to 1
    const [InputValue,setInputValue]=useState(0);
    const [NextPage,setNextPage]=useState(0);
    const [PrevPage,setPrevPage]=useState(0);

    useEffect(() => {
      setLoading(true);
      console.log(currentPage);
      fetch(`${BACKEND_API_URL}/toys/?p=${currentPage}&price=${InputValue}`)
        .then((response) => response.json())
        .then((data) => {
         console.log(data.results[0]);
          setToys(data.results);
          setNextPage(data.next);
          setPrevPage(data.previous);
          setLoading(false);
        });
    }, []);
    
    
    const handleNextPage = () => {
      if (NextPage) {
        
        setCurrentPage(currentPage + 1);
        console.log(NextPage);
        setLoading(true);
        fetch(`${NextPage}`)
        .then((response) => response.json())
        .then((data) => {
          
          setToys(data.results);
          setNextPage(data.next);
          setPrevPage(data.previous);
          setLoading(false);
        });
        
      }
    };
  
    const handlePrevPage = () => {
      if (PrevPage) {
        
        setCurrentPage(currentPage - 1);
        console.log(currentPage);
        setLoading(true);
        fetch(`${PrevPage}`)
        .then((response) => response.json())
        .then((data) => {
          setToys(data.results);
          setNextPage(data.next);
          setPrevPage(data.previous);
          setLoading(false);
        });
         
      }
    };


    const handleSubmit = (event: { preventDefault: () => void }) => {
      event.preventDefault();
      // navigate("/books");
      setLoading(true);
      setCurrentPage(1);
      console.log(currentPage);
      console.log("initval",InputValue);
          fetch(`${BACKEND_API_URL}/toys/?p=1&price=${InputValue}`)
        .then((response) => response.json())
        .then((data) => {
          setToys(data.results);
          setNextPage(data.next);
          setPrevPage(data.previous);
          console.log(data.previous);
          console.log(data.results);
          setLoading(false);
        });
    };

   
    return (
      <Container>
        <h1>All toys</h1>
        <label>Current Page: {currentPage}</label> 
        {loading && <CircularProgress />}
        {!loading && toys.length === 0 && <p>No toys found</p>}
        {!loading && (
          <Toolbar>
          <IconButton onClick={handlePrevPage} style={{ marginRight:'370px'}} component={Link} sx={{ mr: 3 }} to={`/toys/?p=${currentPage}&price=${InputValue}`} disabled={! PrevPage}>
            <Tooltip title="Previous">
             <ArrowBackIosIcon sx={{ color: "white" }} />
            </Tooltip>
          </IconButton>
          <IconButton  style= {{ marginRight: '65px' }} component={Link} sx={{ mr: 3 }} to={`/toys/add`}>
            <Tooltip title="Add a new toys" arrow>
              <AddIcon color="primary" />
            </Tooltip>
          </IconButton>
          
          <Input
          style= {{ marginRight: '15px' }}
        inputProps={{ style: { color: 'white' } }}
        type="number"
        onChange={(event) => setInputValue(Number(event.target.value))}
        value={InputValue}
        placeholder="Enter a number"
      />
      <Button onClick={handleSubmit}>Filter</Button>
        <IconButton style={{ marginLeft:'370px'}} onClick={handleNextPage} component={Link} sx={{ mr: 3 }}  to={`/toys/?p=${currentPage }&price=${InputValue}`} disabled={!NextPage}>
            <Tooltip title="Next">
             <ArrowForwardIosIcon sx={{ color: "white" }} />
            </Tooltip>
          </IconButton>
        </Toolbar>
        )}
        {!loading && toys.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Dog</TableCell>
                  <TableCell align="right">Material</TableCell>
                  <TableCell align="right">Colour</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toys.map((toy, index) => (
                  <TableRow key={toy.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={`/toys/${toy.id}/details`} title="View toy details">
                        {toy.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{toy.dog.toString()}</TableCell>
                    <TableCell align="right">{toy.material}</TableCell>
                    <TableCell align="right">{toy.colour}</TableCell>
                    <TableCell align="right">{toy.price}</TableCell>
                    <TableCell align="right">{toy.descriptions}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        sx={{ mr: 3 }}
                        to={`/toys/${toy.id}/details`}>
                        <Tooltip title="View toy details" arrow>
                          <ReadMoreIcon color="primary" />
                        </Tooltip>
                      </IconButton>
  
                      <IconButton component={Link} sx={{ mr: 3 }} to={`/toys/${toy.id}/edit`}>
                        <EditIcon />
                      </IconButton>
  
                      <IconButton component={Link} sx={{ mr: 3 }} to={`/toys/${toy.id}/delete`}>
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