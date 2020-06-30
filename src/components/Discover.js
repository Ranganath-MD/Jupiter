import React, { useContext, useEffect, useState } from 'react'
import FilmContext from '../context/FilmContext'
import axios from '../utils/Axios-config'
import PaginationComponent from '../utils/Pagination';
import MovieCard from "./MovieCard"
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import LoadingSpinner from "../utils/LoadingSpinner"
import Seo from '../layouts/Seo';


const Discover = () => {
    const context = useContext(FilmContext)
    const [totalCount, setTotalCount] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const handlePageChange = (pageNumber) => {
        context.setPage(pageNumber)
    }

    const getAllMovies = () => {
        const page = context.page
        axios.get("/discover/movie", {
            params: { page }
        })
            .then(response => {
                context.setMovies(response.data.results)
                setTotalCount(response.data.total_pages)
                setLoaded(true)
                context.setLoadingMask(false)
            })
            .catch(err => console.log(err))
    }



    useEffect(() => {
        getAllMovies()
    }, [context.page])

    return (
        <MDBContainer>
            <Seo
                title="Discover Movies"
                description="Find your favourite movies and give thumbs up"
            />
            <p className="heading">Browse More, find More </p>
            <div className="loading-spinner">
                <LoadingSpinner loading={loaded}/>
            </div>
            <MDBRow>
                    {context.movies.map((movie, i) => {
                        return (
                            <MDBCol size="12" sm="12" md="12" lg="6" key={movie.id}>
                                <MovieCard
                                    movie={movie}
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

export default Discover
