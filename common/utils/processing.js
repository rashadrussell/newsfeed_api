const _ = require('underscore');

const sort = (data, orderType) => {
    if (orderType === 'popularity_ASC') {

        return _.sortBy(data, 'popularity');

    } else if (orderType === 'popularity_DESC') {

        return _.sortBy(data, 'popularity').reverse();

    } else if (orderType === 'date_ASC') {

        return data.sort((first, second) => {
            let firstDate = new Date(first.date);
            let secondDate = new Date(second.date);

            return firstDate - secondDate;
        });

    } else if (orderType === 'date_DESC') {

        return data.sort((first, second) => {
            let firstDate = new Date(first.date);
            let secondDate = new Date(second.date);

            return firstDate - secondDate;
        }).reverse();

    }
};


const filter = (data, filterType) => {
    if (filterType === 'all') {

        return sort(data, 'date_DESC');

    } else if (filterType === 'trending') {

        return sort(
            _.filter(data, (item) => item.isTrending),
            'popularity_DESC'
        );

    } else if (filterType === 'open') {

        return _.filter(data, (item) => item.status === 1);

    } else if (filterType === 'completed') {

        return _.filter(data, (item) => item.status === 0);

    }
};


const paginate = (data, limit, offset) => {
    if (offset && !limit) {
        data = data.slice(offset, data.length - 1);
    } else if (offset && limit) {
        data = data.slice(offset, limit+offset);
    } else if (!offset && limit) {
        data = data.slice(0, limit);
    }

    return data;
};


module.exports = {
    sort,
    filter,
    paginate
};
