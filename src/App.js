import "./App.css";
import { useState } from "react";
import AudioRecorder from "../src/AudioRecorder";
import UserData from "./UserData";
import { Route, Routes } from "react-router-dom";
import Choice from "./Choice";
import Contacts from "./Contacts";
import AudioPlay from "./AudioUploader";

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
          <Route exact path="/" element={<UserData />} />
          <Route path="/choice" element={<Choice />} />
          <Route path="/upload" element={<AudioPlay />} />
          <Route path="/record" element={<AudioRecorder />} />
          {/* <Route path="/contact" element={<Contacts />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
