import React, { useContext, useEffect, useState } from 'react'
import FilmContext from "../context/FilmContext"
import TVContext from '../context/TVShowContext'
import axios from '../utils/Axios-config'
import PaginationComponent from '../utils/Pagination';
import TVShowCard from "./TVShowCard"
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import LoadingSpinner from "../utils/LoadingSpinner"
import Seo from '../layouts/Seo';

const TVShows = () => {
    const tvcontext = useContext(TVContext)
    const context = useContext(FilmContext)
    const [totalCount, setTotalCount] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const handlePageChange = (pageNumber) => {
        tvcontext.setPage(pageNumber)
    }

    const getAllTVShows = () => {
        const page = tvcontext.page
        axios.get("/discover/tv", {
            params: { page }
        })
            .then(response => {
                tvcontext.setTVShows(response.data.results)
                setTotalCount(response.data.total_pages)
                setLoaded(true)
                context.setLoadingMask(false)
            })
            .catch(err => console.log(err))
    }



    useEffect(() => {
        getAllTVShows()
    }, [tvcontext.page])

    return (
        <MDBContainer>
            <Seo
                title="Discover TV-Shows"
                description="Find your favourite tv shows and give thumbs up"
            />
            <p className="heading">Browse TV Shows </p>
            <div className="loading-spinner">
                <LoadingSpinner loading={loaded} />
            </div>
            <MDBRow>
                {tvcontext.tvshows.map((tv, i) => {
                    return (
                        <MDBCol size="12" sm="12" md="12" lg="6" key={tv.id}>
                            <TVShowCard
                                tvshows={tv}
                                loaded={loaded}
                            />
                        </MDBCol>
                    )
                })}
            </MDBRow>
            <PaginationComponent
                page={context.page}
                totalCount={totalCount}
                handlePageChange={handlePageChange}
            />
        </MDBContainer>
    )
}

export default TVShows
