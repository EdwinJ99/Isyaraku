import { useState } from "react";
import {
  IconHome,
  IconAbc,
  IconNotebook,
  IconLanguage,
  IconUserCircle,
  IconBrandYoutubeFilled,
  IconDeviceGamepad2,
  IconCardsFilled,
  IconBox,
  IconAppWindow,
  IconCamera,
} from "@tabler/icons-react";
import Footer from "./component/Footer.jsx";
import signA from "./assets/sign-A.png";
import logo from "./assets/logo.png";
import Recognition from "./pages/Recognition";
import handsWithSign from "./assets/hands-with-sign-language-freepik.jpg";
import groupSign from "./assets/rear-view-man-with-raised-hand-group-therapy-freepik.jpg";
import aslSign from "./assets/asl-freepik.jpg";
import "./main.css";
import kontenJSON from "./assets/konten.json";
import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";

function App() {
  const [count, setCount] = useState(0);
  const [boarding, setBoarding] = useState(true);

  let circleMenu = [
    {
      title: "Kamus Isyarat",
      icon: <IconAbc />,
      href: "/belajar/huruf",
    },
    {
      title: "Kuis Isyarat",
      icon: <IconDeviceGamepad2 />,
      href: "/kuis",
    },
    {
      title: "Edukasi",
      icon: <IconNotebook />,
      href: "/belajar",
    },
    {
      title: "Deteksi Isyarat",
      icon: <IconCamera />,
      href: "/recognition",
    },
  ];

  let articles = [
    {
      title: "Bahasa Isyarat: Pintu Menuju Komunikasi Inklusif",
      img: handsWithSign,
      href: "/belajar/artikel/1",
    },
    {
      title: "Perkenalan Diri dalam Bahasa Isyarat",
      img: groupSign,
      href: "/belajar/artikel/2",
    },
    {
      title: "ASL, Mengenal Bahasa Isyarat Amerika",
      img: aslSign,
      href: "/belajar/artikel/3",
    },
  ];

  const images = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
    5: img5,
  };

  setTimeout(() => {
    setBoarding(false);
  }, 600);
  return (
    <>
      {boarding ? (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-blue-600 w-full lg:w-4/12 h-[100vh] flex flex-col items-center justify-center text-white">
            <img src={logo} className="w-[180px] h-[180px] mb-4" alt="Logo" />
            <p className="text-sm font-medium text-center -mt-6">
              Bangun dunia tanpa batasan suara!
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-blue-600 w-full lg:w-4/12 shadow-md">
            <div className="p-6 text-white">
              <h1 className="text-2xl font-black">Selamat datang! 👋</h1>
              <p className="text-xl">Bangun dunia tanpa batasan suara!</p>
              {/*<img src={talkingAmico} className="w-60 ml-auto"/>*/}
            </div>

            <div className="bg-white p-5 flex flex-col gap-5 rounded-t-2xl">
              <div className="flex justify-between gap-3 overflow-x-auto">
                {circleMenu.map((menu) => (
                  <a
                    className="text-center flex flex-col items-center gap-2"
                    href={menu.href}
                  >
                    <div className="w-[4em] h-[4em] p-2 rounded-full bg-blue-100 text-blue-500 hover:shadow-lg flex justify-center items-center">
                      {menu.icon}
                    </div>
                    <p className="text-xs">{menu.title}</p>
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <div className="flex flex-row justify-between w-full rounded-lg bg-blue-200">
                    <div className="p-5">
                      <p>Kuis Isyarat</p>
                      <h1 className="text-xl font-semibold">
                        Huruf apakah ini?
                      </h1>
                      <br />
                      <a
                        className="bg-blue-600 p-2 pr-5 pl-5 rounded-full font-medium text-sm text-white"
                        href="/kuis"
                      >
                        Jawab
                      </a>
                    </div>
                    <div>
                      <img src={signA} className="w-[12em]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between items-center px-4">
                  <h1 className="text-lg font-semibold">Artikel</h1>
                  <a
                    className="bg-orange-300 hover:bg-orange-400 px-5 py-2 rounded-full text-xs font-medium text-black transition"
                    href="/belajar"
                  >
                    Semua
                  </a>
                </div>

                <div className="w-full overflow-x-auto px-4 pb-4 scroll-smooth snap-x snap-mandatory">
                  <div className="flex flex-row gap-4 pr-4">
                    {kontenJSON.map((article) => (
                      <div
                        key={article.id}
                        className="min-w-[16em] bg-white rounded-2xl border shadow-sm hover:shadow-md transition snap-start"
                      >
                        <a href={`/artikel/${article.id}`}>
                          <img
                            src={images[article.id]}
                            alt={article.title}
                            className="w-full h-36 object-cover object-top rounded-t-2xl"
                          />

                          <div className="flex flex-col justify-between p-4">
                            <h3 className="text-base font-semibold line-clamp-2">
                              {article.title}
                            </h3>

                            <div className="flex gap-2 mt-2">
                              <span className="text-gray-600 text-xs">
                                {article.author}
                              </span>
                              <span className="text-gray-400 text-xs">
                                {article.date}
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <br />

              <div className="text-center mb-[5em]">
                <span>Copyright &copy;2025 Isyaraku</span>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
