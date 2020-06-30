import React, {  useContext } from 'react'
import { GuardSpinner  } from "react-spinners-kit";
import FilmContext from '../context/FilmContext';

const LoadingSpinner = () => {
    const context = useContext(FilmContext)
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <GuardSpinner  size={60} color="#686769" loading={context.loadingMask} />
        </div>
    )
}

export default LoadingSpinner