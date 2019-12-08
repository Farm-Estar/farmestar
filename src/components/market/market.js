import React, { Component } from 'react'
import './market.css'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

//Import Components
import MarketHeader from './market_header'
import Farms from './farms'

class Market extends Component {
    render() {
        return (
            <div>
                <MarketHeader />
                <Farms />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Market)
