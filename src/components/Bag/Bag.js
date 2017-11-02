import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Bag extends Component {
  render() {
    return (
      <div>
          <Link to='/bag/view'>
        <button> View Bag </button>
        </Link>
        <Link to='/bag/add'>
        <button> Add To Bag </button>
        </Link>
      </div>
    )
  }
}

export default Bag
