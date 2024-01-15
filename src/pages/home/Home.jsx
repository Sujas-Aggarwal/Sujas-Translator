import React from "react";
import "./Home.css";
import axios from "axios";
function Home() {
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", "auto");
  encodedParams.set("target_language", "en");

  async function translate() {
    const text = document.getElementById("input-text").value;
    if (text.length>20 || text.length<2){return}
    encodedParams.set("text", text);
    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };
    try {
      const response = await axios.request(options);
      const output = document.getElementById("output-text")
      output.value = response.data.data.translatedText + " (Original was in " + response.data.data.detectedSourceLanguage.name +")"      ;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="container">
      <div className="wrapper">
        <h1>Translator.io</h1>
        <div className="main-content-box">
          <div className="input-box">
            <h2>Detect Language</h2>

            <textarea name="input" id="input-text"></textarea>
            <div>
              <a id="translate-button" onClick={translate}>
                Translate
              </a>
            </div>
          </div>

          <div className="output-box">
            <h2>English</h2>

            <textarea readOnly name="output" id="output-text"></textarea>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
