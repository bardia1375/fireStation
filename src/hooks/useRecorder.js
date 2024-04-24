import { useState, useEffect } from "react";
import {
  startRecording,
  saveRecording,
  pauseRecording,
  resumeRecording,
} from "../handlers/recorder-controls";

const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
  src: null,
  isRecording: false,
};

export default function useRecorder() {
  const [recorderState, setRecorderState] = useState(initialState);

  useEffect(() => {
    const MAX_RECORDER_TIME = 5;
    let recordingInterval = null;
    // if (recorderState.mediaRecorder?.state !== "inactive") {
    //   recorderState.mediaRecorder?.requestData();
    // }

    if (recorderState.isRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            clearInterval(recordingInterval);
            return prevState;
          }

          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };

          if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
        });
      }, 1000);
    else clearInterval(recordingInterval);

    return () => clearInterval(recordingInterval);
  });

  useEffect(() => {
    if (recorderState.mediaStream)
      setRecorderState((prevState) => {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      });
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks = [];
    if (recorder && recorder.state === "inactive") {
      recorder.start();

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/mp3" });
        chunks = [];
        setRecorderState((prevState) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              recordingMinutes: prevState.recordingMinutes,
              recordingSeconds: prevState.recordingSeconds,
              audio: window.URL.createObjectURL(blob),
              src: blob,
            };
          else return initialState;
        });
      };
    }

    return () => {
      if (recorder)
        recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  return {
    recorderState,

    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    pauseRecording: () =>
      pauseRecording(recorderState.mediaRecorder, setRecorderState),
    resumeRecording: () =>
      resumeRecording(recorderState.mediaRecorder, setRecorderState),
    saveRecording: () =>
      saveRecording(recorderState.mediaRecorder, setRecorderState),
  };
}
