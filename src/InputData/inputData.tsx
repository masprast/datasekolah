import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import style from '../style';

enum TipeSekolah {
  Negeri = 'Negeri',
  Swasta = 'Swasta',
}

export type Sekolah = {
  nama: string;
  tipe: string;
  alamat: string;
  kodepos: number;
  provinsi: string;
  kotakab: string;
  telp: string;
  email: string;
  facebook: string;
  jumlah_siswa: number;
};

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      nama: '',
      tipe: '',
      alamat: '',
      kodepos: 0,
      provinsi: '',
      kotakab: '',
      telp: '',
      email: '',
      facebook: '',
      jumlah_siswa: 0,
    },
  });
  console.log('eror:', errors);

  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const tipe = [
    {label: TipeSekolah.Negeri, value: 'Negeri'},
    {label: TipeSekolah.Swasta, value: 'Swasta'},
  ];

  return (
    <View style={style.container}>
      <View style={style.kotakjudul}>
        <Text style={style.judul}>Data Sekolah:</Text>
      </View>

      <View style={style.kotakitem}>
        <Text style={style.teks}>Tipe Sekolah: *</Text>
        <Controller
          control={control}
          name="tipe"
          render={({field: {onChange, value}}) => (
            <DropDownPicker
              style={style.dropdown}
              placeholder="Pilih tipe"
              open={menuTerbuka}
              setOpen={() => setMenuTerbuka(!menuTerbuka)}
              items={tipe}
              value={value}
              setValue={item => onChange(item(value))}
            />
          )}
          rules={{required: {value: true, message: 'Pilih salah satu'}}}
        />
        {errors.tipe?.message ? (
          <Text style={style.tekseror}>{errors.tipe?.message}</Text>
        ) : null}

        <Text style={style.teks}>Nama Sekolah: *</Text>
        <Controller
          control={control}
          name="nama"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={style.boxteks}
              placeholder="Contoh: SMK Negeri 1 Bandung (untuk negeri)"
              placeholderTextColor={'grey'}
              onChangeText={v => onChange(v)}
              defaultValue={value}
            />
          )}
          rules={{required: {value: true, message: 'Wajib diisi'}}}
        />
        {errors.nama?.message ? (
          <Text style={style.tekseror}>{errors.nama?.message}</Text>
        ) : null}

        <Text style={style.teks}>Alamat: *</Text>
        <Controller
          control={control}
          name="alamat"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={style.boxteks}
              defaultValue={value}
              onChangeText={v => onChange(v)}
            />
          )}
          rules={{required: {value: true, message: 'Wajib diisi'}}}
        />
        {errors.alamat?.message ? (
          <Text style={style.tekseror}>{errors.alamat?.message}</Text>
        ) : null}

        <Text style={style.teks}>Email Sekolah: *</Text>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={style.boxteks}
              keyboardType="email-address"
              defaultValue={value}
              onChangeText={v => onChange(v)}
            />
          )}
          rules={{
            required: {value: true, message: 'Wajib diisi'},
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Masukkan email dengan benar',
            },
          }}
        />
        {errors.email?.message ? (
          <Text style={style.tekseror}>{errors.email?.message}</Text>
        ) : null}

        <Text style={style.teks}>No Telp Sekolah: *</Text>
        <Controller
          control={control}
          name="telp"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={style.boxteks}
              defaultValue={value}
              onChangeText={v => onChange(v)}
            />
          )}
          rules={{
            required: {value: true, message: 'Wajib diisi'},
            pattern: {
              value: /^[\d() -]{9,13}$/i,
              message: 'Masukkan format no telp dengan benar',
            },
          }}
        />
        {errors.telp?.message ? (
          <Text style={style.tekseror}>{errors.telp?.message}</Text>
        ) : null}

        <Text style={style.teks}>Facebook:</Text>
        <Controller
          control={control}
          name="facebook"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={style.boxteks}
              defaultValue={value}
              onChangeText={v => onChange(v)}
            />
          )}
        />
        <Text style={style.teks}>Jumlah Siswa: *</Text>
        <Controller
          control={control}
          name="jumlah_siswa"
          render={({field: {onChange}}) => (
            <TextInput
              style={style.boxteks}
              inputMode="numeric"
              keyboardType="numeric"
              onChangeText={v => onChange(v)}
            />
          )}
          rules={{
            required: {value: true, message: 'Wajib diisi'},
            pattern: /^[0-9]$/,
            min: {value: 1, message: 'Min: 1'},
            max: {value: 100, message: 'Max: 100'},
          }}
        />
        {errors.jumlah_siswa?.message ? (
          <Text style={style.tekseror}>{errors.jumlah_siswa?.message}</Text>
        ) : null}

        <View>
          <TouchableOpacity
            style={style.button}
            onPress={handleSubmit(data =>
              Alert.alert('Data Sekolah:', JSON.stringify(data)),
            )}>
            <Text style={style.teksbutton}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Form;
