import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from './../../ducks/reducer'
import './OutboundRequests.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from './../../Header';


export class OutboundRequests extends Component {
    constructor() {
        super()

        this.state = {
            requests: []
        }
        this.deleteRequest = this.deleteRequest.bind(this)
    }



    getRequests() {
        axios.get('/outbound/requests/' + this.props.user.userid)
            .then((response) => {
                this.setState({
                    requests: response.data
                })
            })
    }

    componentDidMount() {
        this.props.getUserInfo();
        this.getRequests();

    }

    deleteRequest(e) {
        axios.delete(`/remove/request`, {
            data: {
                id: this.props.user.userid,
                itemid: e
            }
        }).then((response) => {
            this.getRequests()
        })

    }

    render() {

        var sentRequests = this.state.requests.map((e, i, arr) => {

            if (e.pending === true) {
                return <div className='list-items' key={i} >
                <div><h1> Pending </h1> </div>
                    <div className='outitemname'>{e.item_name}</div>
                    <div><button onClick={() => this.deleteRequest(e.item_id)}
                    > CANCEL REQUEST </button></div>
                </div>

            } else if (e.approved === true && e.pending === false) {
                return <div className='list-items' key={i}>
                <div><h1> Approved </h1></div>
                    <div className='outitemname'>{e.item_name}</div> 
                    <div><button onClick={() => this.deleteRequest(e.item_id)}
                    > RETURNED </button></div> </div>

            } else if (e.approved === false && e.pending === false) {
                return <div className='list-items' key={i}>
                <div><h1> Denied </h1></div>
                    <div className='outitemname'> {e.item_name}</div>
                    <div>
                    <button onClick={() => this.deleteRequest(e.item_id)}
                    > REMOVE </button>
                    </div>
                    </div>
            }
        })
        console.log(sentRequests)
        console.log(this.state.requests)
        console.log(this.props.user.userid)
        return (
            <div>
                <Header title='SENT REQUESTS' />
                {this.props.user.auth_id ?
                <div className='main-container'>
                    <div className='oprofile'>
                    <Link to='/profile'>
                        <img alt='' src={this.props.user.picture} />
                    </Link>
                   </div>
                        <div className='list-subcontainer'>
                            {sentRequests}
                        </div>
  </div>
                            : <h1> PLEASE SIGN IN TO VIEW YOUR REQUESTS </h1>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(OutboundRequests)
