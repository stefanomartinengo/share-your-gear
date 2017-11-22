import React, { Component } from 'react'

export class OutboxChild extends Component {
    constructor() {
        super()

        this.state = {
            toggleSent: false
        }

       this.toggleSent = this.toggleSent.bind(this)
    }

    toggleSent() {
        this.setState({
            toggleSent: !this.state.toggleSent
        })
    }

  render() {
      console.log('toggle:', this.state.toggleSent)
    return (
        <div className='map-container'>
                    <h1>-- Item --</h1> <div className='item-name'>{this.props.item}</div> 
                                <div className='message-div'>{this.props.message}</div> 
                                <div className='date-div'>{this.props.date}</div> 
                                 <button onClick = { () => this.toggleSent() }> Details </button> 
                                <div className={!this.state.toggleSent ? 'hide-me' : ''}>
                                <div><textarea placeholder='reply here' ref='messageref' /></div>
                                <button onClick={ () => this.props.deleteMessage(this.props.id)}>X</button> 
                                
                                <p> ------------------------------------------------------------------------------------------------ </p>
                                </div>
                </div>
    )
  }
}

export default OutboxChild
