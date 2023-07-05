import React, { useState, useEffect } from "react";
import DragAndDrop from "./DragAndDrop";

var a;
const AudioPlay = () => {
  const [buttonName, setButtonName] = useState("Play");

  const [audio, setAudio] = useState();

  useEffect(() => {
    if (a) {
      a.pause();
      a = null;
      setButtonName("Play");
    }
    if (audio) {
      a = new Audio(audio);
      a.onended = () => {
        setButtonName("Play");
      };
    }
  }, [audio]);

  const handleClick = () => {
    if (buttonName === "Play") {
      a.play();
      setButtonName("Pause");
    } else {
      a.pause();
      setButtonName("Play");
    }
  };

  const addFile = (e) => {
    if (e.target.files[0]) {
      setAudio(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <input type="file" onChange={addFile} />
      <div style={{ margin: "5rem" }}>
        <DragAndDrop />
      </div>
      <button onClick={handleClick}>{buttonName}</button>
      <audio src={audio} controls></audio>
    </div>
  );
};

export default AudioPlay;
