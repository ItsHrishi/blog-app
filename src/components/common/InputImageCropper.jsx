import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import {
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  Slider,
  Text,
} from "@radix-ui/themes";
import { CameraIcon, Cross2Icon } from "@radix-ui/react-icons";

const ImageUploadCropper = ({ onImageCropped, aspectRatio = 1 }) => {
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPEG or PNG image");
      return false;
    }

    if (file.size > maxSize) {
      setError("Image must be smaller than 5MB");
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      e.target.value = "";
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setOriginalFile(file);
      setIsOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = (src, pixelCrop, originalFile) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = src;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              console.error("Canvas is empty");
              return;
            }
            const fileName = originalFile.name.replace(/\.[^/.]+$/, "");
            const fileExtension =
              originalFile.type === "image/jpeg" ? ".jpg" : ".png";
            const newFile = new File(
              [blob],
              `${fileName}-cropped${fileExtension}`,
              { type: originalFile.type }
            );
            resolve(newFile);
          },
          originalFile.type,
          0.95
        );
      };
    });
  };

  const handleSave = async () => {
    try {
      if (!croppedAreaPixels) return;

      const croppedImage = await getCroppedImage(
        imageSrc,
        croppedAreaPixels,
        originalFile
      );

      if (croppedImage) {
        onImageCropped(croppedImage);
        handleClose();
      }
    } catch (e) {
      console.error("Error cropping image:", e);
      setError("Error cropping image. Please try again.");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setImageSrc(null);
    setOriginalFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setError("");
    setCroppedAreaPixels(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
      />

      <Button
        variant="surface"
        onClick={handleButtonClick}
        className="cursor-pointer"
      >
        <CameraIcon className="w-4 h-4 md:w-5 md:h-5" />
        <span className="ml-2">Change Profile Photo</span>
      </Button>

      {error && (
        <p className="mt-2 text-red-500 text-sm md:text-base text-center">
          {error}
        </p>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-lg md:max-w-2xl lg:max-w-4xl">
            <div className="p-4 md:p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-semibold">Crop Image</h2>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Cross2Icon className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>

              {/* Cropper */}
              <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100 rounded-lg overflow-hidden mb-4">
                {imageSrc && (
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    objectFit="contain"
                    cropShape="round"
                    showGrid={true}
                  />
                )}
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm md:text-base font-medium mb-2">
                    Zoom
                  </label>
                  {/* <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  /> */}
                  <Slider
                    value={[zoom]} // Radix requires an array
                    onValueChange={([value]) => setZoom(value)} // Destructure value from array
                    min={1}
                    max={3}
                    step={0.1}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    size={{
                      initial: "2",
                      md: "3",
                    }}
                    onClick={handleClose}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    size={{
                      initial: "2",
                      md: "3",
                    }}
                    highContrast
                    variant="classic"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadCropper;
