const middleware = {}

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['redirectToLogin'] = require('../middleware/redirectToLogin.js')
middleware['redirectToLogin'] = middleware['redirectToLogin'].default || middleware['redirectToLogin']

export default middleware
