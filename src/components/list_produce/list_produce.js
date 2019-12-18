/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@material-ui/core/colors';

//Import Actions
import {produceProfile, listProduce} from "../../actions/authActions"


//Import Component
import ListProduceHeader from './list_produce_header'

const styles = theme => ({
    paper: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BCE0FD',
        textAlign: "left",
        width: "365px"
    }
})

class ListProducts extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    handleClick = (product) => {
        console.log("Hit handle click with :" + product)
        const product_data = {...product}

        this.props.produceProfile(product_data)
    }

    render() {
        const { classes } = this.props
    //     const listProducts = this.props.auth.produce.map((product) =>
    //             <Grid item xs={10} key={product._id} data={product._id} onClick={() => this.handleClick(product)}>
    //                 <Paper className={classes.paper}>
    //                     <div className="farm-header">
    //                         {product.title}
    //                     </div>
    //                     <div className="farm-subheader">
    //                         ${product.price}
    //                     </div>
    //                     {/* <div className="to-detail-button">
    //     <ArrowForwardIcon />
    // </div> */}
    //                 </Paper>
    //             </Grid>
    //     )

        return (
            <div>
                <ListProduceHeader />
            <div className="search-bar">
                <TextField
                    variant="outlined"
                    fullWidth={true}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="farm-results-container">
                <div className="">
                    <Grid container spacing={2}>
                        {/* {listProducts} */}
                        List will go here
                    </Grid>
                </div>
            </div>
        </div>
        )
    }
}

ListProducts.propTypes = {
    produceProfile: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: propTypes.object.isRequired
})

export default connect(mapStateToProps, {produceProfile})(ListProducts)
