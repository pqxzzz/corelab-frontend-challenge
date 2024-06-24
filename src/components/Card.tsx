"use client";
import React, { useState } from "react";
import { CardProps } from "../types/CardProps";
import StarIcon from "./Icons/StarIcon";
import PenIcon from "./Icons/PenIcon";
import XIcon from "./Icons/XIcon";
import InkBucket from "./Icons/InkBucket";
import customColors, { CustomColorKey } from "../utils/customColors";

const Card: React.FC<CardProps> = ({
  title,
  isFavorite,
  description,
  color
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentIsFavorite, setCurrentIsFavorite] = useState(isFavorite);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState<CustomColorKey>(
    color as CustomColorKey
  );

  const handleChangeIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurrentDescription(e.target.value);
  };

  const handleFavoriteToggle = () => {
    if (isEditing) {
      setCurrentIsFavorite(!currentIsFavorite);
    }
  };

  const handleInkBucketClick = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  const handleColorSelect = (color: CustomColorKey) => {
    setCurrentColor(color);
    setIsColorPickerOpen(false);
  };

  const backgroundColor = customColors[currentColor] || "white";

  return (
    <div
      style={{ backgroundColor }}
      className="min-w-[390px] max-w-[530px] rounded-3xl shadow-md mb-10 w-full relative"
    >
      <div className="flex items-center justify-between border-b px-6 pt-4 pb-3">
        <input
          maxLength={25}
          placeholder="Título"
          disabled={!isEditing}
          value={currentTitle}
          onChange={handleTitleChange}
          className={`font-bold text-black placeholder:text-black focus:outline-none bg-transparent`}
        />
        <button onClick={handleFavoriteToggle}>
          <StarIcon
            className="fill-black"
            backgroundColor={backgroundColor}
            isFavorite={currentIsFavorite}
          />
        </button>
      </div>
      <div className="px-6 py-3 min-h-16">
        <textarea
          placeholder="Descrição"
          disabled={!isEditing}
          value={currentDescription}
          onChange={handleDescriptionChange}
          className="text-text-text h-24 resize-none w-full placeholder:text-black focus:outline-none bg-transparent"
        />
      </div>
      <div className="flex items-center justify-between py-3 px-6">
        <div className="flex gap-1 relative">
          <div
            className={`w-7 h-7 flex items-center justify-center ${
              isEditing ? "bg-buttonSelected" : ""
            } rounded-full focus:outline-none`}
          >
            <button onClick={handleChangeIsEditing}>
              <PenIcon
                width={24}
                heigh={24}
                className="fill-slate-500 w-[18px]"
              />
            </button>
          </div>

          <button onClick={handleInkBucketClick}>
            <InkBucket width={18} heigh={17} />
          </button>

          {isColorPickerOpen && (
            <div className="absolute bg-white border p-2 mt-8 rounded-lg w-[200px] grid grid-cols-6 gap-2 z-10">
              {Object.keys(customColors).map((colorKey) => (
                <div
                  key={colorKey}
                  className="w-6 h-6 rounded-full cursor-pointer"
                  style={{
                    backgroundColor: customColors[colorKey as CustomColorKey]
                  }}
                  onClick={() => handleColorSelect(colorKey as CustomColorKey)}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <button>
            <XIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
