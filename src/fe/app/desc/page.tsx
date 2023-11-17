"use client";

import ParticlesContainer from "@/components/particles-container";
import Transition from "@/components/transition";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const DescPage = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div key="desc" className="absolute h-full">
        <Transition />
      </motion.div>
      <div className="flex flex-col min-w-screen justify-center items-center mt-3">
        <h1 className="font-sora text-[70px] md:text-[80px] font-bold tracking-tight w-full bg-clip-text text-center text-transparent bg-gradient-to-tr  from-[#b3c8ff] via-[#467cff] to-[#0048ff] ">
          Description
        </h1>
        <div className="w-full font-spline text-sm md:text-base text-white rounded-lg min-h-[400px] md:px-10 px-0">
          <p>
            djiajde ea eakifeljsmceicjiejfiajdaidjjdejdeidjejei dijdalasdei
            jijsdalem ansdejsdeiskmd eiajsdji asdkelia sld i die a ksjdf iO
            oejfJi ej
          </p>
        </div>
        <div
          id="how"
          className="relative min-h-[1200px] sm:min-h-[1000px] lg:min-h-[800px] w-full"
        >
          <div className="absolute pb-20 top-0 bottom-0 w-screen flex flex-col justify-center items-center -left-[20px] phone:-left-[40px] sm:-left-[80px] lg:-left-[146px]  bg-gradient-to-br from-[#000B18] to-[#4C2C96] z-[10] pt-[30px]">
            <div className="w-screen text-center">
              <h2 className="font-sora text-[50px] md:text-[60px] font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-tr  from-[#b3c8ff] via-[#467cff] to-[#0048ff]">
                  How
                </span>{" "}
                To Use
              </h2>
            </div>
            <div className="max-w-[75%]  lg:max-w-[900px] flex flex-col justify-center items-center">
              <ul className="list-disc text-justify">
                <li>
                  <p className="font=spline text-sm md:text-base text-white">
                    Masuk kedalam halaman search baik default ataupun camera
                    tergantung dari Anda mau menggunakan fitur yang mana.
                  </p>
                </li>
                <li>
                  <p className="font=spline text-sm md:text-base text-white">
                    Upload dataset sebagai dasar untuk pencarian foto/gambar.
                    Untuk dataset ada beberapa pilihan, Anda bisa memilih untuk
                    mengupload dataset dalam bentuk zip, folder, maupun file.
                    Selain itu kami juga menyediakan fitur image scrapping untuk
                    pencarian dataset sehingga Anda tidak perlu mengupload
                    manual sebuah dataset. Untuk image scrapping sendiri Anda
                    bisa memilih dua pilihan yaitu memasukan url sebuah website
                    yang mau discrapping foto/gambar di dalamnya atau memasukkan
                    sebuah kata kunci dari sebuah foto/gambar. Jika memilih
                    imaga scrapping dengan kata kunci maka nantinya website kami
                    akan mencari dan menscrapping foto atau gambar yang
                    bersesuaian dengan kata kunci yang Anda masukan. Proses
                    upload dataset mungkin akan sedikit lama apalagi jika
                    memilih untuk menggunakan folder atau file karena akan ada
                    proses kompresi menjadi zip terlebih dahulu sebelum proses
                    berlanjut.
                  </p>
                </li>
                <li>
                  <p className="font=spline text-sm md:text-base text-white">
                    Setelah melakukan upload dataset langkah berikutnya hanya
                    tinggal mengupload sebuah foto/gambar lalu Anda hanya perlu
                    memilih mau menggunakan fitur pencarian dengan color atau
                    dengan texture. Setelah memilih hal tersebut Anda hanya
                    tinggal menekan tombol submit dan kemudian website kami akan
                    mencarikan dari dataset foto/gambar yang serupa dengan
                    foto/gambar yang Anda upload.
                  </p>
                </li>
                <li>
                  <p className="font=spline text-sm md:text-base text-white">
                    Jika menggunakan fitur camera, pertama-tama Anda harus
                    memilih mau menggunakan fitur pencarian dengan color atau
                    dengan texture. Kemudian Anda hanya tinggal menekan tombol
                    start camera untuk menyalakan camera lalu setelah itu Anda
                    hanya perlu mengarahkan camera device Anda ke sesuatu hal
                    yang mau Anda cari. Secara otomatis website kami akan
                    melakukan pengambilan gambar setiap 10 detik kemudian hasil
                    dari pengambilan gambar itu akan kami gunakan untuk mencari
                    foto yang serupa yang ada dataset. Jika menggunakan HP Anda
                    juga bisa memilih mau menggunakan camera depan atau belakang
                    hanya dengan menekan tombol switch camera.
                  </p>
                </li>
                <li>
                  <p className="font=spline text-sm md:text-base text-white">
                    Setelah proses pencarian selesai, program kami kemudian akan
                    menampilkan gambar/foto beserta presentase kemiripannya pada
                    bagian bawah page search. Tingkat kemiripan sudah diurutkan
                    dari yang terbesar hingga ke yang terkecil. Foto atau gambar
                    yang kami tampilkan hanyalah foto/gambar dengan tingkat
                    kemiripan diatas 60%. Kami sendiri juga menyediakan opsi
                    jika Anda ingin mendownload foto/gambar tersebut.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-20 flex-col gap-4 z-[600]">
          <h1 className="font-sora text-[50px] md:text-[60px] font-bold tracking-tight w-full bg-clip-text text-center text-transparent bg-gradient-to-tr  from-[#b3c8ff] via-[#467cff] to-[#0048ff] ">
            Technology
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <div className="bg-indigo-800/40 rounded-lg p-3 hover:scale-[1.02] hover:bg-indigo-800/70 transition-all transform ease-in-out flex justify-center items-center">
              <svg
                height="200"
                viewBox=".5 -.2 1023 1024.1"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m478.5.6c-2.2.2-9.2.9-15.5 1.4-145.3 13.1-281.4 91.5-367.6 212-48 67-78.7 143-90.3 223.5-4.1 28.1-4.6 36.4-4.6 74.5s.5 46.4 4.6 74.5c27.8 192.1 164.5 353.5 349.9 413.3 33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.5 1.6 57 85.2 123.4 185.9s157.2 238.2 201.8 305.7l81 122.7 4.1-2.7c36.3-23.6 74.7-57.2 105.1-92.2 64.7-74.3 106.4-164.9 120.4-261.5 4.1-28.1 4.6-36.4 4.6-74.5s-.5-46.4-4.6-74.5c-27.8-192.1-164.5-353.5-349.9-413.3-32.7-10.6-67.5-17.9-106.5-22.3-9.6-1-75.7-2.1-84-1.3zm209.4 309.4c4.8 2.4 8.7 7 10.1 11.8.8 2.6 1 58.2.8 183.5l-.3 179.8-31.7-48.6-31.8-48.6v-130.7c0-84.5.4-132 1-134.3 1.6-5.6 5.1-10 9.9-12.6 4.1-2.1 5.6-2.3 21.3-2.3 14.8 0 17.4.2 20.7 2z" />
                <path d="m784.3 945.1c-3.5 2.2-4.6 3.7-1.5 2 2.2-1.3 5.8-4 5.2-4.1-.3 0-2 1-3.7 2.1zm-6.9 4.5c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-7.6 4c-3.8 2-3.6 2.8.2.9 1.7-.9 3-1.8 3-2 0-.7-.1-.6-3.2 1.1z" />
              </svg>
            </div>
            <div className="bg-indigo-800/40 rounded-lg p-3 hover:scale-[1.02] hover:bg-indigo-800/70 transition-all transform ease-in-out flex justify-center items-center">
              <svg
                height="200"
                viewBox="175.7 78 490.6 436.9"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#61dafb">
                  <path d="m666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9v-22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6v-22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zm-101.4 106.7c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zm73.9-208.1c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zm53.8 142.9c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z" />
                  <circle cx="420.9" cy="296.5" r="45.7" />
                </g>
              </svg>
            </div>
            <div className="bg-indigo-800/40 rounded-lg p-3 hover:scale-[1.02] hover:bg-indigo-800/70 transition-all transform ease-in-out flex justify-center items-center">
              <svg
                height="200"
                viewBox="16.8 16.1 72.9 27.6"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <switch>
                  <g fill="#00acd7">
                    <path d="m22.3 24.7c-.1 0-.2-.1-.1-.2l.7-1c.1-.1.2-.2.4-.2h12.6c.1 0 .2.1.1.2l-.6.9c-.1.1-.2.2-.4.2zm-5.3 3.2c-.1 0-.2-.1-.1-.2l.7-1c.1-.1.2-.2.4-.2h16.1c.1 0 .2.1.2.2l-.3 1c0 .1-.2.2-.3.2zm8.5 3.3c-.1 0-.2-.1-.1-.2l.5-.9c.1-.1.2-.2.4-.2h7c.1 0 .2.1.2.2l-.1.8c0 .1-.1.2-.2.2zm36.6-7.2-5.9 1.5c-.5.1-.6.2-1-.4-.5-.6-.9-1-1.7-1.3-2.2-1.1-4.4-.8-6.4.5-2.4 1.5-3.6 3.8-3.6 6.7 0 2.8 2 5.1 4.8 5.5 2.4.3 4.4-.5 6-2.3.3-.4.6-.8 1-1.3h-6.8c-.7 0-.9-.5-.7-1.1.5-1.1 1.3-2.9 1.8-3.8.1-.2.4-.6.9-.6h12.8c-.1 1-.1 1.9-.2 2.9-.4 2.5-1.3 4.9-2.9 6.9-2.5 3.3-5.8 5.4-10 6-3.5.5-6.7-.2-9.5-2.3-2.6-2-4.1-4.6-4.5-7.8-.5-3.8.7-7.3 3-10.3 2.5-3.3 5.8-5.4 9.9-6.1 3.3-.6 6.5-.2 9.3 1.7 1.9 1.2 3.2 2.9 4.1 5 .1.4 0 .5-.4.6z" />
                    <path d="m73.7 43.5c-3.2-.1-6.1-1-8.6-3.1-2.1-1.8-3.4-4.1-3.8-6.8-.6-4 .5-7.5 2.9-10.6 2.6-3.4 5.7-5.1 9.9-5.9 3.6-.6 7-.3 10 1.8 2.8 1.9 4.5 4.5 5 7.9.6 4.8-.8 8.6-4 11.9-2.3 2.4-5.2 3.8-8.4 4.5-1.1.2-2.1.2-3 .3zm8.4-14.2c0-.5 0-.8-.1-1.2-.6-3.5-3.8-5.5-7.2-4.7-3.3.7-5.4 2.8-6.2 6.1-.6 2.7.7 5.5 3.2 6.7 1.9.8 3.9.7 5.7-.2 2.9-1.4 4.4-3.7 4.6-6.7z" />
                  </g>
                </switch>
              </svg>
            </div>

            <div className="bg-indigo-800/40 rounded-lg p-3 hover:scale-[1.02] hover:bg-indigo-800/70 transition-all transform ease-in-out flex justify-center items-center">
              <svg
                height="200"
                viewBox="0 0 640 640"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m0 0h640v640h-640z" fill="#017acb" />
                <path
                  d="m307.3 237h30.7v53h-83v235.8l-2.2.6c-3 .8-42.5.8-51-.1l-6.8-.6v-235.7h-83v-53l26.3-.3c14.4-.2 51.4-.2 82.2 0s69.8.3 86.8.3zm234.3 263.8c-12.2 12.9-25.3 20.1-47.1 26-9.5 2.6-11.1 2.7-32.5 2.6s-23.1-.1-33.5-2.8c-26.9-6.9-48.6-20.4-63.4-39.5-4.2-5.4-11.1-16.6-11.1-18 0-.4 1-1.3 2.3-1.9s4-2.3 6.2-3.6 6.2-3.7 8.9-5.1 10.5-6 17.3-10.1 13-7.4 13.7-7.4 2 1.4 3 3.1c6 10.1 20 23 29.9 27.4 6.1 2.6 19.6 5.5 26.1 5.5 6 0 17-2.6 22.9-5.3 6.3-2.9 9.5-5.8 13.3-11.6 2.6-4.1 2.9-5.2 2.8-13 0-7.2-.4-9.2-2.4-12.5-5.6-9.2-13.2-14-44-27.6-31.8-14.1-46.1-22.5-57.7-33.8-8.6-8.4-10.3-10.7-15.7-21.2-7-13.5-7.9-17.9-8-38-.1-14.1.2-18.7 1.7-23.5 2.1-7.2 8.9-21.1 12-24.6 6.4-7.5 8.7-9.8 13.2-13.5 13.6-11.2 34.8-18.6 55.1-19.3 2.3 0 9.9.4 17 .9 20.4 1.7 34.3 6.7 47.7 17.4 10.1 8 25.4 26.8 23.9 29.3-1 1.5-40.9 28.1-43.5 28.9-1.6.5-2.7-.1-4.9-2.7-13.6-16.3-19.1-19.8-32.3-20.6-9.4-.6-14.4.5-20.7 4.7-6.6 4.4-9.8 11.1-9.8 20.4.1 13.6 5.3 20 24.5 29.5 12.4 6.1 23 11.1 23.8 11.1 1.2 0 26.9 12.8 33.6 16.8 31.2 18.3 43.9 37.1 47.2 69.5 2.4 24.4-4.5 46.7-19.5 62.5z"
                  fill="#fff"
                />
              </svg>
            </div>

            <div className="bg-indigo-800/40 rounded-lg p-3 hover:scale-[1.02] hover:bg-indigo-800/70 transition-all transform ease-in-out flex justify-center items-center">
              <svg
                height="200"
                viewBox="-.557 117.607 598.543 423.631"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#0091e2">
                  <path d="m592.162 277.804c-1.664-1.37-16.642-12.597-48.815-12.597-8.321 0-16.92.822-25.24 2.191-6.102-41.898-41.327-62.162-42.714-63.257l-8.598-4.93-5.547 7.942c-6.934 10.68-12.204 22.729-15.255 35.052-5.824 23.824-2.219 46.279 9.985 65.447-14.7 8.216-38.553 10.133-43.545 10.406h-393.853c-10.262 0-18.583 8.216-18.583 18.348-.554 33.956 5.27 67.912 17.197 99.951 13.59 35.052 33.838 61.067 59.91 76.95 29.4 17.799 77.383 27.931 131.468 27.931 24.408 0 48.815-2.19 72.946-6.572 33.56-6.025 65.734-17.526 95.412-34.23a260.485 260.485 0 0 0 64.902-52.577c31.342-34.778 49.925-73.663 63.515-108.167h5.547c34.116 0 55.195-13.418 66.844-24.92 7.766-7.12 13.59-15.882 17.751-25.74l2.497-7.12z" />
                  <path d="m55.193 306.83h52.698c2.497 0 4.716-1.916 4.716-4.654v-46.553c0-2.465-1.942-4.655-4.716-4.655h-52.698c-2.496 0-4.715 1.916-4.715 4.655v46.553c.277 2.738 2.219 4.655 4.715 4.655zm72.668 0h52.699c2.496 0 4.715-1.916 4.715-4.654v-46.553c0-2.465-1.942-4.655-4.715-4.655h-52.7c-2.496 0-4.715 1.916-4.715 4.655v46.553c.278 2.738 2.22 4.655 4.715 4.655m74.055 0h52.699c2.496 0 4.715-1.917 4.715-4.655v-46.553c0-2.465-1.942-4.655-4.715-4.655h-52.699c-2.496 0-4.715 1.916-4.715 4.655v46.553c0 2.738 1.942 4.655 4.715 4.655zm72.946 0h52.699c2.496 0 4.715-1.917 4.715-4.655v-46.553c0-2.465-1.942-4.655-4.715-4.655h-52.699c-2.496 0-4.715 1.916-4.715 4.655v46.553c0 2.738 2.219 4.655 4.715 4.655zm-147-66.543h52.698c2.496 0 4.715-2.19 4.715-4.655v-46.553c0-2.465-1.942-4.656-4.715-4.656h-52.699c-2.496 0-4.715 1.917-4.715 4.656v46.553c.278 2.464 2.22 4.655 4.715 4.655m74.055 0h52.699c2.496 0 4.715-2.19 4.715-4.655v-46.553c0-2.465-1.942-4.656-4.715-4.656h-52.699c-2.496 0-4.715 1.917-4.715 4.656v46.553c0 2.464 1.942 4.655 4.715 4.655m72.946 0h52.699c2.496 0 4.715-2.19 4.715-4.655v-46.553c0-2.465-2.22-4.656-4.715-4.656h-52.699c-2.496 0-4.715 1.917-4.715 4.656v46.553c0 2.464 2.219 4.655 4.715 4.655m0-66.817h52.699c2.496 0 4.715-1.917 4.715-4.655v-46.553c0-2.465-2.22-4.656-4.715-4.656h-52.699c-2.496 0-4.715 1.917-4.715 4.656v46.553c0 2.464 2.219 4.655 4.715 4.655m73.5 133.36h52.699c2.496 0 4.715-1.917 4.715-4.655v-46.553c0-2.465-1.941-4.655-4.715-4.655h-52.698c-2.497 0-4.716 1.916-4.716 4.655v46.553c.278 2.738 2.22 4.655 4.716 4.655" />
                </g>
              </svg>
            </div>

            <div className="bg-indigo-800/40 rounded-lg p-3 hover:scale-[1.02] hover:bg-indigo-800/70 transition-all transform ease-in-out flex justify-center items-center">
              <svg
                height="200"
                viewBox=".15 .13 799.7 479.69"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m400 .13c-106.63 0-173.27 53.3-199.93 159.89 39.99-53.3 86.64-73.28 139.95-59.96 30.42 7.6 52.16 29.67 76.23 54.09 39.2 39.78 84.57 85.82 183.68 85.82 106.62 0 173.27-53.3 199.92-159.9-39.98 53.3-86.63 73.29-139.95 59.97-30.41-7.6-52.15-29.67-76.22-54.09-39.2-39.78-84.58-85.82-183.68-85.82zm-199.93 239.84c-106.62 0-173.27 53.3-199.92 159.9 39.98-53.3 86.63-73.29 139.95-59.96 30.41 7.61 52.15 29.67 76.22 54.08 39.2 39.78 84.58 85.83 183.68 85.83 106.63 0 173.27-53.3 199.93-159.9-39.99 53.3-86.64 73.29-139.95 59.96-30.42-7.59-52.16-29.67-76.23-54.08-39.2-39.78-84.57-85.83-183.68-85.83z"
                  fill="#06b6d4"
                />
              </svg>
            </div>
            <div className="bg-indigo-800/40 rounded-lg p-3 hover:scale-[1.02] hover:bg-indigo-800/70 transition-all transform ease-in-out flex justify-center items-center">
              <Image src="/gin.png" alt="foto" width={250} height={250}/>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 w-full">
        <ParticlesContainer />
      </div>
    </AnimatePresence>
  );
};

export default DescPage;
