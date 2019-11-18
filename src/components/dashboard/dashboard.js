/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'

class dashboard extends Component {
  constructor(props) {
    super(props);
}

    logout = e => {
        e.preventDefault()
        this.props.logout()
        //Assuming logout works 100%
        this.props.history.push("/")
    }

    render() {
        const { user } = this.props.auth;

        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name}
              <p className="flow-text grey-text text-darken-1">
                You are logged into{" "}
                <span style={{ fontFamily: "monospace" }}>app name</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.logout}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
        )
    }
}

dashboard.propTypes = {
    logout: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(dashboard)
