import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import BarChartIcon from '@mui/icons-material/BarChart';

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<div style={{marginTop:'0px'}}>
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginTop: "0px", marginBottom: "50px" }}>
				<Toolbar>
					

					<Button
						variant={path.startsWith("/") ? "outlined" : "text"}
						to="/"
						component={Link}
						color="inherit"
						size="large"
						sx={{ mr: 5 }}
						startIcon={<HomeIcon />}>
						Home
					</Button>
					<Button
						variant={path.startsWith("/dogs") ? "outlined" : "text"}
						to="/dogs"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<PetsIcon />}>
						Dogs
					</Button>
                    <Button
						variant={path.startsWith("/dogs/avg-by-toy-price") ? "outlined" : "text"}
						to="/dogs/avg-by-toy-price"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<BarChartIcon />}>
						Statistic
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
		</div>
	);
};