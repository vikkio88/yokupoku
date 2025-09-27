// Update with your config settings.

module.exports = {

  development: {
    client: 'better-sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './db/data/dev.sqlite3'
    },
    migrations: {
      directory: 'db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: 'db/seeds'
    }
  },

  staging: {
    client: 'better-sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './db/data/dev.sqlite3'
    },
    migrations: {
      directory: 'db/migrations',
      tableName: 'migrations'
    }
  },

  production: {
    client: 'better-sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './db/data/dev.sqlite3'
    },
    migrations: {
      directory: 'db/migrations',
      tableName: 'migrations'
    }
  }

};
