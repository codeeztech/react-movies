import { genreDTO } from './genres.model';
import { urlGenres } from '../endpoints';
import IndexEntity from '../utils/IndexEntity';

export default function IndexGenres() {

    return (
        <>
            <IndexEntity<genreDTO>
                url={urlGenres} urlCreate="genres/create" title="Genres"
                entityName="Genre"
            >
                {(genres, buttons) =>
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres?.map(genre =>
                                <tr key={genre.id}>
                                    <td>
                                        {buttons(`genres/edit/${genre.id}`, genre.id)}
                                    </td>
                                    <td>
                                        {genre.name}
                                    </td>
                                </tr>)}
                        </tbody>
                    </>}

            </IndexEntity>
        </>
    )
}

/*
export default function IndexGenres() {

    const [genres, setGenre] = useState<genreDTO[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    var history = useHistory();

    useEffect(() => {
        loadData();
    }, [page, recordsPerPage]);

    function loadData(){
        axios.get(urlGenres, { params: { page, recordsPerPage } }).then((response: AxiosResponse<genreDTO[]>) => {
          
            const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);
           
            setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
            
            setGenre(response.data);

        }).then((error) => {
            // console.log(error)
        });
    }
//npm i sweetalert2@10.16.0
    async function deleteGenre(id:any) {
        try {
            await axios.delete(`${urlGenres}/${id}`);
            loadData();
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
                                    <Button className='btn btn-danger' onClick={() => customConfirm(() => {deleteGenre(genre.id)})}>Delete</Button>
                                </td>
                                <td>{genre.name}</td>
                            </tr>)}
                    </tbody>
                </table>
            </GenericList>
        </>
    )
}


*/