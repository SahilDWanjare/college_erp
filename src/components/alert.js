import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/style.css";

const alert = () => {
  const [updates, setUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch updates from API
  useEffect(() => {
    const fetchUpdates = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/updates", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUpdates(data.updates || []);
        } else {
          setError(data.message || "Failed to fetch updates");
          navigate("/login"); // Redirect if token is invalid
        }
      } catch (err) {
        setError("Something went wrong while fetching updates");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpdates();
  }, [navigate]);

  // Handle thumbnail click
  const handleThumbnailClick = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="updates-section">
      <h2 className="updates-heading">College News & Updates</h2>
      {isLoading && <p>Loading updates...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && updates.length === 0 && (
        <p>No updates available at the moment.</p>
      )}
      <div className="updates-grid">
        {updates.map((update) => (
          <div
            key={update.id}
            className="update-card"
            onClick={() => handleThumbnailClick(update.link)}
            style={{ cursor: update.link ? "pointer" : "default" }}
          >
            <img
              src={update.thumbnail}
              alt={update.title}
              className="update-thumbnail"
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Fallback image
            />
            <div className="update-content">
              <h3 className="update-title">{update.title}</h3>
              <p className="update-description">
                {update.description.length > 100
                  ? `${update.description.substring(0, 100)}...`
                  : update.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default alert;