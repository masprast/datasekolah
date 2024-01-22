import {useEffect} from 'react';
import axios from 'axios';
import {Alert} from 'react-native';
import {Sekolah} from '../InputData/inputData';

const SimpanData = (sekolah: Sekolah) => {
  useEffect(() => {
    axios.post('/sekolah', sekolah).then(d => {
      Alert.alert('Data Sekolah: ', JSON.stringify(d.statusText));
    });
  });
};

export default SimpanData;
