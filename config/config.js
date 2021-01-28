module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "fitness",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "fitness",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
