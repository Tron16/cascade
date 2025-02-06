import React from "react";
import "./MeetingPanel.css";

const MeetingPanel = () => {
  return (
    <div className="meeting-panel">
      <h2>Meeting Transcription</h2>
      <textarea
        className="transcription-textarea"
        placeholder="Transcription will appear here..."
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      ></textarea>
      <h2>Meeting Summary</h2>
      <div className="summary-box">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="meeting-buttons">
        <button className="transcribe-button">Transcribe</button>
        <button className="summarize-button">Summarize</button>
      </div>
    </div>
  );
};

export default MeetingPanel;
