Vue.filter('humanreadable', function (value) {
    if (!value) return '';
    return moment(value).format('DD.MM.YYYY');
});

Vue.filter( 'diffforhumans', function (value) {
    if (_.isEmpty(value)) return ''
    let today = moment()
    let date = moment(value)
    if (date.diff(today, 'days') < 7)
    {
        return moment(value).format('LLLL')
    }
    return moment(value).fromNow()
});
