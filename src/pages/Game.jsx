import { useState } from "react";
import Footer from "../component/Footer.jsx";
import Navbar from "../component/Navbar.jsx";
import BISINDO_LETTER from "../component/BISINDO.jsx";
import SIBI_LETTER from "../component/SIBI.jsx";

export default function Game() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState(false);
  const [modal, setModal] = useState(false);
  const [bahasa, setBahasa] = useState("BISINDO");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("Mudah"); // bisa: Mudah, Sedang, Sulit

  const handleBahasaChange = (event) => {
    setBahasa(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  function generate() {
    let huruf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let random = Math.floor(Math.random() * huruf.length);
    let current = huruf[random];
    let isyarat =
      bahasa === "BISINDO" ? BISINDO_LETTER[current] : SIBI_LETTER[current];
    return {
      id: random,
      isyarat,
      answer: current,
    };
  }

  function captureAnswer(input) {
    if (!currentQuestion) return;
    setAnswer(currentQuestion.answer === input.toUpperCase());
  }

  function startGame() {
    setStarted(true);
    const q = generate();
    setCurrentQuestion(q);
    setScore(0);
  }

  function nextQuestion() {
    let val = document.querySelector("input");
    if (!val.value) return;

    if (answer) {
      setScore(score + 1);
    }

    setModal(true);
    setTimeout(() => {
      setModal(false);
      const q = generate();
      setCurrentQuestion(q);
      val.value = "";
    }, 1500);
  }

  return (
    <>
      {/* Navbar */}
      <Navbar title="Game Isyarat" />

      <div
        className="flex flex-col items-center justify-center min-h-screen relative"
        style={{
          backgroundImage:
            "url('https://www.toptal.com/designers/subtlepatterns/patterns/doodles.png')",
          backgroundSize: "cover",
        }}
      >
        {/* Modal Feedback */}
        {modal && currentQuestion && (
          <div className="flex flex-col items-center justify-center">
            <div
              className={`w-72 h-72 p-5 ${
                answer ? "bg-green-300" : "bg-red-300"
              } text-center rounded-2xl shadow-2xl absolute top-40 z-10 flex flex-col items-center justify-center gap-3`}
            >
              <h2 className="text-xl font-bold">
                Jawaban {answer ? "Benar 🎉" : "Salah ❌"}
              </h2>
              <img
                src={currentQuestion.isyarat}
                width={120}
                className="rounded-2xl"
              />
              <h3 className="text-lg font-medium">
                Huruf: {currentQuestion.answer}
              </h3>
            </div>
          </div>
        )}

        {/* Game Container */}
        <div
          className={`w-full lg:w-4/12 shadow-lg transition-all duration-300 ${
            modal ? "brightness-50" : "brightness-100"
          }`}
        >
          {/* Start Screen */}
          {!started ? (
            <div className="bg-blue-500 h-screen flex flex-col justify-center items-center gap-6 p-5 rounded-lg">
              <h1 className="text-2xl font-bold text-white text-center">
                Latih Kemampuan Bahasa Isyaratmu Disini!
              </h1>

              <div className="flex flex-col gap-4 w-64">
                {/* Pilih Bahasa */}
                <div className="flex flex-col gap-1">
                  <label className="text-white font-medium">Pilih Bahasa</label>
                  <select
                    className="bg-orange-200 p-2 rounded-full border-2 border-orange-400"
                    onChange={handleBahasaChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      -- Pilih Bahasa --
                    </option>
                    <option value="BISINDO">BISINDO</option>
                    <option value="SIBI">SIBI</option>
                  </select>
                </div>

                {/* Pilih Level */}
                <div className="flex flex-col gap-1">
                  <label className="text-white font-medium">Pilih Level</label>
                  <select
                    className="bg-orange-200 p-2 rounded-full border-2 border-orange-400"
                    onChange={handleLevelChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      -- Pilih Level --
                    </option>
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                  </select>
                </div>
              </div>

              <button
                className="bg-orange-400 text-white px-6 py-2 rounded-2xl shadow-md hover:bg-orange-500 transition"
                onClick={startGame}
              >
                Mulai!
              </button>
            </div>
          ) : (
            // Main Game
            <div className="h-screen bg-orange-200 flex flex-col items-center p-5">
              {/* Scoreboard */}
              <div className="flex justify-between items-center w-full mb-4">
                <span className="font-semibold text-lg text-blue-700">
                  Level: {level}
                </span>
                <span className="font-semibold text-lg text-green-700">
                  Skor: {score}
                </span>
              </div>

              {/* Image Card */}
              <div className="bg-white shadow rounded-2xl mt-6 p-4">
                {currentQuestion && (
                  <img
                    src={currentQuestion.isyarat}
                    width={250}
                    className="rounded-2xl"
                  />
                )}
              </div>

              {/* Input */}
              <div className="mt-6 flex flex-col items-center gap-3 w-full">
                <h1 className="text-xl font-medium">Huruf apakah ini?</h1>
                <input
                  type="text"
                  className="p-3 border-2 border-black w-80 rounded-lg text-black text-center text-xl font-bold"
                  placeholder="Masukkan jawaban"
                  maxLength={1}
                  onInput={(ev) => captureAnswer(ev.target.value.toUpperCase())}
                />
                <button
                  className="px-6 py-2 bg-blue-500 rounded-lg text-white font-medium hover:bg-blue-600 transition"
                  onClick={nextQuestion}
                >
                  Jawab
                </button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
