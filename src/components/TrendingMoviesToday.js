import React, { useEffect, useContext, useState } from 'react'
import axios from "../utils/Axios-config"
import FilmContext from "../context/FilmContext"
import "../styles/home.css"
import { Redirect } from 'react-router-dom'


const TrendingMoviesToday = () => {
    const context = useContext(FilmContext)
    const [redirect, setRedirect] = useState(false)
    const [movieId, setMovieId] = useState(0)


    useEffect(() => {
        axios.get("/trending/movie/day")
            .then(response => {
                context.setLoading(true)
                context.setTrendingMoviesToday(response.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleTrendingMoviesToday = (movie) => {
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
                    context.loading && context.trendingMoviesToday.map((movie, i) => {
                        return (
                            <div className="sp_card" key={i} onClick={() => handleTrendingMoviesToday(movie)}>
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

export default TrendingMoviesToday
