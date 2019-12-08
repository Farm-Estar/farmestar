/* eslint-disable react/prop-types */
import React from 'react'

function SettingsHeader(props) {
    console.log(props)
    return (
        <div className="settings-header-container">
             <div className="settings-header-name">{props.user.name}</div>
            <div className="settings-header-email">{props.user.email}</div>
        </div>
    )
}

export default SettingsHeader
