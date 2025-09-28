import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function Recognition() {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [color, setColor] = useState("text-gray-600");

  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const loadModel = async () => {
      try {
        const m = await tf.loadLayersModel("/model-tfjs/model.json");
        setModel(m);
        console.log("✅ Model loaded");
      } catch (err) {
        console.error("❌ Error loading model:", err);
      }
    };
    loadModel();
  }, []);

  useEffect(() => {
    if (model) {
      const interval = setInterval(() => {
        captureAndPredict();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [model]);

  const captureAndPredict = async () => {
    if (webcamRef.current && webcamRef.current.getScreenshot && model) {
      const imageSrc = webcamRef.current.getScreenshot();
      const img = new Image();
      img.src = imageSrc;

      await new Promise((resolve) => (img.onload = resolve));

      const tensor = tf.browser
        .fromPixels(img)
        .resizeBilinear([64, 64])
        .toFloat()
        .div(255.0)
        .expandDims(0);

      const predictionTensor = model.predict(tensor);
      const labelIndex = predictionTensor.argMax(1).dataSync()[0];
      const predictedLabel = labels[labelIndex];

      setPrediction(predictedLabel);
      setColor(predictedLabel === "A" ? "text-green-600" : "text-blue-600");

      tf.dispose([tensor, predictionTensor]);
    }
  };

  return (
    <>
      <Navbar title="Recognition" />

      <div className="flex flex-col items-center justify-center">
        {/* Header Biru */}
        <div className="bg-blue-600 w-full lg:w-4/12 shadow-md min-h-screen">
          <div className="p-6 text-white">
            <h1 className="text-2xl font-black">Deteksi Abjad BISINDO</h1>
            <p className="text-sm">
              Arahkan tanganmu ke kamera untuk mendeteksi abjad Bahasa Isyarat
              Indonesia (BISINDO). Sistem akan mengenali huruf secara otomatis.
            </p>
          </div>

          {/* Konten putih */}
          <div className="bg-white p-6 flex flex-col items-center rounded-t-2xl min-h-screen">
            {/* Webcam */}
            <div className="bg-gray-50 w-full shadow-md rounded-2xl p-5 flex flex-col items-center">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-[320px] h-[240px] rounded-lg border-2 border-gray-300"
              />

              {prediction && (
                <h2
                  className={`mt-4 text-xl font-bold ${color} transition-all duration-300`}
                >
                  Hasil: {prediction}
                </h2>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
