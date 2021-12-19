const devices = require('../data/devices.json');
const { TABLES } = require('yokupoku-shared/enums/db');
const { generateId } = require('../../libs/utils');



exports.seed = async (knex) => {
    return knex(TABLES.DEVICES).del()
        .then(async () => {
            return await knex(TABLES.DEVICES)
                .insert(devices.map(d => ({ ...d, id: generateId(), meta: JSON.stringify(d.meta) })));
        });
};