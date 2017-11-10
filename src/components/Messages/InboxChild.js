import React, { Component } from 'react'


export class InboxChild extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggle: false,
            name: '',
        }
    }

    toggleMessage(id) {
        this.setState({
        toggle: !this.state.toggle
    })
    }

  render() {
    return (
      <div>
          <div className='map-container'>
                    <h1>-- Item --</h1> <div className='item-name'>{this.props.item}</div> <div className='message-div'>{this.props.message}</div> 
                                <div className='date-div'>{this.props.date}</div> 
                                <button onClick = { () => this.toggleMessage() }> Details </button>
                                <div className={!this.state.toggle ? 'hide-me' : ''}>
                                <div><textarea placeholder='reply here' ref={`message${this.props.id}`} /></div>
                                <button onClick={ () => this.props.deleteMessage(this.props.id)}>X</button> 
                                {this.props.markViewed ? <button onClick={ () => this.props.markViewed(this.props.id) }>Read</button> : null}
                                <button onClick={ () => this.props.reply(this.props.id) }>Reply</button> 
                                <p> ------------------------------------------------------------------------------------------------ </p>
                                </div>
                </div>
             
      </div>
    )
  }
}

export default InboxChild
