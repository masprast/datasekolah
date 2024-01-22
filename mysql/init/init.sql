CREATE ROLE 'adminer' @'localhost';
USE sekolah;
CREATE TABLE IF NOT EXISTS data_sekolah (
    id int not null auto_increment,
    tipe enum("Negeri", "Swasta"),
    nama_sekolah varchar(255),
    alamat varchar(255),
    kodepos char(5),
    provinsi varchar(255),
    kota_kab varchar(255),
    telp char(25),
    email varchar(255),
    facebook varchar(255),
    jml_siswa int(3),
    primary key (id)
);
GRANT ALL PRIVILEGES ON data_sekolah TO 'adminer' @'localhost' IDENTIFIED BY 'adminer';
FLUSH PRIVILEGES;