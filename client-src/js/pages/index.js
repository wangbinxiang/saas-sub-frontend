if (module.hot) {
    module.hot.accept()
}

import 'foundation-sites'
require.ensure([], function(require) {
    let masonry = require('../../../client/js/vendors/masonry.pkgd.min')
    let contacts = require('../../../client/js/vendors/dropzone')
})



$(document).foundation();