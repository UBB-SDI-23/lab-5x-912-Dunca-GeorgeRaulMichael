import { CssBaseline, Container, Typography } from "@mui/material";
import React from "react";

export const Home = () => {
	return (
		<div style={{ color:'white', marginTop:'20%' , height:'500px'}}>
		<React.Fragment>
			<CssBaseline />

			<Container maxWidth="xl">
				<Typography  variant="h1" component="h1" gutterBottom>
					Welcome to the Dog App!!!
				</Typography>
			</Container>
		</React.Fragment>
		</div>
	);
};