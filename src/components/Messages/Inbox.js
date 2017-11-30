import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserInfo } from './../../ducks/reducer'
import Header from './../../Header'
import './Inbox.css'
import InboxChild from './InboxChild'
import OutboxChild from './OutboxChild'
import { getItBack } from './InboxChild'
import inbox from './../../assets/inbox.png'
import outbox from './../../assets/outbox.png'

export class Inbox extends Component {
    constructor() {
        super()

        this.state = {
            results: [],
            sentMessages: [],
            toggle: false,
            inboxToggle: true,
            outboxToggle: false
        }
        this.deleteMessage = this.deleteMessage.bind(this)
        this.getMessages = this.getMessages.bind(this)
        this.getSentMessages = this.getSentMessages.bind(this)
        this.reply = this.reply.bind(this)
        this.toggleMessage = this.toggleMessage.bind(this)
        // this.markViewed = this.markViewed.bind(this)
    }

    
    toggleInbox() {
        this.setState({
            inboxToggle: true
        })
    }

    toggleOutbox() {
        this.setState({
                outboxToggle: true,
                inboxToggle: false
            })
    }


    toggleMessage(id) {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    // markViewed(id) {
    //     axios.put('/mark/read', {
    //         id: id
    //     }).then((res) => {
    //         console.log(id)
    //         this.getMessages()
    //     })
    // }

    reply(id,mess) {
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
        console.log({
            senderid: this.props.user.userid,
            receiverid: obj[0].senderid,
            message: mess,
            item: obj[0].item,
            date: timeStamp
        })
        axios.post('/send/message/', {
            senderid: this.props.user.userid,
            receiverid: obj[0].senderid,
            message: mess,
            item: obj[0].item,
            date: timeStamp
        }).then( () => {
        alert('message sent')
        this.getSentMessages()
    })
    }

    deleteMessage(id) {
        axios.delete('/delete/message', {
            data: {
                id: id
            }
        }).then((res) => {
            this.getMessages();
            this.getSentMessages();
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

    getSentMessages() {
        axios.get('/sent/messages/' + this.props.user.userid)
        .then( (response) => {
            this.setState({
                sentMessages: response.data
            })
        })
    }
    componentDidMount() {
        this.props.getUserInfo();
        this.getMessages();
        this.getSentMessages();
    }
    render() {
        var mapInbox = this.state.results.map((e, i, arr) => {
                return <InboxChild key={i}
                    id={e.id}
                    item={e.item}
                    date={e.date}
                    message={e.message}
                    deleteMessage={this.deleteMessage}
                    markViewed={this.markViewed}
                    reply={this.reply} />

        })
        var sent = this.state.sentMessages.map( (e,i,arr) => {
            return <OutboxChild key = {i}
                    id={e.id}
                    item={e.item}
                    date={e.date}
                    message={e.message}
                    deleteMessage={this.deleteMessage}
                    />
        })
        // var viewed = this.state.results.map((e, i, arr) => {
        //     if (e.viewed === true) {
        //         return <InboxChild key={i+200}
        //             id={e.id}
        //             item={e.item}
        //             date={e.date}
        //             message={e.message}
        //             reply={this.reply}
        //             deleteMessage={this.deleteMessage}/>
        //     }
        // })
        console.log(mapInbox)
        console.log(this.state.results)
        console.log(this.props.user)
        console.log(this.state.sentMessages)
        console.log(this.state)
        return (
            <div>
                <Header title='Inbox' />
                <img className="messageimg" src={inbox} onClick={() => this.toggleInbox()} /> 
                <img className="messageimg" src={outbox} onClick={() => this.toggleOutbox()}/> 
        
                {this.props.user.auth_id ?
                    <div className='inbox-container'>
                                {this.state.inboxToggle ?
                        <div className='unread-container'>
                            <p> INBOX </p>
                            {mapInbox}
                        </div>
                        :
                        <div className='read-container'>
                            <p> OUTBOX </p>
                            {sent}
                    </div> }
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
