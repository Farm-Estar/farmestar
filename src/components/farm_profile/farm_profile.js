/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import './farm_profile.css'
import { convertToBoolean } from '../../utils/setAuthToken'
import Button from '@material-ui/core/Button'
import GoogleMapReact from 'google-map-react'
import classnames from 'classnames'
import Modal from 'react-responsive-modal'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

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
        const date = new Date()
        this.state = {
            center: {
                lat: this.props.location.state.farm.location.coordinates[0],
                lng: this.props.location.state.farm.location.coordinates[1]
            },
            zoom: 11,
            isFarmer: props.auth.user.isFarmer,
            myFarm: false,
            showHoursModal: false,
            currentDay: date.getDay(),
            mon:{
                open: this.props.location.state.hours.monOpen,
                close: this.props.location.state.hours.monClose
            },
            tues:{
                open: this.props.location.state.hours.tuesOpen,
                close: this.props.location.state.hours.tuesClose
            },
            wed:{
                open: this.props.location.state.hours.wedOpen,
                close: this.props.location.state.hours.wedClose
            },
            thur:{
                open: this.props.location.state.hours.thursOpen,
                close: this.props.location.state.hours.thursClose
            },
            fri:{
                open: this.props.location.state.hours.friOpen,
                close: this.props.location.state.hours.friClose
            },
            sat:{
                open: this.props.location.state.hours.satOpen,
                close: this.props.location.state.hours.satClose
            },
            sun:{
                open: this.props.location.state.hours.sunOpen,
                close: this.props.location.state.hours.sunClose
            },
            todayOpen:"",
            todayClose: ""
        }
    }

    componentDidMount = () => {
        //Check if Is current users farm
        const farmerId = this.props.auth.user.id
        const farmsFarmer = this.props.location.state.farm.farmer

        if (farmerId === farmsFarmer) {
            this.setState({
                myFarm: true
            })
        }

        this.mapDayToSchedule
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
        const farm_data = { ...this.props.location.state }
        this.props.toProduce(farm_data, this.props.history)
    }

    viewMenu = () => {
        const farm_data = {
            ...this.props.location.state,
            myFarm: this.state.myFarm
        }
        this.props.toListProduce(farm_data, this.props.history)
    }

    viewSchedule = () => {
        this.setState({
            showHoursModal: true
        })
    }

    onCloseModal = () => {
        this.setState({
            showHoursModal: false
        })
    }

    getCurrentDay = (value) => {
        switch (new Date().getDay()) {
            case 0:
              return "Sunday"
            case 1:
              return "Monday"
            case 2:
               return "Tuesday"
            case 3:
              return "Wednesday"
            case 4:
              return "Thursday"
            case 5:
              return "Friday"
            case 6:
              return "Saturday"
            default:
                return "Error"  
          }
    }

    mapDayToSchedule = () => {
        const day = this.getCurrentDay(this.state.currentDay)

        switch (day) {
            case "Sunday":
              this.setState({
                  todayOpen: this.state.sun.open,
                  todayClose: this.state.sun.close
              })
              break
            case "Monday":
                this.setState({
                    todayOpen: this.state.mon.open,
                    todayClose: this.state.mon.close
                })
                break
            case "Tuesday":
                this.setState({
                    todayOpen: this.state.tues.open,
                    todayClose: this.state.tues.close
                })
                break
            case "Wednesday":
                this.setState({
                    todayOpen: this.state.wed.open,
                    todayClose: this.state.wed.close
                })
                break
            case "Thursday":
                this.setState({
                    todayOpen: this.state.thur.open,
                    todayClose: this.state.thur.close
                })
                break
            case "Friday":
                this.setState({
                    todayOpen: this.state.fri.open,
                    todayClose: this.state.fri.close
                })
                break
            case "Saturday":
                this.setState({
                    todayOpen: this.state.sat.open,
                    todayClose: this.state.sat.close
                })
                break
            default:
                this.setState({
                    todayOpen: "00:00",
                    todayClose: "00:00"
                })
                break 
          }

    }

    // setScheduleLabel = () => {
    //     this.mapDayToSchedule

    //     return <div>{this.getCurrentDay(this.state.currentDay)} {this.state.todayOpen} - {this.state.todayClose}</div>
    // }

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
            onClick={this.viewSchedule}
        >View Hours <AccessTimeIcon /></Button>
        }

        let scheduleLable = <div>{this.getCurrentDay(this.state.currentDay)} {this.state.todayOpen} AM - {this.state.todayClose} PM</div>

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
                    <div className="farm-hours-container">
                        {scheduleLable}
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
                            lat={this.state.center.lat}
                            lng={this.state.center.lng}
                            text="Farm Marker"
                        />
                    </GoogleMapReact>
                </div>
                <Modal open={this.state.showHoursModal} onClose={this.onCloseModal} center>
                    <div className="hours-modal-title">Hours</div>
                    <table>
                            <tr><th>Sunday</th><td>Closed</td></tr>
                            <tr><th>Monday</th><td>9am - 5pm</td></tr>
                            <tr><th>Tuesday</th><td>9am - 5pm</td></tr>
                            <tr><th>Wednesday</th><td>9am - 5pm</td></tr>
                            <tr><th>Thursday</th><td>9am - 5pm</td></tr>
                        </table>
                </Modal>
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
