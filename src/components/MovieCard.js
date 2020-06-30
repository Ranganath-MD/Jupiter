import React from 'react'
import "../styles/MovieCard.css"
import { MDBBtn } from 'mdbreact'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie, loaded }) => {
    return (
        <div className="movie-card" >
            <div className="movie-image">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="movie"
                    className="img"
                />
            </div>
            <div className="movie-container">
                <div className="movie-header">
                    <div>
                        <p className="movie-title">{movie.title}</p>
                        <p className="release-date">{movie.release_date}</p>
                    </div>
                </div>
                <div className="movie-desc">
                    {movie.overview}
                </div>

                <div className="more-info">
                    <Link to={`/discover/movie/${movie.id}`}>
                    <MDBBtn
                        color="success"
                        size="sm"
                    >
                            More info</MDBBtn>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
