import { ReactElement, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Link, useHistory } from "react-router-dom";
import Button from "./Button";
import customConfirm from "./confirmAlert";
import DisplayErrors from "./DisplayErrors";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";

export default function IndexEntity<T>(props: indexEntityProps<T>) {

    const [entities, setEntities] = useState<T[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    var history = useHistory();

    useEffect(() => {
        loadData();
    }, [page, recordsPerPage]);

    function loadData() {
        axios.get(props.url, { params: { page, recordsPerPage } }).then((response: AxiosResponse<T[]>) => {

            const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);

            setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));

            setEntities(response.data);

        }).then((error) => {
            // console.log(error)
        });
    }

    //npm i sweetalert2@10.16.0
    async function deleteEntity(id: any) {
        try {
            await axios.delete(`${props.url}/${id}`);
            loadData();
        } catch (error) {
            if (error && error.response)
                setErrors(error.response.data);
        }

    }

    const buttons = (editUrl: string, id: number) =>
        <>
            <Link className='btn btn-success' to={editUrl}>Edit</Link>
            <Button className='btn btn-danger' onClick={() => customConfirm(() => { deleteEntity(id); })}>Delete</Button>
        </>



    return (
        <>
            <h3>{props.title}</h3>
            <Link className="btn btn-primary" to={props.urlCreate}>Create {props.entityName}</Link>

            <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages} onChange={newPage => setPage(newPage)}></Pagination>
            <RecordsPerPageSelect onChange={amountOfRecord => {
                setPage(1);
                setRecordPerPage(amountOfRecord);
            }}></RecordsPerPageSelect>

            <DisplayErrors errors={errors}></DisplayErrors>

            <GenericList list={entities}>
                <table className='table table-striped'>
                    {props.children(entities!, buttons)}
                </table>
            </GenericList>

        </>
    )
}

interface indexEntityProps<T> {
    url: string;
    entityName: string;
    title: string;
    urlCreate: string;
    children(entities: T[],
        buttons: (editUrl: string, id: number) => ReactElement): ReactElement;
}
