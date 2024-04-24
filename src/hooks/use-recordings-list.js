import { useState, useEffect } from "react";
import { deleteAudio } from "../handlers/recordings-list";
import generateKey from "../Utils/generate-key";

export default function useRecordingsList(audio, src) {
  const [recordings, setRecordings] = useState(null);

  useEffect(() => {
    if (audio) setRecordings({ key: generateKey(), audio, src });
  }, [audio]);

  return {
    recordings,
    deleteAudio: () => deleteAudio(setRecordings),
  };
}
