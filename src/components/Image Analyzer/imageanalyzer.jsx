import React, { useState, useEffect } from "react";
import "./imageanalyzer.css";
import { useNavigate } from "react-router-dom";
import Footer from '../footer/footer';

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(null);
  const [base64_image, setBase64Image] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the API key when the component mounts
    const fetchApiKey = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-api-key");
        const data = await response.json();
        setApiKey(data.apiKey);
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };

    fetchApiKey();
  }, []);

  const handleBackButton = () => {
    navigate("/Home");
  };

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64_image = e.target.result.split(",")[1];
        setImage(selectedImage);
        setBase64Image(base64_image); 
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  const handleAnalyzeImage = async () => {
    try {
      if (!image || !base64_image) {
        alert("Please select an image first.");
        return;
      }

      setLoading(true);

      // Log the size of the image
      console.log("Image size:", image.size);

      const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Access-Control-Allow-Credentials": "true",
        credentials: "include",
        "Content-Type": "application/json",
      };

      const payload = {
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                image: {
                  data: base64_image,
                },
              },
              {
                type: "text",
                text: "What’s in this image?",
              },
            ],
          },
          {
            role: "user",
            content: [
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
      
      

      const apiResponse = await fetch("https://ai-hub-backend-production.up.railway.app/image-analyzer", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      // Log the response status
      console.log("Response Status:", apiResponse.status);

      if (!apiResponse.ok) {
        throw new Error(
          `HTTP error! Status: ${apiResponse.status} - ${apiResponse.statusText}`
        );
      }

      const data = await apiResponse.json();

      // Log the response from the server
      console.log("Server response:", data);

      const dataResponse = data.choices[0].message.content;

      setContent(dataResponse);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="visionContainer">
      <button className="back-button" onClick={handleBackButton}>
        Back Home
      </button>
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
    <Footer/>
    </div>
  );
};

export default ImageAnalyzer;
