import {
  IconHome,
  IconAbc,
  IconNotebook,
  IconLanguage,
  IconUserCircle,
  IconBrandYoutubeFilled,
  IconDeviceGamepad2,
  IconCardsFilled,
} from "@tabler/icons-react";
import Footer from "../component/Footer.jsx";
import Navbar from "../component/Navbar.jsx";
import kontenJSON from "../assets/konten.json";

// Import gambar artikel
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";

export default function Belajar() {


  // mapping id artikel ke gambar
  const images = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
    5: img5,
  };

  return (
    <>
      <Navbar title="Belajar" />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-blue-600 w-full lg:w-4/12 shadow-md">
          {/* Header */}
          <div className="p-6 text-white">
            <h1 className="text-2xl font-black">Bahasa Isyarat</h1>
            <p className="text-xl">Belajar bahasa isyarat dengan asyik!</p>
          </div>

          {/* Konten */}
          <div className="bg-white p-5 flex flex-col gap-5 rounded-t-2xl">
            {/* Perbedaan */}
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-lg">Kenali Perbedaannya</h1>
              <div className="flex flex-row gap-3 w-full justify-center h-32">
                <a
                  href="/belajar/sibi"
                  className="w-full bg-orange-200 text-center rounded flex flex-col justify-center items-center border-2 border-orange-300 hover:shadow-md"
                >
                  <p className="font-bold">SIBI</p>
                  <p>Sistem Isyarat Bahasa Indonesia</p>
                </a>
                <a
                  href="/belajar/bisindo"
                  className="w-full bg-orange-200 text-center rounded flex flex-col justify-center items-center border-2 border-orange-300 hover:shadow-md"
                >
                  <p className="font-bold">BISINDO</p>
                  <p>Bahasa Isyarat Indonesia</p>
                </a>
              </div>
            </div>

            {/* Artikel */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg font-medium">Artikel</h1>
                <a
                  className="bg-blue-500 px-3 py-2 rounded-full text-xs font-medium text-white hover:bg-blue-600"
                  href="/belajar"
                >
                  Semua
                </a>
              </div>

              {/* Grid Artikel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {kontenJSON.map((article) => (
                  <div
                    key={article.id}
                    className="w-full rounded-lg border hover:shadow-md transition bg-white"
                  >
                    <a href={`/artikel/${article.id}`}>
                      <img
                        src={images[article.id]}
                        alt={article.title}
                        className="w-full h-40 object-cover object-top rounded-t-lg"
                      />
                      <div className="flex flex-col justify-between p-4">
                        <h3 className="text-base font-semibold text-blue-700">
                          {article.title}
                        </h3>

                        {article.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                            {article.description}
                          </p>
                        )}

                        <div className="flex gap-3 mt-3">
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
        </div>

        <Footer />
      </div>
    </>
  );
}
