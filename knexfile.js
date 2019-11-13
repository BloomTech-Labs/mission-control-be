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
    client: 'pg',
    connection: 'postgres://gfvzzgyj:78FzbowHwHwYcOi_bQDY_p0117R8RQ5p@salt.db.elephantsql.com:5432/gfvzzgyj',
    useNullAsDefault: true,
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
