import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserInfo } from './../../ducks/reducer'
import Header from './../../Header'
import './Inbox.css'
import InboxChild from './InboxChild'

export class Inbox extends Component {
    constructor() {
        super()

        this.state = {
            results: [],
            toggle: false
        }
        this.deleteMessage = this.deleteMessage.bind(this)
        this.getMessages = this.getMessages.bind(this)
        this.reply = this.reply.bind(this)
        this.toggleMessage = this.toggleMessage.bind(this)
    }

    toggleMessage(id) {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    markViewed(id) {
        axios.put('/mark/read', {
            id: id
        }).then((res) => {
            this.getMessages()
        })
    }

    reply(id) {
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        var dateStamp = new Date();
        var month = dateStamp.getMonth()
        var day = dateStamp.getDay()
        var year = dateStamp.getFullYear()
        var hour = dateStamp.getHours()
        var minutes = addZero(dateStamp.getMinutes())
        var timeStamp = `${month}/${day}/${year}  ||  ${hour}:${minutes}`

        var obj = this.state.results.filter((e, i, arr) => {
            return e.id === id
        })
        console.log(obj)
        axios.post('/send/message/', {
            senderid: this.props.user.userid,
            receiverid: obj[0].senderid,
            message: this.refs[`message${id}`].value,
            item: obj[0].item,
            date: timeStamp
        })
        alert('message sent')
        this.refs[`message${id}`].value = ''
    }

    deleteMessage(id) {
        axios.delete('/delete/message', {
            data: {
                id: id
            }
        }).then((res) => {
            this.getMessages()
        })
    }

    getMessages() {
        axios.get(`/get/inbox/${this.props.user.userid}`)
            .then((response) => {
                this.setState({
                    results: response.data
                })
                console.log(response.data)
            })
    }

    componentDidMount() {
        this.props.getUserInfo()
        this.getMessages()
    }
    render() {
        var mapInbox = this.state.results.map((e, i, arr) => {
            if (e.viewed === false)
                return <InboxChild key={i}
                    id={e.id}
                    item={e.item}
                    date={e.date}
                    message={e.message}
                    deleteMessage={this.deleteMessage}
                    markViewed={this.markViewed}
                    reply={this.reply} />

        })
        var viewed = this.state.results.map((e, i, arr) => {
            if (e.viewed === true) {
                return <InboxChild key={i}
                    item={e.item}
                    date={e.date}
                    message={e.message}
                    reply={e.reply}
                    delete={this.deleteMessage}
                    id={e.id} />
            }
        })
        console.log(mapInbox)
        console.log(this.state.results)
        console.log(this.props.user)
        return (
            <div>
                <Header title='Inbox' />
                {this.props.user.auth_id ?
                    <div className='inbox-container'>
                        <div className='unread-container'>
                            <p> UNREAD MESSAGES</p>
                            {mapInbox}
                        </div>
                        <div className='read-container'>
                            <p> READ MESSAGES </p>
                            {viewed}
                        </div>
                    </div> : <h1> PLEASE SIGN IN TO VIEW THIS PAGE </h1>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { getUserInfo })(Inbox)
