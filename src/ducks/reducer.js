import axios from 'axios';

const initialState = {
    user: {},
    searched: false,
    city: '',
    category: '',
    zipcode: 0
}

const GET_USER_INFO = 'GET_USER_INFO';
const SEARCH_RESULTS ='SEARCH_RESULTS';


export function getUserInfo() {
    return {
        type: GET_USER_INFO,
        payload: axios.get('/auth/me')
    }
}


export function historySearch(city, category, zipcode){
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
            return Object.assign( {}, state, { user: action.payload.data } )
        // case GET_PRODUCT_DETAILS:
        //     return Object.assign( {}, state, {itemid}) 
        case SEARCH_RESULTS:
            return Object.assign( {}, 
                state, 
                { 
                    city: action.payload.city,
                    category: action.payload.category,
                    zipcode: action.payload.zipcode

                } 
            )
    
        default:
            return state;
    }
}