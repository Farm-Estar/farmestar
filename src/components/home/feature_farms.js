import React from 'react'
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

function FeatureFarms(props) {
    const { classes } = props

    return (
        <div>
            <div className="section-title">
                <h1>Featured Farms</h1>
            </div>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <div className="farm-label">Farm One</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <div className="farm-label">Farm Two</div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <div className="farm-label">Farm Three</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <div className="farm-label">Farm Four</div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

FeatureFarms.propTypes = {
    classes: propTypes.object.isRequired
}

export default withStyles(styles)(FeatureFarms)
