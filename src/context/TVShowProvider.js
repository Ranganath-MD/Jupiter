import React, { useState } from 'react'
import TVContext from "./TVShowContext"

const TVShowProvider = (props) => {
    const [page, setPage] = useState(1)
    const [tvshows, setTVShows] = useState([])
    const [selectedTVShow, setSelectedTVShow] = useState({})
    const [selectedShowVideos, setSelectedShowVideos] = useState([])
    const [selectedShowImages, setSelectedShowImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [showCast, setCast] = useState(null)
    const [loadingMask, setLoadingMask] = useState(true)
    const [recommendations, setRecommendations] = useState([])
    const [trendingTvshowToday, setTrendingTvShowToday] = useState([])
    const [trendingTvshowWeek, setTrendingTvShowWeek] = useState([])
    // const [loadRecommandations, setLoadRecommandations] = useState(false)
    return (
        <TVContext.Provider value={{
            tvshows, setTVShows,
            selectedTVShow, setSelectedTVShow,
            loading, setLoading,
            loadingMask, setLoadingMask,
            selectedShowVideos, setSelectedShowVideos,
            selectedShowImages, setSelectedShowImages,
            showCast, setCast,
            recommendations, setRecommendations,
            trendingTvshowToday, setTrendingTvShowToday,
            trendingTvshowWeek, setTrendingTvShowWeek,
            page, setPage
        }}>
            {props.children}
        </TVContext.Provider>
    )
}

export default TVShowProvider
