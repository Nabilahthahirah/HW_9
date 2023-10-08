# Tugas Homework 9

Pada homework kali ini teman-teman akan membuat RESTful API yang mengimplementasikan authentication dan authorization. Setelah itu teman-teman perlu membuat dokumentasi API menggunakan swagger dan mengaplikasikan logging server pada Express.

Buatlah sebuah aplikasi Express JS berdasarkan data SQL yang didapatkan dari sampel data [ini]([https://github.com/fathy17/rakamin-expressjs/blob/master/dvdrental.tar](https://github.com/fathy17/dokumen-pembanding-2/blob/master/movies-database.sql)).

## Setup
To run this project, install it locally using npm:
```
$ npm install express
$ npm install --save pg
$ npm i bcrypt
$ npm i cors
$ npm i dotenv
$ npm i jsonwebtoken
$ npm i morgan
$ npm i swagger-ui-express
```

#Soal-1: Buatlah RESTful API yang terdiri dari GET, POST, DELETE, dan PUT. Setelah itu buatlah 
endpoint untuk register user dan login user untuk implementasi authorization dan 
authentication. Pastikan yang hanya bisa mengakses API hanyalah user yang terdaftar.

#Soal-2: Lakukan Pagination pada GET users dan GET movies dengan limit 10 user.

#Soal-3: Buatlah dokumentasi API menggunakan swagger

#Soal-4: Implementasikan Logging server pada aplikasi yang teman-teman buat

