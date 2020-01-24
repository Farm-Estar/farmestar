import React, { Component } from 'react'
import './farm_hours.css'
import TimePicker from 'react-time-picker'
import Button from '@material-ui/core/Button'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

//Actions
import {setHours} from '../../actions/farmActions'

//Components
import FarmHoursHeader from './farm_hours_header'

//Theme
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
            root: {
                backgroundColor: 'rgba(255, 255, 255, 1)'
            }
        }
    }
})



class FarmHours extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mon:{
                open:"",
                close: ""
            },
            tues:{
                open:"",
                close:""
            },
            wed:{
                open:"",
                close:""
            },
            thur:{
                open:"",
                close:""
            },
            fri:{
                open:"",
                close:""
            },
            sat:{
                open:"",
                close:""
            },
            sun:{
                open:"",
                close:""
            },
            hoursSet: false
        }
    }

    setMonOpen = time => {
        this.setState({ mon:{
            open: time
        }})
    }

    setMonClose = time => {
        this.setState({ mon:{
            close: time
        }})
    }

    setTuesOpen = time => {
        this.setState({ tues:{
            open: time
        }})
    }

    setTuesClose = time => {
        this.setState({ tues:{
            close: time
        }})
    }

    setWedOpen = time => {
        this.setState({ wed:{
            close: time
        }})
    }

    setWedClose = time => {
        this.setState({ wed:{
            close: time
        }})
    }

    setThurOpen = time => {
        this.setState({ thurOpen: time })
    }

    setThurClose = time => {
        this.setState({ thurClose: time })
    }

    setFriOpen = time => {
        this.setState({ friOpen: time })
    }

    setFriClose = time => {
        this.setState({ friClose: time })
    }

    setSatOpen = time => {
        this.setState({ satOpen: time })
    }

    setSatClose = time => {
        this.setState({ satClose: time })
    }

    setSunOpen = time => {
        this.setState({ sunOpen: time })
    }

    setSunClose = time => {
        this.setState({ 
            sunClose: time,
            hoursSet: true
         })
    }

    onContinue = () => {
        const payload = {
            // eslint-disable-next-line react/prop-types
            farmId: this.props.location.state.farmId,
            ...this.state
        }

        // eslint-disable-next-line react/prop-types
        this.props.setHours(payload, this.props.history)
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <FarmHoursHeader />
                <div className="day_header">Monday</div>
                <div className="time_container">
                    <TimePicker
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setMonOpen}
                        value={this.state.monOpen}
                    />
                    <TimePicker
                        label="Close"
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setMonClose}
                        value={this.state.monClose}
                    />
                </div>
                <div className="day_header">Tuesday</div>
                <div className="time_container">
                    <TimePicker
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setTuesOpen}
                        value={this.state.tuesOpen}
                    />
                    <TimePicker
                        label="Close"
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setTuesClose}
                        value={this.state.TuesClose}
                    />
                </div>
                <div className="day_header">Wednesday</div>
                <div className="time_container">
                    <TimePicker
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setWedOpen}
                        value={this.state.wedOpen}
                    />
                    <TimePicker
                        label="Close"
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setWedClose}
                        value={this.state.wedClose}
                    />
                </div>
                <div className="day_header">Thursday</div>
                <div className="time_container">
                    <TimePicker
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setThurOpen}
                        value={this.state.thurOpen}
                    />
                    <TimePicker
                        label="Close"
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setThurClose}
                        value={this.state.thurClose}
                    />
                </div>
                <div className="day_header">Friday</div>
                <div className="time_container">
                    <TimePicker
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setFriOpen}
                        value={this.state.friOpen}
                    />
                    <TimePicker
                        label="Close"
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setFriClose}
                        value={this.state.friClose}
                    />
                </div>
                <div className="day_header">Saturday</div>
                <div className="time_container">
                    <TimePicker
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setSatOpen}
                        value={this.state.satOpen}
                    />
                    <TimePicker
                        label="Close"
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setSatClose}
                        value={this.state.satClose}
                    />
                </div>
                <div className="day_header">Sunday</div>
                <div className="time_container">
                    <TimePicker
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setSunOpen}
                        value={this.state.sunOpen}
                    />
                    <TimePicker
                        label="Close"
                        className="picker"
                        format="HH:mm a"
                        onChange={this.setSunClose}
                        value={this.state.sunClose}
                    />
                </div>
                <div className="hours_button">
                    <Button
                    onClick={this.onContinue}
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
                    disabled={this.state.hoursSet === false}
                >CONTINUE</Button>
                </div>
            </ThemeProvider>
        )
    }
}

FarmHours.propTypes = {
    setHours: propTypes.func.isRequired
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {setHours})(FarmHours)
