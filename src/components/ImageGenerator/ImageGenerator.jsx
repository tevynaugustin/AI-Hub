import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import { useNavigate } from "react-router-dom";
import defaultImage from "./default-image.avif";
import ImageGenerationApiKey from '../../apiKey'

function ImageGenerator() {
  const [image_url, setImage_url] = useState(defaultImage);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${ImageGenerationApiKey}`,
            "User-Agent": "Chrome",
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: `${inputRef.current.value}`,
            n: 1,
            size: "1024x1024",
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}\n${errorText}`);
      }

      let data = await response.json();
      let data_array = data.data;
      setImage_url(data_array[0].url);
      setLoading(false);

    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const backToHome = () => {
    navigate("/Home");
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url} alt="" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text": 'display-none'}>Loading...</div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see! :)"
        />
        <div className="generate-btn" onClick={imageGenerator}>
          Generate!
        </div>
      </div>

      <button className="back-button" onClick={() => backToHome()}>Go back to Home Page</button>

    </div>
  );
}

export default ImageGenerator;
