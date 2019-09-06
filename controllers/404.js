exports.get404 = (req, res) => {
    const date = new Date(),
        year = date.getFullYear();

    res.status(404).render('404.pug', 
    {
        page: {
            title: 'Not Found!',
            socials: {
                fb: {
                    icon: 'fab fa-facebook-f'
                }
            },
            footer: {
                widgets: null,
                copyright: `Copyright SHOP.JS ${year}`
            }
        }
    });
}