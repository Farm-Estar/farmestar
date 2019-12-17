/* eslint-disable react/prop-types */
import React, { Component } from 'react'

class AddProduce extends Component {
    constructor(props){
        super(props)
        this.state = {
            farm_data: {...this.props.location.state},
            title:"",
            description: "",
            price: 0,
            sku: ""
        }
    }
    render() {
        return (
            <div>
                Add produce hit with state
                <div>
                    {this.state.farm_data.farm._id}
                </div>
            </div>
        )
    }
}

export default AddProduce
