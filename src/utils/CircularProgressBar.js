import React from 'react'
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../styles/MovieShow.css"

const CircularProgressBar = ({ value }) => {
    return (
        <CircularProgressbar
            value={value}
            maxValue={10}
            strokeWidth={13}
            text={`${value * 10}%`}
            styles={buildStyles({
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                pathColor: "green",
                textSize: '25px',
                pathTransitionDuration: 0.5,
                textColor: 'white',
            })}
        />
    )
}

export default CircularProgressBar
