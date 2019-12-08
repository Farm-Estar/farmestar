/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const Marker = ({ text }) => <div>{text}</div>

class CartMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 11
        }
    }

    render() {
        return (
            <div style={{height: '178px', width: '100%' }}>
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
                <div className="farm-address">
                    <img />
                    <div>
                        123 Farm Address
                    </div>
                    <div>
                        CA, 95673
                    </div>
                </div>
            </div>
        )
    }
}

export default CartMap

