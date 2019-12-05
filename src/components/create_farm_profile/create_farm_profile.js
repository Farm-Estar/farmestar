import React from 'react'
import './create_farm_profile.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { addProfile } from '../../actions/farmActions'

//Import Components
import CreateFarmProfileHeader from './create_farm_profile_header'

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
        },
        MuiPaper: {
            root:{
                backgroundColor: 'rgba(255, 255, 255, 1)'
            }
        }
    }
})

class CreateFarmProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayName: "",
            description: "",
            image: "",
            errors: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            //Persist Errors
            if (this.state.errors !== this.props.errors) {
                this.setState(this.props)
            }
            //Perist Form Info
            //Run console test to see prevProps vs Props on page refrsh against errors
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
        console.log(this.state)
    }

    onSubmit = e => {
        e.preventDefault()

        const profile = {
            displayName: this.state.displayName,
            description: this.state.description,
            image: this.state.image
        }

        // eslint-disable-next-line react/prop-types
        this.props.addProfile(profile, this.props.history)
    }


    render() {
        const { errors } = this.state
        return (
            <ThemeProvider theme={theme}>
                <CreateFarmProfileHeader />
                <div className="container">
                    <form noValidate onSubmit={this.onSubmit}>
                        <div>
                            <TextField
                                required
                                onChange={this.onChange}
                                value={this.state.displayName}
                                id="displayName"
                                type="text"
                                margin="normal"
                                label="Display Name"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    )
                                }}
                                className={classnames("signup_textfield", { invalid: errors.displayName })}
                            />
                            <span style={{ color: theme.palette.error.main }}>{errors.displayName}</span>
                        </div>
                        <div>
                            <TextField
                                required
                                onChange={this.onChange}
                                value={this.state.description}
                                id="description"
                                type="text"
                                margin="normal"
                                label="Brief Description"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon />
                                        </InputAdornment>
                                    )
                                }}
                                className={classnames("signup_textfield", { invalid: errors.description })}
                            />
                            <span style={{ color: theme.palette.error.main }}>{errors.description}</span>
                        </div>
                        <div>
                            <TextField
                                required
                                onChange={this.onChange}
                                value={this.state.image}
                                id="image"
                                type="text"
                                margin="normal"
                                label="Upload a Picture"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AddAPhotoIcon />
                                        </InputAdornment>
                                    )
                                }}
                                className={classnames("signup_textfield", { invalid: errors.image })}
                            />
                            <span style={{ color: theme.palette.error.main }}>{errors.image}</span>
                        </div>
                        <div className="signup_button" style={{ paddingLeft: "11.250px" }}>
                            <Button
                                style={{
                                    width: "90%",
                                    height: "48pt",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >CONTINUE</Button>
                        </div>
                    </form>
                </div>
            </ThemeProvider>
        )
    }
}

CreateFarmProfile.propTypes = {
    addProfile: propTypes.func.isRequired,
    errors: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addProfile })(withRouter(CreateFarmProfile))
