import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";

const Result = ({ searchTerm }) => {
  const [word, setWord] = useState("");
  const [phonetics, setPhonetics] = useState("");
  const [play, setPlay] = useState(false);
  const [meaning, setMeaning] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`;
      axios
        .get(apiUrl)
        .then((res) => res.data[0])
        .then((data) => {
          setWord(data.word);
          setPhonetics(data.phonetic);
          setMeaning(data.meanings);
          console.log(data);
        });
    }
  }, [searchTerm]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return; 
    const handlePlay = () => setPlay(true);
    const handlePause = () => setPlay(false);
    

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);


    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef]);



  const handleAudio = () => {
    const audio = audioRef.current;

    if (play) {
      audio.pause();
      setPlay(false)
    } else {
        audio.play();
        setPlay(true)
    }
  };

  return (
    <div>
      {word && (
        <>
          <div className="flex justify-between items-center pt-6 pb-4">
            <div>
              <h2 className="font-bold text-4xl font-space">{word}</h2>
              <p className="font-medium text-2xl text-[#A745EF] font-sans">
                {phonetics}
              </p>
            </div>
            <div className="text-5xl bg-[#EACFFA] rounded-full">
              {play && (
                <button onClick={handleAudio}>
                  <AiOutlinePauseCircle color="#A745EF" />
                </button>
              )}
              {!play && (
                <button onClick={handleAudio}>
                  <AiOutlinePlayCircle color="#A745EF" />
                </button>
              )}
            </div>
          </div>
          <div>
          {word && <audio ref={audioRef} src={`https://ssl.gstatic.com/dictionary/static/sounds/oxford/${word}--_gb_1.mp3`} />}
            {meaning.map((mean) => {
              return (
                <>
                  <div className="pt-6 pb-4">
                    <p className="font-bold text-xl font-space">
                      {mean.partOfSpeech}
                    </p>
                    <hr className="bg-slate-400" />
                  </div>

                  <ul className="list-disc list-outside  marker:text-[#A745EF]">
                    {mean.definitions.map((definition) => {
                      return <li className="py-1">{definition.definition}</li>;
                    })}
                  </ul>
                  {mean.synonyms.length > 0 && (
                    <div className="py-2">
                      <p className="font-semibold text-base text-gray-400">
                        Synonyms
                      </p>
                      <div className="flex overflow-auto gap-x-2 scrollbar-hide">
                        {mean.synonyms.map((synonym) => {
                          return (
                            <div className="flex flex-wrap space-x-2 justify-center items-center">
                              <div className="bg-[#EACFFA] px-2 py-1 rounded-lg">
                                {synonym}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  

                  {mean.antonyms.length > 0 && (
                    <div className="py-2">
                      <p className="font-semibold text-base text-gray-400">
                        Antonyms
                      </p>
                      <div className="flex overflow-auto gap-x-2 scrollbar-hide">
                        {mean.antonyms.map((antonym) => {
                          return (
                            <div className="flex flex-wrap space-x-2 justify-center items-center">
                              <div className="bg-[#EACFFA] px-2 py-1 rounded-lg">
                                {antonym}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Result;
