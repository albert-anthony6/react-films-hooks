import React, { useState } from 'react';
import './MovieRow.styles.scss';
import MovieThumb from '../../components/movie-thumb/MovieThumb.component';
import NoImage from '../../assets/no_image.jpg';
import RightArrow from '../arrows/RightArrow.component';
import LeftArrow from '../arrows/LeftArrow.component';

import {
    IMAGE_BASE_URL,
    POSTER_SIZE
} from '../../assets/config';

const MovieRow = ({ header, movies }) => {
    const [index, setIndex] = useState(0);

    const goToPrevSlide = () => {
        if(index === 0){
            return setIndex(11);
        }
        setIndex(index - 1);
    }

    const goToNextSlide = () => {
        if(index === 11){
            return setIndex(0);
        }
        setIndex(index + 1);
    }

    const hr={
        marginTop: '50px',
        border: "0",
        height: "2px",
        backgroundImage: "radial-gradient(circle, rgba(210, 208, 208, 0.190914) 0%, rgba(210, 208, 208, 0) 90%)",
    }
    return(
        <div className="movierow">
            <h1>{header}</h1>
            <div className="movierow-content" style={{
                transform: `translateX(-${index * 5}%)`
            }}>
                {movies.map(movie => (
                    <MovieThumb
                    key={movie.id}
                    clickable
                    image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage}
                    movieId={movie.id}
                    movieName={movie.original_title}
                    />
                ))}
            </div>
            <LeftArrow className="backarrow arrow" goToPrevSlide={goToPrevSlide}/>
            <RightArrow className="nextarrow arrow" goToNextSlide={goToNextSlide}/>
            <hr style={hr}></hr>
        </div>
    );
};

export default MovieRow;