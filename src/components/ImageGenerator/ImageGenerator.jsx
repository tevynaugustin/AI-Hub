import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import { useNavigate } from "react-router-dom";
import defaultImage from "./default-image.jpg";

function ImageGenerator() {
  // State for image URL, input reference, navigation hook, and loading indicator
  const [image_url, setImage_url] = useState(defaultImage);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to generate image using AI
  const imageGenerator = async () => {
    // Check if the input is empty
    if (inputRef.current.value === "") {
      return;
    }

    setError(null);

    // Set loading indicator to true
    setLoading(true);

    try {
      // Send a request to the server to generate an image
      const response = await fetch(
        "https://ai-hub-backend-production.up.railway.app/generate-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `${inputRef.current.value}`,
          }),
        }
      );

      // Handle server response
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}\n${errorText}`);
      }

      // Parse the response and update the image URL
      let data = await response.json();
      let data_array = data.data;
      setImage_url(data_array[0].url);
      setLoading(false);

    } catch (error) {
      console.error("Error generating image:", error);
      setError("Please try entering a different prompt.");
    } finally {
      setLoading(false);
    }
  };

  // Handler for navigating back to Home page
  const backToHome = () => {
    navigate("/Home");
  };

  return (
    <div className="ai-image-generator">
      {/* Header */}
      <header className="header">
        AI Image <span>Generator</span>
      </header>
      {/* Image display and loading indicator */}
      <div className="img-loading">
        <div className="image">
          <img src={image_url} alt="" />
        </div>
        <div className="loading">
          {/* Loading bar and text */}
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : 'display-none'}>Loading...</div>
        </div>
      </div>
      {/* Display error message if there's an error */}
      {error && <div className="error-message">{error}</div>}
      {/* Search box for input */}
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see! :)"
        />
        {/* Button to trigger image generation */}
        <button className="generate-btn" onClick={imageGenerator}>
          Generate!
        </button>
      </div>
      {/* Button to go back to Home page */}
      <button className="back-button" onClick={() => backToHome()}>Go back to Home Page</button>
    </div>
  );
}

export default ImageGenerator;
