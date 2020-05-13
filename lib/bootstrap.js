import Tippy from 'vue-tippy';

Vue.use(Tippy, {
    arrow: true,
    theme: 'translucent'
});

Vue.mixin(require('./trans'));

require('./form');
require('./errors');
require('./filters/date');
require('./filters/utils');
require('./directives');

if ('GpHttp' in window) {
    $.extend(GpHttp, require('./http'));
}
