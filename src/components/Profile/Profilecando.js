import React, { Component } from 'react'

export class Profilecando extends Component {
    constructor(props) {
        super(props)
    }

  render() {
    return (
 
          <option value={this.props.cando_item}> {this.props.cando_item} </option>
    )
  }
}

export default Profilecando
