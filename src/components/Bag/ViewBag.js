import React, { Component } from 'react'
import axios from 'axios'
import { getUserInfo } from './../../ducks/reducer'
import { connect } from 'react-redux'

export class ViewBag extends Component {
  constructor() {
    super()

    this.state = {
      inventory: []
    }

  }
  componentDidMount() {
    this.props.getUserInfo();
    
    axios.get(`/view/bag/${this.props.user.userid}`).then((response) => {
      this.setState({
        inventory: response.data
      })
    })
  }

  render() {

    var mapGear = this.state.inventory.map((e, i, arr) => {
      return <div key={i}>

        Item:  {e.item_name} ||
       Rented: {JSON.stringify(e.rented)}

      </div>
    })

    console.log(this.state.inventory)
    return (
      <div>
        {mapGear}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { getUserInfo })(ViewBag)
