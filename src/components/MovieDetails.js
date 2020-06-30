import React from 'react'
import "../styles/MovieShow.css"
// import { MDBIcon } from "mdbreact"
const MovieDetails = ({ movie, loading }) => {
    return (
        <div className="details-container1">
            <div>
                <h2 className="col2-heading">Status</h2>
                <span className="value">{movie.status}</span>
            </div>
            <div>
                <h2 className="col2-heading">Budget</h2>
                <span className="value">{movie.budget}</span>
            </div>
            <div>
                {
                    loading && movie.genres !== undefined ? movie.genres.length === 0 ? null :
                        <div>
                            <h2 className="col2-heading">Genres</h2>
                            {loading && movie.genres.map((genre, i) => {
                                return <p className="looped-values" key={i}>{genre.name}</p>
                            })}
                        </div> : null
                }
            </div>
            <div>
                {loading && movie.production_companies!== undefined ? movie.production_companies.length === 0 ? null :
                    <div>
                        <h2 className="col2-heading">Produced By</h2>
                        {loading && movie.production_companies.map((comp, i) => {
                            return <p className="looped-values" key={i}>{comp.name}</p>
                        })}
                    </div> : null
                }

            </div>
            <div>
                {loading && movie.spoken_languages !== undefined ? movie.spoken_languages.length === 0 ? null :
                    <div>
                        <h2 className="col2-heading">Languages</h2>
                        {loading && movie.spoken_languages.map((lang, i) => {
                            return <p className="looped-values" key={i}>{lang.name}</p>
                        })}
                    </div> : null
                }

            </div>
            <div>
                <h2 className="col2-heading">Votes</h2>
                <span className="value">{movie.vote_count}</span>
            </div>

        </div>
    )
}

export default MovieDetails
