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

function CartProducts() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <List>
                <ListItem>
                    <ListItemText primary="Product" secondary="$44.00"></ListItemText>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Total" secondary="$44.00"></ListItemText>
                </ListItem>
            </List>
            <Divider />
        </div>
    )
}

export default CartProducts
