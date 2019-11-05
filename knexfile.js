// Update with your config settings.

const pgSettings = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB_NAME,
};

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
      filename: './data/mission-contol-test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    }
  },
  
  staging: {
    client: 'postgresql',
    connection:pgSettings ,
    "pool": {
      "min":0,
      "max":10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
    },

  production: {
    client: 'postgresql',
    connection:pgSettings ,
    "pool": {
      "min":0,
      "max":10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
    }

};
