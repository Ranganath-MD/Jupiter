import Axios from "axios";

const axios = Axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2VmODA2MThlZDRjYmY3Mjg1Mjc2ZDhlYjUyOGJiZiIsInN1YiI6IjVlNTFmN2E4MzU4MTFkMDAxNTU1ZGFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HZYLBhnktFHWvaED-0FIcxxySx7LgSqoXZKICljMk4c`,
        "Content-Type": "application/json;charset=utf-8"
    }
})

export default axios