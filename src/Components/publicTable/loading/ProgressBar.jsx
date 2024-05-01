import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment elapsedSeconds every second until it reaches 120 (2 minutes)
      if (elapsedSeconds < 120) {
        setElapsedSeconds(prevSeconds => prevSeconds + 1);
      }
    }, 1000); // Update elapsedSeconds every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [elapsedSeconds]);

  // Calculate minutes and seconds from elapsedSeconds
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  // Calculate the progress as a percentage of elapsed time relative to 2 minutes (120 seconds)
  const progress = (elapsedSeconds / 120) * 100;
  const radius = 80; // Increase the radius for a larger circle
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={radius * 2} height={radius * 2}>
        <circle
          strokeWidth="12" // Increase the stroke width for a thicker circle
          stroke="#007bff"
          fill="transparent"
          r={radius - 6} // Adjusted radius to leave space for the stroke width
          cx={radius}
          cy={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: progressOffset,
            transition: 'stroke-dashoffset 1s ease-in-out'
          }}
        />
        <text x={radius} y={radius } textAnchor="middle" dominantBaseline="middle" fontSize="24px">
              عملیات آغاز شد!
        </text>
      </svg>
    </div>
  );
};

export default ProgressBar;
