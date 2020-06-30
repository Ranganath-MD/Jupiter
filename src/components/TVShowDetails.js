import React from 'react'
import "../styles/MovieShow.css"

const TVShowDetails = ({ tvshow, loading }) => {
    return (
        <div className="details-container1">
            <div>
                {loading && tvshow.seasons !== undefined ? tvshow.seasons.length === 0 ? null :
                    <div>
                        <h2 className="col2-heading">Seasons</h2>
                        {loading && tvshow.seasons.map((creator, i) => {
                            return <p className="looped-values" key={i}>{creator.name}</p>
                        })}
                    </div> : null
                }

            </div>
            <div>
                <h2 className="col2-heading"># of Seasons</h2>
                <span className="value">{tvshow.number_of_seasons}</span>
            </div>
            <div>
                <h2 className="col2-heading"># of Episodes</h2>
                <span className="value">{tvshow.number_of_episodes}</span>
            </div>
            <div>
                {loading && tvshow.created_by !== undefined ?  tvshow.created_by.length === 0 ? null :
                    <div>
                        <h2 className="col2-heading">Craeted By</h2>
                        {loading && tvshow.created_by.map((creator, i) => {
                            return <p className="looped-values" key={i}>{creator.name}</p>
                        })}
                    </div> : null
                }

            </div>
            <div>
                <h2 className="col2-heading">Status</h2>
                <span className="value">{tvshow.status}</span>
            </div>
            <div>
                {loading && tvshow.genres !== undefined ? tvshow.genres.length === 0 ? null :
                    <div>
                        <h2 className="col2-heading">Genres</h2>
                        {loading && tvshow.genres.map((genre, i) => {
                            return <p className="looped-values" key={i}>{genre.name}</p>
                        })}
                    </div> : null
                }

            </div>
            <div>
                {
                    loading && tvshow.languages !== undefined ? tvshow.length === 0 ? null :
                        <div>
                            <h2 className="col2-heading">Languages</h2>
                            {tvshow.languages.map((lang, i) => {
                                return <p className="looped-values" key={i}>{lang}</p>
                            })}
                        </div> : null
                }
            </div>
            <div>
                {
                    loading && tvshow.production_companies !== undefined ? tvshow.length === 0 ? null :
                        <div>
                            <h2 className="col2-heading">Produced By</h2>
                            {loading && tvshow.production_companies.map((comp, i) => {
                                return <p className="looped-values" key={i}>{comp.name}</p>
                            })}
                        </div> : null
                }

            </div>
            <div>
                <h2 className="col2-heading">Votes</h2>
                <span className="value">{tvshow.vote_count}</span>
            </div>
        </div>
    )
}

export default TVShowDetails
