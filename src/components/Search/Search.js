import React, { Component } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './../../assets/-rendition;size=1200;version=0.png'
import { connect } from 'react-redux'
import { getUserInfo, historySearch } from './../../ducks/reducer'
import Header from './../../Header'


export class Search extends Component {
  constructor() {
    super() //if 401 persists/try adding props to these

    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    this.props.getUserInfo()

      .then(() => {
        var array = this.props.location.search.split(/[\?&]+/)

        axios.get('/search/gear/?category=' + array[1] + '&city=' + array[2] + '&zipcode=' + array[3] + '&userid=' + this.props.user.userid)
          .then((res) => {
            this.setState({ items: res.data })
          })

      })
  }

  searchItems() {
    axios.get('/search/gear/?category=' + this.refs.select.value + '&city=' + this.refs.city.value + '&zipcode=' + this.refs.zip.value + '&userid=' + this.props.user.userid)
      .then((res) => {
        this.setState({ items: res.data })
        console.log(this.refs.city.value, this.refs.select.value, this.refs.zip.value)
        this.props.historySearch(this.refs.city.value, this.refs.select.value, this.refs.zip.value)
        this.refs.city.value = ''
        this.refs.zip.value = ''
      })

  }

  render() {
    var mapGear = this.state.items.map((e, i, arr) => {
      return <div key={i} className='list-gear'>
        <Link to={`/details/${e.itemid}`}>
          <img alt='' src={e.image_url[0]} /> {e.item_name}
        </Link>
      </div>

    })
    //Render map function to get all the items to render below
    console.log(this.state.items)
    console.log(this.props.user.userid)
    return (
      
      <div className='search'>
        <Header title='SEARCH GEAR'/>
        <Link to='/profile'>
          <img alt='' src={logo} />
        </Link>

        <div className='form'>

          <select ref='select' >
            <option value="Climbing">Climbing</option>
            <option value="Cycling">Cycling</option>
            <option value="Canyoneering">Canyoneering</option>
            <option value="Water Sports">Water Sports</option>
            <option value="Winter Sports">Winter Sports</option>
            <option value="Hunting">Hunting</option>
          </select>

          <input
            ref='city'
            placeholder='City' />

          <input
            ref='zip'
            placeholder='zip code' />

          <button onClick={() => this.searchItems()}> Search </button>

        </div>

        <div className='list-container'>
          <div className='search-list'>
            {mapGear}
          </div>
        </div>


      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getUserInfo, historySearch })(Search)



