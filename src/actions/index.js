import todo from "../apis/todo"
import { CREATE_TODO, FETCH_TODOS, FETCH_TODO, EDIT_TODO, DELETE_TODO, FILTER_TODOS } from "./types";

// create todo action creator
export const createTodo = (formValues, navigate) => {
    return async (dispatch) => {
        const response = await todo.post('/todo', formValues);

        dispatch({type: CREATE_TODO, payload : response.data})

        navigate('/')
    }
}

// fetch all todos action creator
export const fetchTodos = () => async dispatch => {
    const response = await todo.get('/todo');

    dispatch({type: FETCH_TODOS, payload : response.data})
}

// fetch single todo action creator
export const fetchTodo = (id) => async dispatch => {
    const response = await todo.get(`/todo/${id}`);

    dispatch({type: FETCH_TODO, payload : response.data})
}

// Edit todo action creator
export const editTodo = (id, formValues, navigate) => async dispatch => {
    const response = await todo.put(`/todo/${id}`, formValues);

    dispatch({type: EDIT_TODO, payload : response.data})

    navigate('/')
}

// delete todo action creator
export const deleteTodo = (id, navigate) => async dispatch => {
    const response = await todo.delete(`/todo/${id}`);

    dispatch({type: DELETE_TODO, payload : id})
}


// filter todo action creator
export const filterTodos = (value) => async dispatch => {
   const response = await todo.get('/todo');

   dispatch({type: FETCH_TODOS, payload : response.data})
   dispatch({type: FILTER_TODOS, payload : value})
}