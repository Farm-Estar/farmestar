/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import './farm_profile.css'
import {convertToBoolean} from '../../utils/setAuthToken'
import Button from '@material-ui/core/Button'
import GoogleMapReact from 'google-map-react'
import classnames from 'classnames'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

//Import Actions
import { toProduce, toListProduce } from '../../actions/authActions'

//Map Configure
const Marker = ({ text }) => <div>{text}</div>

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



//Import components
import FarmProfileHeader from './farm_profile_header'

class FarmProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 11,
            isFarmer: props.auth.user.isFarmer,
            myFarm: false
        }
    }

    componentDidMount = () => {
        //Check if Is current users farm
        const farmerId = this.props.auth.user.id
        const farmsFarmer = this.props.location.state.farm.farmer

        if(farmerId === farmsFarmer){
            this.setState({
                myFarm: true
            })
        }
    }

    updateFarmerState = () => {
        if (this.props.auth) {
            let farmerStatus = this.props.auth.user.isFarmer
            this.setState({
                isFarmer: farmerStatus
            })
        }
    }

    addProduct = () => {
        const farm_data = {...this.props.location.state}
        this.props.toProduce(farm_data, this.props.history)
    }

    viewMenu = () => {
        const farm_data = { ...this.props.location.state }
        this.props.toListProduce(farm_data, this.props.history)
    }

    render() {
        let produceButton

        //Filter Product Button to only Current Farmer


        if (convertToBoolean(this.state.isFarmer) && this.state.myFarm) {
            produceButton = <Button
                style={{
                    width: "30%",
                    height: "48pt",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginLeft: "13px"
                }}
                type="submit"
                variant="contained"
                color="primary"
                onClick={this.addProduct}
            ><LibraryAddIcon /></Button>
        } else {
            produceButton = null
        }

        return (
            <ThemeProvider theme={theme}>
                {/* Layout of the farm profile */}
                <FarmProfileHeader profilePic={this.props.location.state.imageUrl} />
                {/* FarmProfile Body incl. Name, Menu  button and Description & map */}
                <div className="farm-profile-body">
                    <div className="farm-profile-name">
                        {this.props.location.state.displayName}
                    </div>
                    <div className="farm-profile-description">
                        {this.props.location.state.description}
                    </div>
                    <div className="farm-profile-menu-button">
                        <Button
                            style={{
                                width: "30%",
                                height: "48pt",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.viewMenu}
                        >Menu</Button>
                        {produceButton}
                    </div>
                </div>
                <div className="farm-profile-map">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyDkgBDOK8UL6a5nDIJMv8rX51n2OncYNe0" }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                    >
                        <Marker
                            lat={59.955413}
                            lng={30.337844}
                            text="Farm Marker"
                        />
                    </GoogleMapReact>
                </div>
            </ThemeProvider>
        )
    }
}

FarmProfile.propTypes = {
    toProduce: propTypes.func.isRequired,
    toListProduce: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, { toProduce, toListProduce })(FarmProfile)
