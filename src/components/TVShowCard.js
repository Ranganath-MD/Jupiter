import React from 'react'
import "../styles/MovieCard.css"
import { MDBBtn } from 'mdbreact'
import { Link } from 'react-router-dom'

const TVShowCard = ({ tvshows, loaded }) => {
    return (
        <div className="movie-card" >
            <div className="movie-image">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${tvshows.poster_path}`}
                    alt="movie"
                    className="img"
                />
            </div>
            <div className="movie-container">
                <div className="movie-header">
                    <div>
                        <p className="movie-title">{tvshows.name}</p>
                        <p className="release-date">{tvshows.first_air_date}</p>
                    </div>
                </div>
                <div className="movie-desc">
                    {loaded ? tvshows.overview.slice(0, 100) : null}...
                </div>

                <div className="more-info">
                    <Link to={`/discover/tv-shows/${tvshows.id}`}>
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

export default TVShowCard
