import mysql from 'mysql2';
import env from './env';

const koneksi = mysql.createConnection({
  host: env.host,
  user: env.user,
  password: env.pass,
  database: env.db,
});

// koneksi.connect(e => {
//   if (e) {
//     console.error('Error konek ke MySQL: ' + e.stack);
//     return;
//   }

//   console.log('Konek ke MySQL dengan ID ' + koneksi.threadId);
// });

export default koneksi;
