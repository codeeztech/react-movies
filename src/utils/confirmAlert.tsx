import Swal from "sweetalert2";

export default function customConfirm(
    onConfirm: any,
    title: string = "Are you sure you want to delete?",
    
) {
    Swal.fire({
        title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText:'Delete'
    }).then(result => {
        if (result.isConfirmed) {
            onConfirm();
        }
    })
}

