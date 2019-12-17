/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import propTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

const styles = theme => ({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridGap: `22px`,
        marginBottom: "20px"
    },
    paper: {
        textAlign: "left",
        backgroundColor: theme.palette.text.primary,
        whiteSpace: "nowrap",
        marginBottom: theme.spacing.unit,
        color: grey,
        height: "90px"
    },
    divider: {
        margin: `22px 0`
    }
})

function FeatureFarmsHome(props) {
    const { classes } = props
    let featuredFarmsDom


    //Use State
    const [count, setCount] = useState(Object.keys(props.user.auth.farms).length);
    const [farms, setFarms] = useState(props.user.auth.farms)

    if (count >= 3) {
        featuredFarmsDom =
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper} onClick={props.user.featuredFarm}>
                            <div className="farm-label">{farms[0].farmName}</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <div className="farm-label">{farms[1].farmName}</div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <div className="farm-label">{farms[2].farmName}</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <div className="farm-label">{farms[3].farmName}</div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
    } else {
        featuredFarmsDom = 
        <div className="container no-reviews">
            <p>No Featured Farms at this time</p>
        </div>
    }

    return (
        <div>
            <div className="section-title">
                <h1>Featured Farms</h1>
            </div>
            {featuredFarmsDom}
        </div>
    )
}

FeatureFarmsHome.propTypes = {
    classes: propTypes.object.isRequired
}

export default withStyles(styles)(FeatureFarmsHome)
