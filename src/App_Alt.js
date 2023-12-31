import MicRecorder from "mic-recorder-to-mp3";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Set AssemblyAI Axios Header
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "ebed85631cc240218efda2f7dfad289f",
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
});

const App_Alt = () => {
  // Mic-Recorder-To-MP3
  const recorder = useRef(null); //Recorder
  const audioPlayer = useRef(null); //Ref for the HTML Audio Tag
  const [blobURL, setBlobUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(null);

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 });
  }, []);

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        console.log(blob);
        const newBlobUrl = URL.createObjectURL(blob);
        setBlobUrl(newBlobUrl);
        setIsRecording(false);
        setAudioFile(file);
      })
      .catch((e) => console.log(e));
  };

  // AssemblyAI API

  // State variables
  const [uploadURL, setUploadURL] = useState("");
  const [transcriptID, setTranscriptID] = useState("");
  const [transcriptData, setTranscriptData] = useState("");
  const [transcript, setTranscript] = useState("");

  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      assembly
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err));
    }
  }, [audioFile]);

  // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
  const submitTranscriptionHandler = () => {
    assembly
      .post("/transcript", {
        audio_url: uploadURL,
      })
      .then((res) => {
        setTranscriptID(res.data.id);
      })
      .catch((err) => console.error(err));
  };

  const checkStatusHandler = async () => {
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data);
        setTranscript(res.data.text);
      });
    } catch (err) {
      console.error(err);
    }
  };

  console.log(transcriptData);
  console.log(transcriptID);
  console.log(transcript);

  return (
    <div>
      <h1>React Speech Recognition App</h1>
      <audio ref={audioPlayer} src={blobURL} controls="controls" />
      <div>
        <Button
          variant="contained"
          type="button"
          disabled={isRecording}
          onClick={startRecording}
          style={{ margin: "5px" }}
        >
          START
        </Button>
        <Button
          variant="contained"
          disabled={!isRecording}
          onClick={stopRecording}
          style={{ margin: "5px" }}
        >
          STOP
        </Button>
        <Button
          variant="contained"
          onClick={submitTranscriptionHandler}
          style={{ margin: "5px" }}
        >
          SUBMIT
        </Button>
        <Button
          variant="contained"
          onClick={checkStatusHandler}
          style={{ margin: "5px" }}
        >
          CHECK STATUS
        </Button>
        {/* <CustomizedDialogs /> */}
      </div>
      {transcriptData.status === "completed" ? (
        <p style={{ color: "green" }}>Transcribed Text : {transcript}</p>
      ) : (
        <p>
          <h4>Status : </h4>
          {transcriptData.status}
        </p>
      )}
    </div>
  );
};

export default App_Alt;
