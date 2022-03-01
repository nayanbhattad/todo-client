// import libraries
import _ from 'lodash';
import { CREATE_TODO, FETCH_TODOS, FETCH_TODO, EDIT_TODO, DELETE_TODO, FILTER_TODOS } from "../actions/types";

const todoReducer =  (state={}, action) => {
    switch(action.type) {
        case FETCH_TODOS :
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_TODO :
            return {...state, [action.payload.id] : action.payload}   
        case CREATE_TODO :
            return {...state, [action.payload.id] : action.payload}
        case EDIT_TODO : 
            return {...state, [action.payload.id] : action.payload}
        case DELETE_TODO : 
            return _.omit(state, action.payload)
        case FILTER_TODOS :
            // logic to filter the search result 
            let searchResult = {}
            let obj = Object.values(state); 
            const filteredData = obj.filter(entry =>{
                for(const property in entry) {
                    if(entry[property].toString().toUpperCase().includes(action.payload.toUpperCase())) {
                        return true
                    }       
                }}
            );

            filteredData.forEach((element)=>{
                searchResult[element.id] = element
            })
            return searchResult
        default :
            return state;
    };
};


export default todoReducer;