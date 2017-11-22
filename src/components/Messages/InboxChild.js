import React, { Component } from 'react'


export class InboxChild extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggle: false,
            message: ''
        }
        this.setMessage=this.setMessage.bind(this)
    }


setMessage() {
    this.refs.messageref.value = ''
}

    toggleMessage(id) {
        this.setState({
        toggle: !this.state.toggle
    })
    }

  render() {
      console.log(this.state)
      console.log(this.state.message)
    return (
      <div>
          <div className='map-container'>
                    <h1>-- Item --</h1> <div className='item-name'>{this.props.item}</div> 
                                <div className='message-div'>{this.props.message}</div> 
                                <div className='date-div'>{this.props.date}</div> 
                                <button onClick = { () => this.toggleMessage() }> Details </button>
                                <div className={!this.state.toggle ? 'hide-me' : ''}>
                                <div><textarea placeholder='reply here' ref='messageref' /></div>
                                <button onClick={ () => this.props.deleteMessage(this.props.id)}>X</button> 
                                <button onClick={ () => this.props.markViewed(this.props.id) }>Read</button>
                                <button 
                                onClick={ () => {this.props.reply(this.props.id, this.refs.messageref.value); this.setMessage()}}

                                >Reply</button> 
                                <p> ------------------------------------------------------------------------------------------------ </p>
                                </div>
                </div>
             
      </div>
    )
  }
}

export default InboxChild
