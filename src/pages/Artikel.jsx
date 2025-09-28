import { useParams } from "react-router-dom";
import { marked } from "marked";
import Footer from "../component/Footer.jsx";
import Navbar from "../component/Navbar.jsx";
import kontenJSON from "../assets/konten.json";
import "../artikel.css";

import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";

const images = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
};

export default function ArtikelDetail() {
  let { id } = useParams();
  let filteredKonten = kontenJSON.find((post) => post.id === parseInt(id));

  if (!filteredKonten) {
    return <p className="text-center mt-10">Artikel tidak ditemukan</p>;
  }

  const render = marked.parse(filteredKonten.content);

  return (
    <>
      <Navbar title="Artikel" />
      <div className="flex flex-col items-center justify-center bg-gray-200">
        <img
          src={images[filteredKonten.id]}
          className="lg:rounded-lg lg:w-4/12 mt-3 mb-3 brightness-50"
        />

        <div className="absolute lg:top-16 top-12 text-white text-center">
          <header className="lg:text-2xl text-xl font-bold">
            {filteredKonten.title}
          </header>
          <p className="text-sm mt-2">{filteredKonten.author}</p>
          <p className="text-sm">{filteredKonten.date}</p>
        </div>

        <div className="w-full lg:w-4/12 shadow-lg p-5 bg-white mb-[5em]">
          <div dangerouslySetInnerHTML={{ __html: render }}></div>

          <br />
          <br />

              <div className="text-center mb-[1em]">
                <span>Copyright &copy;2025 Isyaraku</span>
              </div>
        </div>
        
        <Footer activePath="belajar" />
      </div>
    </>
  );
}
