export async function startRecording(setRecorderState) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream,
        isRecording: true,
      };
    });
  } catch (err) {
    console.log(err);
  }
}

export function saveRecording(recorder, setRecorderState) {
  if (recorder.state !== "inactive") {
    setRecorderState((prevState) => {
      return {
        ...prevState,

        isRecording: false,
      };
    });
    recorder.stop();
  }
}
export function pauseRecording(recorder, setRecorderState) {
  setRecorderState((prevState) => {
    return {
      ...prevState,

      isRecording: false,
    };
  });
  recorder.pause();
}
export function resumeRecording(recorder, setRecorderState) {
  setRecorderState((prevState) => {
    return {
      ...prevState,

      isRecording: true,
    };
  });
  recorder.resume();
}
