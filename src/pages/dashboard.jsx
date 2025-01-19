import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";

import UserDetails from "./user/createUser";
import Topbar from "./topbar";
import UserCountCard from "../common/usersCuntcard";
import TableBase from "./Table/UserTable";
import SideBar from "../common/SideBar";
import NotFound from "../common/notfound";

const useStyles = makeStyles((mainTheme) => ({
	root: {
		flexGrow: 1,
		padding: mainTheme.spacing(0),
		margin: mainTheme.spacing(0),
		maxWidth: "100%",
		backgroundColor: "#F0F3F8",
	},
	sidebarContainer: {
		backgroundColor:
			mainTheme &&
			mainTheme.palette &&
			mainTheme.palette.primary &&
			mainTheme.palette.primary.main,
		borderRadius: "15px 40px 40px 15px",
		position: "sticky",
		top: 0,
		maxHeight: "99.9vh",
		overflow: "hidden",
	},

	mainGridContainer: {
		maxWidth: "100%",
	},

	//////////////////////
	//  center content  //
	/////////////////////

	componentsContaineU: {
		backgroundColor: "#F0F3F8",
	},
	componentContent: {
		position: "relative",
		backgroundColor: "#F0F3F8",
		borderRadius: "40px 40px 40px 40px",
		right: "20px",
		overflow: "hidden",
	},

	////////////////////////////
	//   Right Penal Styling  //
	///////////////////////////

	rightPenal: {
		padding: mainTheme.spacing(0),
	},
}));

const Dashboard = () => {
	const classes = useStyles();
	const [createUser, setCreateUser] = useState(false);
	return (
		<>
			<div className={classes.root}>
				<Grid item container spacing={2} className={classes.mainGridContainer}>
					<Grid
						item
						xs={5}
						sm={3}
						md={3}
						lg={1}
						xl={1}
						className={classes.sidebarContainer}
					>
						<SideBar />
					</Grid>
					{createUser ? (
						<Grid
							item
							xs={11}
							sm={11}
							md={11}
							lg={11}
							xl={11}
							className={classes.componentsContaineU}
						>
							<div className={classes.componentContent}>
								<Grid container spacing={2}>
									<Grid item sm={12}>
										<Topbar />
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={7} md={7} lg={10} xl={10}>
										<UserDetails />
									</Grid>
									<Grid item xs={0} sm={5} md={5} lg={2} xl={2}>
										<UserCountCard />
									</Grid>
								</Grid>
							</div>
						</Grid>
					) : (
						<>
							<Grid
								item
								xs={11}
								sm={11}
								md={11}
								lg={11}
								xl={11}
								className={classes.componentsContainer}
							>
								<div className={classes.componentContent}>
									<NotFound />
									<TableBase />
								</div>
							</Grid>
							{/* <Grid item xs={0} sm={6} md={4} lg={3} xl={3} className={classes.rightPenal}>
                            <RightPenal />
                        </Grid> */}
						</>
					)}
				</Grid>
			</div>
		</>
	);
};

export default Dashboard;
