import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {useEffect} from 'react'
import { Link } from "react-router-dom";
import { genreDTO } from './genres.model';

export default function IndexGenres(){

useEffect(() =>{
axios.get(`https://localhost:7212/api/Genre`).then((response : AxiosResponse<genreDTO[]>)=>{
    console.log(response.data)
}).then((error) =>{
    console.log(error)
});

});

    return (
        <>
            <h3>Genres</h3>
            <Link className="btn btn-primary" to="/genres/create">Create genre</Link>
        </>
    )
}