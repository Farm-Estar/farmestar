import React, { Component } from 'react'
import './featured_farms.css'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

//Actions
import {farmProfile} from '../../actions/authActions'

//Import Components
import FeaturedFarmsHeader from './featured_farms_header'
import Farms from './farms_new'

class FeaturedFarms extends Component {
    constructor(props){
        super(props)
        this.state = {
            auth: {
              isAuthenticated: true,
              user: {
                id: '5df71306aa9e3c0778d1fbef',
                name: 'keeano',
                email: 'keeano92@gmail.com',
                iat: 1576563019,
                exp: 1608119945
              },
              farms: [
                {
                  _id: '5de8b5b3eb35423c28f2a72d',
                  farmName: 'Test One Farm',
                  address: '123 tester rd',
                  city: 'winter haven',
                  state: 'Florida',
                  farmerType: 'Full Time',
                  date: '2019-12-05T07:45:55.397Z',
                  __v: 0
                },
                {
                  _id: '5df1909417367a23ccd750d0',
                  farmName: 'Test Two Farm',
                  address: '123 test rd',
                  city: 'winter haven',
                  state: 'Florida',
                  farmerType: 'Part Time',
                  date: '2019-12-12T00:57:56.472Z',
                  __v: 0
                },
                {
                  _id: '5df190b817367a23ccd750d1',
                  farmName: 'Test Three Farm',
                  address: '123 third st',
                  city: 'winter haven',
                  state: 'Florida',
                  farmerType: 'Full Time',
                  date: '2019-12-12T00:58:32.408Z',
                  __v: 0
                },
                {
                  _id: '5df190e317367a23ccd750d2',
                  farmName: 'Test Fourth Farm',
                  address: '1234 testing rd',
                  city: 'ionia',
                  state: 'Michigan',
                  farmerType: 'Part Time',
                  date: '2019-12-12T00:59:15.914Z',
                  __v: 0
                },
                {
                  _id: '5df71325aa9e3c0778d1fbf0',
                  farmer: '5df71306aa9e3c0778d1fbef',
                  farmName: 'Keeanos First Linked Farm',
                  address: 'Linked Farm Rd',
                  city: 'linked',
                  state: 'Alabama',
                  farmerType: 'Full Time',
                  date: '2019-12-16T05:16:21.469Z',
                  __v: 0
                }
              ],
              reviews: [],
              cart: [],
              loading: false
            },
            errors: {}
          }

          this.selectedFarm = this.selectedFarm.bind(this)
    }
    
    selectedFarm = (farm) => {
        console.log(farm._id)
    }

    render() {
        return (
            <div>
                <div>
                    <FeaturedFarmsHeader />
                </div>
                <Farms {...this.props} selectedFarm={this.props.farmProfile} />
            </div>
        )
    }
}

FeaturedFarms.propTypes = {
  farmProfile: propTypes.func.isRequired
    // auth: propTypes.object.isRequired
    // errors: propTypes.object.isRequired
    // featureFarmsFetch: propTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
    // farms: state.farms
})

export default connect(mapStateToProps, {farmProfile})(FeaturedFarms)

