import React, { useState } from 'react';
import './Categories.styles.scss';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';

const Categories = () => {
    const [hidden, setHidden] = useState(true);
    const [toggleHidden, setToggleHidden] = useState('');

    const toggleHiddenState = () => {
        if(toggleHidden === ''){
            setToggleHidden('toggle-hidden');
        }else{
            setToggleHidden('');
        }
        setHidden(!hidden);
    };

    return(
        <div className={`categories ${toggleHidden}`}>
            {hidden ? <button onClick={toggleHiddenState}>Categories <FontAwesome className="fa-caret-down" name="caret-down"/></button> : 
                <div className="categories-container">
                    <button onClick={toggleHiddenState}>Categories <FontAwesome className="fa-caret-down" name="caret-down"/></button>
                    <Link to="category/top-rated">Top Rated</Link>
                    <Link to="category/now-playing">Now Playing</Link>
                    <Link to="category/upcoming">Upcoming</Link>
                    <Link to="category/popular">Popular</Link>
                </div>
            }
        </div>
    );
};

export default Categories;