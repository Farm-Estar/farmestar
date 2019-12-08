/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import './settings.css'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

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
    render() {
        return (
            <div>
                <DashboardHeader />
                <SettingsHeader user={this.props.auth.user} />
                <SettingsList />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Settings)
