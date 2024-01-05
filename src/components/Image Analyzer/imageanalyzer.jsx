// ImageAnalyzer.js

import React, { useState } from "react";
import VISION_API_KEY from "../../visionApiKey";
import "./imageanalyzer.css";
import { useNavigate } from "react-router-dom";

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/Home");
  }

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAnalyzeImage = async () => {
    try {
      if (!image) {
        alert("Please select an image first.");
        return;
      }

      const api_key = VISION_API_KEY;

      setLoading(true); // Set loading to true when analysis starts

      // Function to encode the image
      const encodeImage = async () => {
        const base64_image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.readAsDataURL(image);
        });
        return base64_image;
      };

      // Getting the base64 string
      const base64_image = await encodeImage();

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      };

      const payload = {
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "What’s in this image?",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64_image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      };

      const apiResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        }
      );

      const data = await apiResponse.json();
      console.log(data);
      console.log(data?.choices?.[0]?.message?.content);
      const dataResponse = data.choices[0].message.content;

      setContent(dataResponse);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setLoading(false); // Set loading to false when analysis completes
    }
  };

  return (
    <div className="visionContainer">
      <button className="back-button" onClick={handleBackButton}>Back Home</button>
      {image && (
        <div>
          <img
          className="preview-img"
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </div>
      )}
      <input
        className="addFile"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button
        className="analyzeImage"
        onClick={handleAnalyzeImage}
        disabled={loading}
      >
        {loading ? "Generating..." : "Analyze Image"}
      </button>
      {content && (
        <div>
          <h2 className="analyze-results">Analysis Result:</h2>
          <p className="data-response">{content}</p>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;
