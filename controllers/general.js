module.exports = (req,res,next) => {
    const date = new Date(),
        year = date.getFullYear();

    res.send(
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

    next();
}