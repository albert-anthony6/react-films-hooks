import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.styles.scss';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';
import {searchMovies} from '../../redux/redux-home/home.actions';

const SearchBar = ({ searchMovies }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const timeOut = useRef(null);

    useEffect(() => {
        clearTimeout(timeOut.current);

        timeOut.current = setTimeout(() => {
            searchMovies(searchTerm);
        }, 500);

    }, [searchTerm]);

    const doSearch = e => {
        setSearchTerm(e.target.value);
    }
    return(
        <div className="searchbar">
            <div className="searchbar-content">
                <FontAwesome className="fa-search" name="search" size="2x"/>
                <input type="text" placeholder="Movie" autoComplete="off" onChange={doSearch} value={searchTerm}/>
            </div>
        </div>
    );
}
const mapDispatchToProps = dispatch => ({
    searchMovies: search => dispatch(searchMovies(search))
});

export default connect(null, mapDispatchToProps)(SearchBar);