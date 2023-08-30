'use client';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/isPlayingContext';

const TextToSpeech = () => {
	const [userText, setUserText] = useState("");
	const { isPlaying, setIsPlaying } = useContext(AppContext);
	const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
	const voices = synth?.getVoices();
		
	const seletedVoice = voices?.find((voice) => voice.name === "Google US English");

	const speak = (textToSpeak: string) => {
		let utterance = new SpeechSynthesisUtterance(textToSpeak);
		utterance.voice = seletedVoice!;

		synth?.speak(utterance);
		setIsPlaying(true);
		utterance.onend = () => {
			setIsPlaying(false);
		};
	};

	const handleUserText = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (userText === "") return alert("Please enter text");
		speak(userText);
	}

  return (
    <div className="relative top-0 z-50">
    <form
      onSubmit={handleUserText}
      className="absolute top-[800px] left-[30%] space-x-2 pt-2"
    >
      <input
        type="text"
        value={userText}
        className="bg-transparent w-[510px] border border-[#b00c3f]/80 outline-none  rounded-lg placeholder:text-[#b00c3f] p-2 text-[#b00c3f]"
        onChange={(e) => setUserText(e.target.value)}
        placeholder="What do you want me to say?"
      />
      <button
        disabled={isPlaying}
		type='submit'
        className="text-[#b00c3f] p-2 border border-[#b00c3f] rounded-lg disabled:text-blue-100 
        disabled:cursor-not-allowed disabled:bg-gray-500 hover:scale-110 hover:bg-[#b00c3f] hover:text-black duration-300 transition-all"
      >
        {isPlaying ? "thinking..." : "Speak"}
      </button>
    </form>
  </div>
  );
};

export default TextToSpeech;