import React, { useEffect, useContext, useState } from 'react'
import axios from "../utils/Axios-config"
import FilmContext from "../context/FilmContext"
import "../styles/home.css"
import { Redirect } from 'react-router-dom'

const PopularMovie = () => {
    const context = useContext(FilmContext)
    const [redirect, setRedirect] = useState(false)
    const [movieId, setMovieId] = useState(0)
    // setPopularMovies
    useEffect(() => {
        axios.get("/movie/popular")
            .then(response => {
                context.setLoading(true)
                context.setPopularMovies(response.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handlePopularMovie = (movie) => {
        setMovieId(movie.id)
        setRedirect(true)
    }


    return (
        <div>
            {
                redirect && <Redirect to={`/discover/movie/${movieId}`} />
            }
            <section className="hr_popular_cards">
                {
                    context.loading && context.popularMovies.map((movie, i) => {
                        return (
                            <div className="sp_card" key={i} onClick={() => handlePopularMovie(movie)}>
                                <div>
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        alt="poster"
                                        key={i}
                                        className="backdrop"
                                    />
                                </div>

                                <p className="p_movie_title">{movie.title}</p>
                                <p className="p_date">{movie.release_date}</p>
                            </div>

                        )
                    })
                }
            </section>

        </div>
    )
}

export default PopularMovie
