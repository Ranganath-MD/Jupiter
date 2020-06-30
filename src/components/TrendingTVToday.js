
import React, { useEffect, useContext, useState } from 'react'
import axios from "../utils/Axios-config"
import TVContext from "../context/TVShowContext"
import "../styles/home.css"
import { Redirect } from 'react-router-dom'

// trendingTvshowToday, setTrendingTvShowToday
const TrendingTVToday = () => {
    const context = useContext(TVContext)
    const [redirect, setRedirect] = useState(false)
    const [tvshowId, setTvShowId] = useState(0)

    useEffect(() => {
        axios.get("/trending/tv/day")
            .then(response => {
                context.setLoading(true)
                context.setTrendingTvShowToday(response.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleTrendingShow = (tv) => {
        setTvShowId(tv.id)
        setRedirect(true)
    }


    return (
        <div>
            {
                redirect && <Redirect to={`/discover/tv-shows/${tvshowId}`} />
            }
            <section className="hr_popular_cards">
                {
                    context.loading && context.trendingTvshowToday.map((tv, i) => {
                        return (
                            <div className="sp_card" key={i} onClick={() => handleTrendingShow(tv)}>
                                <div>
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                                        alt="poster"
                                        key={i}
                                        className="backdrop"
                                    />
                                </div>

                                <p className="p_movie_title">{tv.name}</p>
                                <p className="p_date">{tv.first_air_date}</p>
                            </div>

                        )
                    })
                }
            </section>

        </div>
    )
}

export default TrendingTVToday
