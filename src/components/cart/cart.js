import React, { Component } from 'react'
import './cart.css'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

//Import Components
import CartHeader from './cart_header'
import CartMap from './cart_map'
import CartProducts from './cart_products'

const theme = createMuiTheme({
    palette: {
        common: {
            black: 'rgba(38, 153, 251, 1)',
            white: '#fff',
            grey: 'rgb(128,128,128)'
        },
        background: {
            paper: 'rgba(38, 153, 251, 0)',
            default: 'rgba(38, 153, 251, 0)'
        },
        primary: {
            light: 'rgba(38, 153, 251, 1)',
            main: 'rgba(38, 153, 251, 1)',
            dark: 'rgba(38, 153, 251, 1)',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff4081',
            main: '#f50057',
            dark: '#c51162',
            contrastText: '#fff'
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff'
        },
        text: {
            primary: 'rgba(38, 153, 251, 1)',
            secondary: 'rgba(38, 153, 251, 1)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)'
        }
    },
    overrides: {
        MuiInput: {
            underline: {
                borderBottom: 'rgba(38, 153, 251, 1)',
                '&:before': {
                    borderBottomColor: 'rgba(38, 153, 251, 1)',
                }
            }
        },
        MuiButtonLabel: {
            color: 'grey'
        }
    }
})

class Cart extends Component {
    render() {
        return (
            <div>
                <CartHeader />
                <div className="cart-map-container">
                    <CartMap />
                </div>
                <div className="cart-list-container">
                    <CartProducts />
                </div>
                <ThemeProvider theme={theme}>
                    <div>
                        <Button
                            component={Link}
                            to="/checkout"
                            style={{
                                width: "90%",
                                height: "48pt",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                        >Pay Now</Button>
                    </div>
                </ThemeProvider>
            </div>
        )
    }
}

const mapStatetoProps = state => ({
    auth: state.auth
})

export default connect(mapStatetoProps, {})(Cart)
