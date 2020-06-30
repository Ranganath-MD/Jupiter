import React, { useState } from 'react'
import FilmContext from "./FilmContext"

const FilmProvider = (props) => {
    const [page, setPage] = useState(1)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({})
    const [selectedMovieVideos, setSelectedMovieVideos] = useState([])
    const [selectedMovieImages, setSelectedMovieImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [movieCast, setCast] = useState(null)
    const [loadingMask, setLoadingMask] = useState(true)
    const [recommendations, setRecommendations] = useState([])
    const [loadRecommandations, setLoadRecommandations] = useState(false)
    const [homeImage, setHomeImage] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [trendingMoviesToday, setTrendingMoviesToday] = useState([])
    const [trendingMoviesWeek, setTrendingMoviesWeek] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [reviews, setReviews] = useState([])

    return (
        <FilmContext.Provider
            value={{
                showLoginModal, setShowLoginModal,
                movies, setMovies,
                selectedMovie, setSelectedMovie,
                loading, setLoading,
                movieCast, setCast,
                selectedMovieVideos, setSelectedMovieVideos,
                selectedMovieImages, setSelectedMovieImages,
                loadingMask, setLoadingMask,
                loadRecommandations, setLoadRecommandations,
                recommendations, setRecommendations,
                searchResult, setSearchResult,
                homeImage, setHomeImage,
                popularMovies, setPopularMovies,
                trendingMoviesToday, setTrendingMoviesToday,
                trendingMoviesWeek, setTrendingMoviesWeek,
                upcomingMovies, setUpcomingMovies,
                page, setPage,
                reviews, setReviews,
                topRatedMovies, setTopRatedMovies
            }}
        >
            {props.children}
        </FilmContext.Provider>
    )
}

export default FilmProvider
