import React, { Component } from 'react'
import './GearDetails.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from './../../ducks/reducer'
import axios from 'axios'

export class GearDetails extends Component {
    constructor() {
        super()

        this.state = {
            itemDetails: [{}]
        }

    }

    componentDidMount() {
        this.props.getUserInfo();
        axios.get(`/get/details/${this.props.match.params.id}`)
            .then((response) => {
                this.setState({
                    itemDetails: response.data
                })
            })
    }

    sendRequest() {
        axios.post(`/send/request/`, {
            item_id: this.state.itemDetails[0].itemid,
            owner_id: this.state.itemDetails[0].owner_id,
            borrower_id: this.props.user.userid,
            approved: false,
            pending: true
        })
    }

    render() {

        console.log(this.props.user.userid)
        console.log(this.state.itemDetails)

        return (
            <div className='product-details-wrapper'>
                <div className='details-wrapper'>
                    <div>

                        <div className='product-title'>
                            <h2>{this.state.itemDetails[0].item_name}</h2>
                        </div>
                        <div>
                            <img alt='' src={this.state.itemDetails[0].image_url} />
                        </div>
                        <div>
                            <p> About the product </p>
                            <div>
                                {this.state.itemDetails[0].item_description}
                            </div>
                        </div>
                        <p> Location: {this.state.itemDetails[0].city}, {this.state.itemDetails[0].zipcode} </p>
                    </div>
                    <Link to='./../Search'>
                        <button onClick={() => this.sendRequest()}> SEND REQUEST </button>
                    </Link>
                    <Link to={`/search?${this.props.category}&${this.props.city}&${this.props.zipcode}`}>
                        <button> Back </button>
                    </Link>
                </div>


            </div >
        )
    }
}
function mapStateToProps(state) {
    return state
}
export default connect(mapStateToProps, { getUserInfo })(GearDetails)
