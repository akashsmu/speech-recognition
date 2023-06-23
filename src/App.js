import "./App.css";
import { useState } from "react";
import AudioRecorder from "../src/AudioRecorder";
import UserData from "./UserData";
import { Route, Routes } from "react-router-dom";

const App = () => {
  let [recordOption, setRecordOption] = useState("video");

  const toggleRecordOption = (type) => {
    return () => {
      setRecordOption(type);
    };
  };

  return (
    <div>
      {/* <div className="button-flex">
        <button onClick={toggleRecordOption("audio")}>Record Audio</button>
      </div> */}
      <div>
        <Routes>
          <Route path="/audio" element={<AudioRecorder />} />
          <Route path="/" element={<UserData />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
