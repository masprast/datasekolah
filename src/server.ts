import express from 'express';
import koneksi from './dbhelper/koneksi';

const app = express();
const router = express.Router();

koneksi.connect(e => {
  if (e) {
    console.error('Error konek ke MySQL: ' + e.stack);
    return;
  }

  console.log('Konek ke MySQL dengan ID ' + koneksi.threadId);
});

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

router.post('/sekolah', (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => {
  console.log('server express: on');
});
