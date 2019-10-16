// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/mission_control.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    },
  },

  production: {
    client: 'pg',
    connection:
    {
      port: process.env.RDS_PORT,
      host: process.env.RDS_HOSTNAME,
      database: process.env.RDS_DB_NAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
    },
    "pool": {
      "min":0,
      "max":10,
      "propagateCreateError": false // <- default is true, set to false
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
    }

};
