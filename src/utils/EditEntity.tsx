import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from "react";
import { ReactElement } from 'react-markdown';
import { useHistory, useParams } from "react-router-dom";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from '../utils/Loading';


export default function EditEntity<TCreation, TRead>(props: editEntityProps<TCreation, TRead>) {
    const { id }: any = useParams();
    const [entity, setEntity] = useState<TCreation>();
    const [errors, setErrors] = useState<string[]>([]);
    var history = useHistory();

    useEffect(() => {

        axios.get(`${props.url}/${id}`).then((response: AxiosResponse<TRead>) => {
            setEntity(props.transform(response.data));
        });

    }, [id]);

    async function edit(EntityToEdit: TCreation) {
        try {
            await axios.put(`${props.url}/${id}`, EntityToEdit);
            history.push(props.indexURL);
        } catch (error) {
            if (error && error.response)
                setErrors(error.response.data);
        }
    }

    return (
        <>
            <h3>Edit {props.entityName}</h3>

            <DisplayErrors errors={errors}></DisplayErrors>

            {
                entity ? props.children(entity, edit) : <Loading></Loading>
            }
        </>
    )
}

interface editEntityProps<TCreation, TRead> {
    url: string
    entityName: string
    indexURL : string
    transform: (entity: TRead) => TCreation
    children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
    transform: (entity: any) => entity
}