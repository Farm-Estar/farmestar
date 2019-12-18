/* eslint-disable react/prop-types */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}))

const roundTotal = (total) => {
    return (Math.round(total * 100) / 100).toFixed(2)
}

function CartProducts(props) {
    const classes = useStyles()

    let cart_products

    if (props.auth.cart <= 0) {
        cart_products =
            <div className="no-items-in-cart">
                There are no Items in your cart, please visit the market and then check back.
        </div>
    } else {
        cart_products = props.auth.cart.map((product) =>
            <List key={product._id}>
                <ListItem>
                    <ListItemText primary={product.produce.title} secondary={"$" + roundTotal(product.produce.price)}></ListItemText>
                </ListItem>
                <Divider />
            </List>
        )
    }

    return (
        <div className={classes.root}>
            <List>
                {cart_products}
            </List>
            <Divider />
        </div>
    )
}

export default CartProducts
