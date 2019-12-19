/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Async from "react-async"
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { CardElement, injectStripe } from 'react-stripe-elements';

//Import Actions
import { chargeCard } from '../../actions/authActions'



class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    calculateTotal = () => {
        let total = 0
        this.props.auth.cart.map((product) => {
            total = total + product.price
        })

        return total
    }


    handleSubmit = (ev) => {

        ev.preventDefault()
        if (this.props.stripe) {
            this.props.stripe
                .createToken()
                .then((payload) => {
                    console.log(JSON.stringify(payload))
                    const postData = {
                        tokenId: payload.token.id,
                        total: this.calculateTotal
                    }
                    this.props.chargeCard(postData, this.props.history)
                })
        }
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Card details
              <CardElement />
                </label>
                <button>Pay</button>
            </form>
        );
    }
}

Checkout.propTypes = {
    auth: propTypes.object.isRequired,
    chargeCard: propTypes.func.isRequired
}

const mapStatetoProps = state => ({
    auth: state.auth
})

export default connect(mapStatetoProps, { chargeCard })(injectStripe(Checkout))
