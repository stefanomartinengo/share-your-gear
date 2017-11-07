import React, { Component } from 'react'
import './InboundRequests.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from './../../ducks/reducer';
import axios from 'axios'
import Header from './../../Header'

export class InboundRequests extends Component {
    constructor() {
        super()

        this.state = {
            requests: []
        }

    }

    getRequests() {
        axios.get(`/ownerrequests/${this.props.user.userid}`)
        .then((response) => {
            this.setState({
                requests: response.data
            })
            console.log(response.data)
        })
    }

    componentDidMount() {
        this.props.getUserInfo();
        this.getRequests();
    }

    approve(id) {
        axios.put(`/approve`, {
            id: id
        }).then( () => {
        this.getRequests();
    }
)}

    deny(id) {
        axios.put('/deny', {
            id: id
        }).then( () => {
        this.getRequests();
    }
)}

    render() {

        var requestsMap = this.state.requests.map((e, i, arr) => {
            return <div key={i}>
               <img alt='' src={e.image_url} /> {e.item_name} <button onClick={ () => this.approve(e.item_id) }> Yes </button><button onClick={() => this.deny(e.item_id)}> No </button>
            </div>
        })
        console.log(this.props.user.userid)
        console.log(this.state.requests)
        return (
            <div className='container'>
                <Header title='INCOMING REQUESTS'/>
                <div className='profile-pic'>
                    <Link to='/profile'>
                        <img alt='' src={this.props.user.picture} />
                    </Link>
                </div>
                <div className='requests'>
                    {requestsMap}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(InboundRequests)
