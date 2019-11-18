/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { registerUser } from '../../actions/authActions'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'

// const useStyles = makeStyles(theme => ({
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: 200,
//     },
//   }));


class register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard")
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            //Persist Errors
            if (this.state.errors !== this.props.errors) {
                this.setState(this.props)
            }
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history)
    }

    render() {
        const { errors } = this.state;
        // const classes = useStyles()

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Button
                            component={Link}
                            to="/"
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            variant="contained"
                            color="primary"
                        >
                            <i className="material-icons left">keyboard_backspace</i>Back
                            </Button>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4><b>Register</b> below</h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <TextField
                                    required
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    id="name"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    label="Name"
                                    className={classnames("", { invalid: errors.name })}
                                />
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <TextField
                                    required
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    id="email"
                                    type="email"
                                    margin="normal"
                                    variant="outlined"
                                    label="Email"
                                    className={classnames("", { invalid: errors.email })}
                                />
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <TextField
                                    required
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
                                    label="Password"
                                    className={classnames("", { invalid: errors.password })}
                                />
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <TextField
                                    required
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    id="password2"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
                                    label="Confirm Password"
                                    className={classnames("", { invalid: errors.password2 })}
                                />
                                <span className="red-text">{errors.password2}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <Button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >Sign up</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

register.protoTypes = {
    registerUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(register))
// export default withRouter(connect(mapStateToProps, {registerUser})(register))