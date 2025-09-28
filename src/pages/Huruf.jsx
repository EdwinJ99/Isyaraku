import { useState } from 'react'
import {
  IconHelpCircleFilled,
} from '@tabler/icons-react';
import Footer from "../component/Footer.jsx"
import Navbar from "../component/Navbar.jsx"
import BISINDO_LETTER from "../component/BISINDO.jsx"
import SIBI_LETTER from "../component/SIBI.jsx"

export default function() {
  let [bahasa, setBahasa] = useState('BISINDO')
  let [abjadTarget, setAbjadTarget] = useState("")
  let [modal, setModal] = useState(false)
  let [mirror, setMirror] = useState(false)

  const handleBahasaChange = (event) => {
    setBahasa(event.target.value);
  };

  let abjad = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  return (
    <>
      <Navbar title="Mengenal Alfabet" />

      {/* Modal */}
      <div
        className={`z-20 fixed w-full h-screen bg-white p-5 border-t transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${modal ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex flex-col items-center gap-5">
          <select
            className="appearance-none bg-orange-200 p-3 pr-10 rounded-full border-2 border-orange-300 shadow-sm"
            onChange={handleBahasaChange}
            value={bahasa}
          >
            <option value="BISINDO">BISINDO</option>
            <option value="SIBI">SIBI</option>
          </select>

          <h1 className="text-3xl font-bold text-blue-600">Huruf {abjadTarget}</h1>

          {bahasa === "BISINDO" ? (
            <img
              src={BISINDO_LETTER[abjadTarget]}
              alt={abjadTarget}
              className={`w-[20em] lg:w-[30%] bg-orange-100 p-5 rounded-2xl shadow-md transition-transform duration-300 ${mirror ? "scale-x-[-1]" : "scale-x-100"}`}
            />
          ) : (
            <img
              src={SIBI_LETTER[abjadTarget]}
              alt={abjadTarget}
              className={`w-[20em] lg:w-[30%] bg-orange-100 p-5 rounded-2xl shadow-md transition-transform duration-300 ${mirror ? "scale-x-[-1]" : "scale-x-100"}`}
            />
          )}

          <button
            onClick={() => setMirror(!mirror)}
            className="border-2 border-blue-500 text-blue-500 font-semibold w-full lg:w-1/3 rounded-full p-3 hover:bg-blue-50 active:bg-blue-100 transition"
          >
            Balik Gambar
          </button>
          <button
            onClick={() => { setModal(false); setMirror(false) }}
            className="bg-blue-500 text-white font-semibold w-full lg:w-1/3 rounded-full p-3 hover:bg-blue-600 active:bg-blue-700 transition"
          >
            Lihat Huruf Lain
          </button>
        </div>
      </div>

      {/* Main */}
{/* Main */}
<div className="flex flex-col items-center justify-center">
  <div className="bg-gradient-to-b from-blue-600 to-blue-500 w-full lg:w-4/12 shadow-md pt-10 pb-20 min-h-screen rounded-t-2xl">
    <div className="flex flex-col justify-center gap-3 mb-5 px-5">
      <div className="relative">
        <select
          className="appearance-none bg-orange-200 p-3 pr-12 rounded-full border-2 border-orange-300 shadow-sm w-full"
          onChange={handleBahasaChange}
          value={bahasa}
        >
          <option value="BISINDO">BISINDO</option>
          <option value="SIBI">SIBI</option>
        </select>
        {/* custom arrow */}
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-700">
          ▼
        </span>
      </div>

      <a
        className="flex gap-2 justify-center items-center text-sm text-white hover:underline"
        href={`/belajar/${bahasa.toLowerCase()}`}
      >
        Apa itu {bahasa}? <IconHelpCircleFilled size={-2} />
      </a>
    </div>

    {/* Grid Abjad */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-5">
      {abjad.map((abjad) => (
        <div
          key={abjad}
          onClick={() => { setAbjadTarget(abjad); setModal(true) }}
          className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center p-10"
        >
          <p className="text-6xl font-bold text-blue-600 mb-6">{abjad}</p>
          {bahasa === "BISINDO" ? (
            <img
              src={BISINDO_LETTER[abjad]}
              alt={abjad}
              className="w-40 transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <img
              src={SIBI_LETTER[abjad]}
              alt={abjad}
              className="w-40 transition-transform duration-300 hover:scale-110"
            />
          )}
        </div>
      ))}
    </div>
  </div>

  <Footer />
</div>

    </>
  )
}
