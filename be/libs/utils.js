const { ulid } = require('ulid');

const slugify = text => text.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');

const generateId = () => {
    return ulid();
};

const nBoolean = value => value === null ? null : Boolean(value);

const now = () => (new Date()).toUTCString();

// comma separated list
const csl = {
    toString(list) {
        if (Array.isArray(list)) return list.join(',');
        if (typeof list === 'string') {
            const splitted = new Set(this.fromString(list));
            return Array.from(splitted).join(',');
        }
        return '';
    },
    fromString(list) {
        return list.trim()
            .replace(/\s?,\s?/g, ',')
            .split(',');
    }
};
module.exports = {
    generateId,
    csl,
    slugify,
    nBoolean,
    now
};