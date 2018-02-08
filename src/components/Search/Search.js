import React, { Component } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { getUserInfo, searchGeoCenter, historySearch } from './../../ducks/reducer'
import Header from './../../Header'
import backpack from './../../assets/backpack.png'
import * as turf from '@turf/turf'
import * as geocoder from 'geocoder'

export class Search extends Component {
  constructor() {
    super()

    this.state = {
      items: [],
      toggle: false,
      getMoreToggle: false,
      start: {},
      currentLocation: {lat: 0, lng: 0}
    }
  }
  
  componentWillMount() {
    this.props.searchGeoCenter();
    this.props.getUserInfo()
      .then(() => {
        var array = this.props.location.search.split(/[\?&]+/)
        axios.get('/search/gear/?category=' + array[1] + '&city=' + array[2] + '&zipcode=' + array[3] + '&userid=' + this.props.user.userid)
          .then((res) => {
            this.setState({ items: res.data })
          })
      })
  }

  componentDidMount() {
    setTimeout( ()=> !this.props.center.coords ? alert('GPS location not found') : null, 7000)
  }

  searchItems() {
    !this.refs.city.value || !this.refs.zip.value ? alert('please fill out all fields') :
    axios.get('/search/gear/?category=' + this.refs.select.value + '&city=' + this.refs.city.value + '&zipcode=' + this.refs.zip.value + '&userid=' + this.props.user.userid)
      .then((res) => {
        this.setState({ items: res.data, 
                        toggle: true,
                        getMoreToggle: false })
        this.props.historySearch(this.refs.city.value, this.refs.select.value, this.refs.zip.value)
        this.refs.city.value = ''
        this.refs.zip.value = ''
      })
      
  }

  getMore() {
    axios.get('/get/more/?category=' + this.refs.select.value + '&userid=' + this.props.user.userid)
      .then((res) => {
        this.setState({ items: res.data })
      })
    this.setState({
      getMoreToggle: true
    })
  }

  render() {
    var mapGear = this.state.items.map((e, i, arr) => {
      var center = turf.point([this.props.center.coords.longitude, this.props.center.coords.latitude]);
      var points = turf.points([ [e.lng, e.lat] ])
      var options = {steps: +this.refs.radius.value, units: 'miles', options: {foo: 'bar'}};
      var radius = turf.circle(center, this.refs.radius.value, options);
        if(turf.pointsWithinPolygon(points, radius).features[0]) {
      return <div key={i} className='list-gear'>
        <Link to={`/details/${e.itemid}`}>
          <img className='listimage' alt='' src={e.image_url[0]} />
          <div className='itemname'>{e.item_name}</div>
        </Link>
      </div>
        }
    })
    return (
      <div className='search'>
        <Header title='SEARCH GEAR' />
        <Link to='/profile'>
          <img alt='' src={backpack} />
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
          { this.props.center.coords ? 
          <div className='radius'>
            <p>Radius</p>
          <select ref='radius' >
            <option value="5">5 mi</option>
            <option value="10">10 mi</option>
            <option value="25">25 mi</option>
          </select>
          </div>
          : null }
        </div>

        <div className='list-container'>
          {this.state.items.length > 0 ?
            <div className='search-list'>
              {mapGear}
              {!this.state.getMoreToggle ?
                <h1> Can't find what you're looking for? <button onClick={() => this.getMore()}>Click here</button> to expand search </h1>
                : null}
            </div>
            : null}
          {this.state.toggle && this.state.items.length < 1 ?

            <div className="search-list"> No results for this category. Please try a new search </div> : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return state
}

export default connect(mapStateToProps, { getUserInfo, searchGeoCenter, historySearch })(Search)

