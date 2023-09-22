import axios from "axios";

// const customFetch = axios.create({
//     baseURL: 'http://localhost:3000/api/v1'
// })

const customFetch = axios.create({
    baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit'
})




export default customFetch