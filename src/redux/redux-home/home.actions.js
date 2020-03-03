import {HomeActionTypes} from './home.types';
import {
    SEARCH_BASE_URL,
    POPULAR_BASE_URL
} from '../../assets/config';

export const fetchMoviesStart = () => {
    return{
        type: HomeActionTypes.FETCH_MOVIES_START
    }
}

export const fetchMoviesSuccess = (result, category, isLoadMore) => {
    return{
        type: HomeActionTypes.FETCH_MOVIES_SUCCESS,
        payload: {result, category, isLoadMore}
    }
}

export const fetchMoviesFailure = () => {
    return{
        type: HomeActionTypes.FETCH_MOVIES_FAILURE
    }
}

export const fetchMoviesStartAsync = (endpoint, category) => {
    return async (dispatch) => {
        dispatch(fetchMoviesStart());
        const isLoadMore = endpoint.search('page');
        let result;
        try{
            result = await (await fetch(endpoint)).json();
            console.log(category + " " + " 5555");
            dispatch(fetchMoviesSuccess(result, category, isLoadMore));
        } catch(error){
            dispatch(fetchMoviesFailure());
            console.log(error);
        }
        console.log(category + " " + " 5555");
    }
}

export const searchMovies = (search) => {
    return dispatch => {
        if(!search){
            dispatch({
                type: HomeActionTypes.SEARCH_MOVIES,
                payload: search
            });
            return;
        }
        dispatch({
            type: HomeActionTypes.SEARCH_MOVIES,
            payload: search
        });
        dispatch(fetchMoviesStartAsync(SEARCH_BASE_URL + search, 'search'));
    }
}

export const loadMoreMovies = () => {
    return (dispatch, getState) => {
        const state = getState();
        const searchEndpoint = `${SEARCH_BASE_URL}${state.home.searchTerm}&page=${state.home.data.currentPage + 1}`;
        const popularEndpoint = `${POPULAR_BASE_URL}&page=${state.home.data.currentPage + 1}`;
    
        const endpoint = state.home.searchTerm ? searchEndpoint : popularEndpoint;
    
        dispatch(fetchMoviesStartAsync(endpoint, 'search'));
    }
}

export const resetMovies = sessionData => {
    return{
        type: HomeActionTypes.RESET_MOVIES,
        payload: sessionData
    }
}