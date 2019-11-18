import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

export default class landing extends Component {
    render() {
        return (
            <div className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>This will be our application homepages</h4>
                        <p className="flow-text grey-text text-darken-1">
                            If you are a returning user please login below, if you are a new user please register.
                        </p>
                        <br />
                        <Button varient="contained" color="primary">
                            <Link to="/register">Register</Link>
                        </Button>
                        <Button varient="contained" color="primary">
                            <Link to="/login">Log In</Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export { landing }
