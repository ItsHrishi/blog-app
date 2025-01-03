import HeroSliderCard from "../common/HeroSliderCard";
import React, { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";

const HeroSlider = () => {
  const [idList, setIdList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    appwriteService.getSlidePosts().then((data) => {
      if (data) {
        // console.log("list data ", data.documents);
        setIdList(data.documents);
      }
    });
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % idList?.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, idList?.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % idList.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + idList.length) % idList.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full overflow-hidden group">
      {/* Main Slider */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {idList?.map((item) => (
          <div key={item.$id} className="w-full h-full flex-shrink-0">
            <HeroSliderCard postId={item?.articleId} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden group-hover:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full items-center justify-center"
      >
        <ChevronLeftIcon className="w-3 h-3 sm:h-4 sm:w-4 md:h-6 md:w-6" />
        <span className="sr-only">Previous slide</span>
      </button>
      <button
        onClick={nextSlide}
        className="hidden group-hover:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full items-center justify-center"
      >
        <ChevronRightIcon className="w-3 h-3 sm:h-4 sm:w-4 md:h-6 md:w-6" />
        <span className="sr-only">Next slide</span>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-2">
        {idList?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex items-center justify-center transition-all ${
              index === currentIndex ? "scale-150" : " hover:text-black/75"
            }`}
            style={{
              color:
                index === currentIndex
                  ? "var(--accent-11)"
                  : "var(--accent-10)",
            }}
          >
            <DotFilledIcon className="w-2 h-2 sm:w-4 sm:h-4" />
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
