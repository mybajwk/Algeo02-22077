"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Image from "next/image";

const CameraComponent = () => {
  const webcamRef = useRef<any>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [deviceId, setDeviceId] = useState<any>({});
  const [devices, setDevices] = useState<any[]>([]);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      console.log(imageSrc);
    }
  };

  const handleDevices = useCallback(
    (mediaDevices: any) =>
      setDevices(
        mediaDevices.filter(({ kind }: { kind: any }) => kind === "videoinput")
      ),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    // Set up an interval to capture a picture every 10 seconds
    const intervalId = setInterval(capture, 10000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div>
      {devices.map((device, key) => (
          <div key={device.deviceId}>
            <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} />
            {device.label || `Device ${key + 1}`}
          </div>

        ))}
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <div>
        <Image key={capturedImage} src={capturedImage} alt="image" />
      </div>
    </div>
  );
};

export default CameraComponent;
