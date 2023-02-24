import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Result from "./Result";
const SearchBox = () => {
    const [word, setWord] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const handleWord = (e) => {
        // setWord(e.target.value)
        e.preventDefault();
        if(word !== undefined){
            setSearchTerm(word)
        }
    }
      
  return (
    <div className="md:w-[50vw] w-[80vw] mx-auto">
      {/* <input className="bg-gray-300 px-4 py-2 w-full rounded-lg relative" placeholder="Enter the word....  " type="text" name="text" id="word" />
      <button className="right-0">
        <AiOutlineSearch />
      </button> */}
      <form onSubmit={handleWord} className="relative rounded-lg ">
        <input
          className="w-full rounded-lg py-2 pl-4 pr-12 bg-[#F4F4F4] focus:outline outline-[#A745EF] outline-2 outline-offset-2"
          type="text"
          name="text" 
          id="word"
          placeholder="Enter the word.... "
          onChange={(e)=>setWord(e.target.value)}
        />
        <button className="absolute top-0 right-0 text-3xl p-1 font-bold">
          <AiOutlineSearch color="#A745EF" />
        </button>
      </form>
      <Result searchTerm={searchTerm} />
    </div>
  );
};

export default SearchBox;

  
