import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {fetchProvinsi, fetchKotaKab} from './wilayahHelper';
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

  const [bukaTipe, setBukaTipe] = useState(false);
  const [bukaProvinsi, setBukaProvinsi] = useState(false);
  const [provinsi, setProvinsi] = useState('0');
  const [bukaKotaKab, setBukaKotaKab] = useState(false);
  const [disKotaKab, setDisKotaKab] = useState(true);
  const tipe = [
    {label: TipeSekolah.Negeri, value: 'Negeri'},
    {label: TipeSekolah.Swasta, value: 'Swasta'},
  ];

  const [daftarProvinsi, setDaftarProvinsi] = useState<
    {key: string; label: string; value: string}[]
  >([]);
  const [daftarKotaKab, setDaftarKotaKab] = useState<
    {key: string; label: string; value: string}[]
  >([]);

  function isiDaftarProvinsi() {
    fetchProvinsi().then(d =>
      setDaftarProvinsi(
        d.map(m => ({key: m.kode, label: m.nama, value: m.nama})),
      ),
    );
    setBukaProvinsi(true);
    console.log('daftarProvinsi', daftarProvinsi);
  }
  function isiDaftarKotaKab(id: string) {
    fetchKotaKab(id).then(d =>
      setDaftarKotaKab(
        d.map(m => ({key: m.kode, label: m.nama, value: m.nama})),
      ),
    );
    setBukaKotaKab(true);
    console.log('daftarKotaKab', daftarKotaKab);
  }
  // const [daftarKotaKab, setDaftarKotaKab] = useState<KotaKab[]>();
  // const [kotakab, setKotakab] = useState<KotaKab>();

  return (
    <View style={style.container}>
      <View style={style.kotakjudul}>
        <Text style={style.judul}>Data Sekolah:</Text>
      </View>
      {/* tipe sekolah */}
      <View style={style.kotakitem}>
        <Text style={style.teks}>Tipe Sekolah: *</Text>
        <Controller
          control={control}
          name="tipe"
          render={({field: {onChange, value}}) => (
            <DropDownPicker
              style={style.dropdown}
              dropDownContainerStyle={style.dropdownContainer}
              placeholder="Pilih tipe"
              open={bukaTipe}
              listMode="SCROLLVIEW"
              setOpen={() => setBukaTipe(!bukaTipe)}
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

        {/* nama sekolah */}
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

        {/* alamat sekolah */}
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

        {/* kode pos sekolah */}
        <Text style={style.teks}>Kode Pos: *</Text>
        <Controller
          control={control}
          name="kodepos"
          render={({field: {onChange}}) => (
            <TextInput
              style={style.boxteks}
              keyboardType="numeric"
              onChangeText={v => onChange(v)}
            />
          )}
          rules={{
            required: {value: true, message: 'Wajib diisi'},
            min: {value: 1, message: 'Wajib diisi'},
            maxLength: {value: 5, message: 'Masukkan kode pos dengan benar'},
          }}
        />
        {errors.kodepos?.message ? (
          <Text style={style.tekseror}>{errors.kodepos?.message}</Text>
        ) : null}

        {/* provinsi */}
        <Text style={style.teks}>Provinsi: *</Text>
        <Controller
          control={control}
          name="provinsi"
          render={({field: {onChange, value}}) => (
            <DropDownPicker
              style={style.dropdown}
              dropDownContainerStyle={style.dropdownContainer}
              placeholder="Pilih Provinsi"
              loading={bukaProvinsi}
              listMode="SCROLLVIEW"
              open={bukaProvinsi}
              setOpen={() => setBukaProvinsi(!bukaProvinsi)}
              onOpen={() => {
                isiDaftarProvinsi();
                daftarProvinsi.length > 1 ? bukaProvinsi : !bukaProvinsi;
              }}
              setItems={setDaftarProvinsi}
              items={daftarProvinsi}
              value={value}
              setValue={item => {
                onChange(item(value));
              }}
              onChangeValue={v => {
                const id = daftarProvinsi.find(d => d.label === v)?.key ?? '';
                console.log(id);
                setProvinsi(id);
                setDisKotaKab(false);
              }}
            />
          )}
          rules={{required: {value: true, message: 'Pilih provinsi'}}}
        />
        {errors.tipe?.message ? (
          <Text style={style.tekseror}>{errors.tipe?.message}</Text>
        ) : null}

        {/* kota/kabupaten */}
        <Text style={style.teks}>Kota/Kabupaten: *</Text>
        <Controller
          control={control}
          name="kotakab"
          render={({field: {onChange, value}}) => (
            <DropDownPicker
              style={style.dropdown}
              dropDownContainerStyle={style.dropdownContainer}
              placeholder="Pilih kota/kabupaten"
              loading={bukaKotaKab}
              disabled={disKotaKab}
              disabledStyle={style.dropdownDisabled}
              open={bukaKotaKab}
              listMode="SCROLLVIEW"
              setOpen={() => setBukaKotaKab(!bukaKotaKab)}
              onOpen={() => {
                isiDaftarKotaKab(provinsi);
                daftarKotaKab.length > 1 ? bukaKotaKab : !bukaKotaKab;
              }}
              setItems={setDaftarKotaKab}
              items={daftarKotaKab}
              value={value}
              setValue={item => onChange(item(value))}
              zIndex={999}
            />
          )}
          rules={{required: {value: true, message: 'Pilih kota/kabupaten'}}}
        />
        {errors.tipe?.message ? (
          <Text style={style.tekseror}>{errors.tipe?.message}</Text>
        ) : null}

        {/* email sekolah */}
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

        {/* telp sekolah */}
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

        {/* facebook sekolah */}
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

        {/* jumlah siswa */}
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

        {/* tombol submit */}
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
