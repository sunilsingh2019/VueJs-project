import Master from './layout/master';
import Header from './common/header';
import Breadcrumb from './common/breadcrumb';
import Footer from './common/footer';

import CounterSideBar from '../counter/common/sidebar'

Vue.component('master', Master);
Vue.component('app-header', Header);
Vue.component('app-breadcrumb', Breadcrumb);
Vue.component('app-footer', Footer);

Vue.component('counter-sidebar', CounterSideBar);
