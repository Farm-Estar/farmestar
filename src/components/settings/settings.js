/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import './settings.css'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

//Import Actions
import { logout } from '../../actions/authActions'

//Import Components
import DashboardHeader from '../dashboard/dashboard_header'
import SettingsHeader from './settings_header'
import SettingsList from './settings_list'

class Settings extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

     logout = e => {
        e.preventDefault()
        this.props.logout(this.props.history)
    }

    previousOrders = e => {
        e.preventDefault()
        this.props.history("/previousOrders")
    }

    paymentSettings = e => {
        e.preventDefault()
        this.props.history("/paymentSettings")
    }

    account = e => {
        e.preventDefault()
        this.props.history("/account")
    }

    support = e => {
        e.preventDefault()
        this.props.history("/support")
    }

    render() {
        return (
            <div>
                <DashboardHeader />
                <SettingsHeader auth={this.props.auth}/>
                <SettingsList actions={{logout:this.logout, orders: this.previousOrders, paymentSettings: this.paymentSettings, account: this.account, support: this.support}} />
            </div>
        )
    }
}

Settings.propTypes = {
    logout: propTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Settings)
