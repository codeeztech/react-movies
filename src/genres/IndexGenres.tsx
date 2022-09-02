import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { genreDTO } from './genres.model';
import { urlGenres } from '../endpoints';
import Button from '../utils/Button';
import GenericList from '../utils/GenericList';
import Pagination from '../utils/Pagination';
import RecordsPerPageSelect from '../utils/RecordsPerPageSelect';
import DisplayErrors from "../utils/DisplayErrors";

export default function IndexGenres() {

    const [genres, setGenre] = useState<genreDTO[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordPerPage] = useState(2);
    const [page, setPage] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    var history = useHistory();
    useEffect(() => {
        axios.get(urlGenres, { params: { page, recordsPerPage } }).then((response: AxiosResponse<genreDTO[]>) => {
          
            const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);
           
            setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
            
            setGenre(response.data);

        }).then((error) => {
            // console.log(error)
        });
    }, [page, recordsPerPage]);


    async function deleteGenre(id:any) {
        try {
            await axios.delete(`${urlGenres}/${id}`);
            history.push('/genres');
        } catch (error) {
            if (error && error.response)
                setErrors(error.response.data);
        }

    }

    return (
        <>
            <h3>Genres</h3>
            <Link className="btn btn-primary" to="/genres/create">Create genre</Link>

            <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages} onChange={newPage => setPage(newPage)}></Pagination>
            <RecordsPerPageSelect onChange={amountOfRecord=>{
                setPage(1);
                setRecordPerPage(amountOfRecord);
            }}></RecordsPerPageSelect>

            <DisplayErrors errors={errors}></DisplayErrors>

            <GenericList list={genres}>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Movie Type</th>
                        </tr>

                    </thead>
                    <tbody>
                        {genres?.map(genre =>
                            <tr key={genre.id}>
                                <td>
                                    <Link className='btn btn-success' to={`/genres/edit/${genre.id}`}>Edit</Link>
                                    <Button className='btn btn-danger' onClick={() => deleteGenre(genre.id)}>Delete</Button>
                                </td>
                                <td>{genre.name}</td>
                            </tr>)}
                    </tbody>
                </table>
            </GenericList>
        </>
    )
}


