// GET https://api.cahyadsn.com/provinces
// GET https://api.cahyadsn.com/regencies/{id_province}

import axios from 'axios';

interface Provinsi {
  kode: string;
  nama: string;
}

interface KotaKab {
  kode: string;
  nama: string;
}

async function fetchProvinsi(): Promise<Provinsi[]> {
  const respon = await axios.get('https://api.cahyadsn.com/provinces');
  const data = respon.data.data;
  return data;
}

async function fetchKotaKab(id: string): Promise<KotaKab[]> {
  const respon = await axios.get('https://api.cahyadsn.com/regencies/' + id);
  const data = respon.data.data;
  return data;
}

// const DaftarProvinsi = () => {
//   const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
//   console.log('jancok');
//   useEffect(() => {
//     fetchProvinsi()
//       .then(data => setProvinsi(data))
//       .catch(e => {
//         console.log(e.message);
//         throw e;
//       });
//   }, []);
//   console.log('provinsi', provinsi);

//   //   return provinsi.map(m => ({kode: m.kode, nama: m.nama}));
//   return provinsi;
// };

// const DaftarKotaKab = (id: string) => {
//   const [kotakab, setKotakab] = useState<KotaKab[]>([]);
//   useEffect(() => {
//     fetchKotaKab(id).then(data => setKotakab(data));
//   }, [id]);
//   //   return kotakab.map(m => ({kode: m.kode, nama: m.nama}));
//   return kotakab;
// };

export type {Provinsi, KotaKab};
export {fetchProvinsi, fetchKotaKab};
