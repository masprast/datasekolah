import mysql from 'mysql2';
import env from './env';

export default mysql.createPool({
  host: env.host,
  user: env.user,
  password: env.pass,
  database: env.db,
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0,
});
