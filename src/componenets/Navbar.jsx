import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import ReactDOM from "react-dom"; // Import ReactDOM
import logo from "../assets/logo.png"
import "../style/navbar.css"


const Navbar = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("Class completed"); // Default selection

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          {/* <img src="../assests/logo.jpeg" alt="Logo" className="logo" /> */}
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand">Codingal</span>
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links">
          <li>
            <Link to="/posts" className="nav-link">Posts</Link> {/* Link added here */}
            
          </li>
        </ul>
        <ul className="nav-links">
          <li>
            <Link to="./" className="nav-link">Home</Link> {/* Link added here */}
            
          </li>
        </ul>
        <div className="nav-right">
          <span className="timer">{formatTime(timeLeft)}</span>
          <button className="end-class-btn" onClick={() => setIsModalOpen(true)}>End Class</button>
        </div>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <ul className="mobile-menu">
            <li>Courses</li>
            <li>Camps</li>
            <li>Competitions</li>
            <li>Quizzes</li>
            <li>Blog</li>
          </ul>
        )}
      </nav>

      {/* Modal (React Portal) */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div className="modal-overlay">
            <div className="modal-content">
              {/* Close Button */}
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>✖</button>

              <h2>Select a reason to end class</h2>

              {/* Radio Buttons */}
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="endReason"
                    value="Class completed"
                    checked={selectedReason === "Class completed"}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  <span className="custom-radio"></span>
                  Class completed
                </label>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="endReason"
                    value="Class interrupted/aborted"
                    checked={selectedReason === "Class interrupted/aborted"}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  <span className="custom-radio"></span>
                  Class interrupted/aborted
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="modal-buttons">
                <button 
                  className="end-class-btn" 
                  onClick={() => { setIsRunning(false); setIsModalOpen(false); console.log("Reason:", selectedReason); }}>
                  End Class
                </button>
                <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>,
          document.body // Mounts modal outside of <nav>
        )}
    </>
  );
};

export default Navbar;
