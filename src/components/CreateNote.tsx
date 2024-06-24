import React from "react";
import StarIcon from "./Icons/StarIcon";

const CreateNote = () => {
  return (
    <div className="bg-white max-w-[530px] rounded-3xl border border-border-primary shadow-md mb-10">
      <div className="flex items-center border-b border-border-primary px-6 py-3">
        <input
          maxLength={25}
          placeholder="Título"
          className="font-bold text-black placeholder:text-black focus:outline-none"
        />
        <StarIcon className="fill-black" />
      </div>
      <div className="px-6 py-3 min-h-16">
        <textarea
          placeholder="Criar nota..."
          className="placeholder:text-text-placeholder focus:outline-none w-full h-24 resize-none text-text-text"
        />
      </div>
    </div>
  );
};

export default CreateNote;
