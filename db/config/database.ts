import { config } from 'dotenv';
import { Dialect } from 'sequelize';
config();
interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

const dbConfig: Record<'development' | 'production' | 'test', DatabaseConfig> = {
  "development": {
    "username": "root",
    "password": "Root@123",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": '',
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": '',
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
export default {
  ...dbConfig
}
