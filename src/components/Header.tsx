import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";

const Header = () => {
  return (
    <header className="bg-white w-full py-4 px-8 drop-shadow-md ">
      <div className=" flex flex-col sm:flex-row gap-5 items-center sm:items-start">
        <div className="flex gap-[14px] items-center w-fit">
          <Image src={logo} alt={"logo corelab todo"} width={36} height={36} />
          <h3 className="text-text-primary">CoreNotes</h3>
        </div>
        <div className="flex items-center border border-border-primary py-2 px-2 rounded-sm shadow-md">
          <input placeholder="Pesquisar notas" className="text-xs" />
        </div>
      </div>
    </header>
  );
};

export default Header;
