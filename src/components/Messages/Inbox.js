import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserInfo } from './../../ducks/reducer'
import Header from './../../Header'
import './Inbox.css'

export class Inbox extends Component {
    constructor() {
        super()

        this.state = {
            results: []
        }
        this.deleteMessage = this.deleteMessage.bind(this)
        this.getMessages = this.getMessages.bind(this)
        this.reply=this.reply.bind(this)
    }


    markViewed(id) {
        axios.put('/mark/read', {
            id: id
        }).then( (res) => {
            this.getMessages()
        })
    }

    reply(id) {
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;}
            return i;}

        var dateStamp = new Date();
        var month = dateStamp.getMonth()
        var day = dateStamp.getDay()
        var year = dateStamp.getFullYear()
        var hour = dateStamp.getHours()
        var minutes = addZero(dateStamp.getMinutes())
        var timeStamp = `${month}/${day}/${year}  ||  ${hour}:${minutes}`

                var obj = this.state.results.filter( (e,i,arr) => {
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
        axios.delete('/delete/message', {data: {
            id: id
        }}).then( (res) => {
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
    // this.getInbox();

    render() {
        var mapInbox = this.state.results.map((e, i, arr) => {
            if (e.viewed === false)
                return <div className='map-container'>
                    <h1>-- Item --</h1> <div className='item-name'>{e.item}</div> <div className='message-div'>{e.message}</div> <div className='date-div'>{e.date}</div> 
                                                                <div><textarea placeholder='reply here' ref={`message${e.id}`} /></div>
                                                                <button onClick={ () => this.deleteMessage(e.id)}>X</button> 
                                                                <button onClick={ () => this.markViewed(e.id) }>Read</button>
                                                                <button onClick={ () => this.reply(e.id) }>Reply</button> 
                                                                <p> ------------------------------------------------------------------------------------------------ </p>
                </div>
        })
        var viewed = this.state.results.map((e, i, arr) => {
            if (e.viewed === true) {
                return <div>
                    <h1>-- Item --</h1>{e.item} {e.senderid}<div className='message-div'> {e.message}</div> <div classNam='date-div'>{e.date} </div> 
                                                                <button onClick={ () => this.deleteMessage(e.id)}>X</button>
                                                                <button>Reply</button>
                </div>
            }
        })
        console.log(mapInbox)
        console.log(this.state.results)
        console.log(this.props.user.userid)
        return (
            
            <div>
                <Header title='Inbox'/>
                <div className='inbox-container'>
                <div className='unread-container'>
                    <p> UNREAD MESSAGES</p>
                    {mapInbox}
                </div>
                <div className='read-container'>
                    <p> READ MESSAGES </p>
                    {viewed}
                </div>
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
export default connect(mapStateToProps, { getUserInfo })(Inbox)
