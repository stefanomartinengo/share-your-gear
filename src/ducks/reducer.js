import axios from 'axios';

const initialState = {
    user: { auth_id: 0 },
    searched: false,
    city: '',
    category: '',
    zipcode: 0
}

const GET_USER_INFO = 'GET_USER_INFO';
const SEARCH_RESULTS = 'SEARCH_RESULTS';
// const SEARCH_GEO_CENTER = 'SEARCH_GEO_CENTER';


export function getUserInfo() {
    const get_user = axios.get('/auth/me');
    return {
        type: GET_USER_INFO,
        payload: get_user
    }
}

// export function searchGeoCenter() {
//     return dispatch => {
//     var center = navigator.geolocation.getCurrentPosition( (position) => {
//     dispatch({
//         type: SEARCH_GEO_CENTER,
//         payload: position
//     })}, error => {
//     alert(error)
//     })
// }}

export function historySearch(city, category, zipcode) {
    console.log(city, category, zipcode)
    return {
        type: SEARCH_RESULTS,
        payload: {
            city: city,
            category: category,
            zipcode: zipcode
        }
    }
}

// export function getUserInfo() {
//     return {
//         type: GET_PRODUCT_DETAILS,
//         payload: axios.get('/auth/me')
//     }
// }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload.data })

            
        case SEARCH_RESULTS:
            return Object.assign({},
                state,
                {
                    city: action.payload.city,
                    category: action.payload.category,
                    zipcode: action.payload.zipcode

                }
            )

            // case SEARCH_GEO_CENTER:
            // return Object.assign({}, state, {center: action.payload})
            
            default:
            return state;
        }
}