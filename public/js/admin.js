/*
███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
█████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
*/

const deleteProduct = (ev) => {
    const controls = ev.target.parentNode;
    const productID = controls.querySelector('[name=productID]').value;
    const csrf = controls.querySelector('[name=_csrf]').value;

    fetch(`/admin/delete-product/${productID}`, {
            method: 'DELETE',
            headers: {
                'csrf-token': csrf
            }
        })
        .then( result => {
            console.log('result')
        })
        .catch( err => console.log(err));
}


/*
██╗     ██╗███████╗████████╗███████╗███╗   ██╗███████╗██████╗ ███████╗
██║     ██║██╔════╝╚══██╔══╝██╔════╝████╗  ██║██╔════╝██╔══██╗██╔════╝
██║     ██║███████╗   ██║   █████╗  ██╔██╗ ██║█████╗  ██████╔╝███████╗
██║     ██║╚════██║   ██║   ██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗╚════██║
███████╗██║███████║   ██║   ███████╗██║ ╚████║███████╗██║  ██║███████║
╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚══════╝
*/                                                                      

document.querySelectorAll('.products--admin__list #deleteProduct')
    .forEach(el => el.addEventListener('click', deleteProduct));