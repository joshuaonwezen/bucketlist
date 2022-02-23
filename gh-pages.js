var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/joshuaonwezen/tigerpoints.git', // Update to point to your repository  
        user: {
            name: 'Joshua Onwezen', // update to use your name
            email: 'joshua.onwezen@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)