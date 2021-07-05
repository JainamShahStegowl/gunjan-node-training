$(document).ready(function () {
    $('.delete-btn').on('click', function (e) {
        
        let id = $(this).data('id');

        $.ajax({
            type: "delete",
            url: "/products/" + id,
            success: function (response) {
                if (response.success === true) {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            ).then(() => {
                                window.location.reload();
                            })
                        }

                    })
                }
            }
        });
    })
});
