import React, { useEffect, useState } from 'react'
import axios from '../utils/Axios-config'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer, MDBCardImage } from "mdbreact";

const SearchResults = () => {
    const [value, setValue] = useState(0)
    const [results, setResults] = useState([])
    const [result1, setResult1] = useState([])
    const [result2, setResult2] = useState([])
    const [result3, setResult3] = useState([])
    const [result4, setResult4] = useState([])

    useEffect(() => {
        const query = localStorage.getItem("query")
        axios.get(`/search/movie?query=${query}`)
            .then(response => {
                setResults(response.data.results)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleSort = (e) => {
        setValue(e.target.value)
        if (e.target.value == 1) {
            const result1 = results.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
            setResult1(result1)
        }
        else if (e.target.value == 2) {
            const result2 = results.sort((a, b) => parseFloat(a.popularity) - parseFloat(b.popularity));
            setResult2(result2)
        }
        else if (e.target.value == 3) {
            const result3 = results.sort((a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count));
            setResult3(result3)
        } else if (e.target.value == 4){
            const result4 = results.sort((a, b) => parseFloat(a.vote_count) - parseFloat(b.vote_count));
            setResult4(result4)
        }
    }

    const search_results = value === 1 ? result1 : value === 2 ? result2 : value === 3 ? result3 : value === 4 ? result4 : results
    return (
        <div>
            <MDBContainer style={{ position: "relative", marginTop: "30px" }}>
                <div style={{ display: "flex"}}>
                    <h2 className="subtitle">Search Results</h2>
                    <div className="sort">
                        <select className="browser-default custom-select" onChange={handleSort}>
                            <option>Sort</option>
                            <option value="1">Highest popularity</option>
                            <option value="2">Lowest popularity</option>
                            <option value="3">Highest votes</option>
                            <option value="4">Lowest votes</option>
                        </select>
                    </div>
                </div>
                <MDBRow>
                    <MDBCol xs="12" sm="12" md="12">
                        <MDBRow>
                            {}
                            {search_results.map(result => {
                                return (
                                    <MDBCol xs="12" sm="6" md="3" className="col1" key={result.id}>
                                        <MDBCard cascade>
                                            <div className="image_container">
                                            <MDBCardImage
                                                // className='img-fluid'
                                                style={{ maxWidth: "100%"}}
                                                overlay="white-light"
                                                hover
                                                src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                                            />
                                            </div>
                                            <MDBCardBody cascade>
                                                <MDBCardTitle className="title_result">{result.title}</MDBCardTitle>
                                                <hr />
                                                <MDBCardText>
                                                    {result.release_date}
                                                </MDBCardText>
                                        </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                )
                            })}
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default SearchResults
