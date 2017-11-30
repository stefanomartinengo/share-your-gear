import React, { Component } from 'react'

export class Profilewannado extends Component {
    constructor(props) {
        super(props)
    }

  render() {
    return (
 
          <option value={this.props.wannado_item}> {this.props.wannado_item} </option>
    )
  }
}

export default Profilewannado
