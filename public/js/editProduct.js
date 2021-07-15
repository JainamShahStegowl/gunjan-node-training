$(document).ready(function () {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    $('#editForm').submit(function (e) {
        e.preventDefault();

        let formData = $('#editForm').serializeArray();
        let id = $('#id').val();
        console.log(id)
        let data = {};

        formData.forEach(({ name, value }) => {
            data[name] = value;
        });

        $.ajax({
            type: "put",
            url: "/products/" + id,
            data: { ...data },
            dataType: "json",
            success: function (response) {
                if (response.success === true) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Product updated successfully'
                    }).then(() => {
                        window.location.href = '/products/list';
                    })
                }
            }
        });
    })
});