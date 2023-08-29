'use client';
import { sendTextToOpenAi } from '@/utils/sendTextToOpenAi';
import React, { FormEvent, useCallback, useState } from 'react';

const TextToSpeecH = () => {
  const [userText, setUserText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  const voice = synth?.getVoices();

  const selectedVoice = voice?.find((voice) => voice.name === 'Albert');

  const speak = useCallback(
    (textToSpeak: string) => {
      setIsLoading(true);
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.rate = 0.4;
      }
      synth?.speak(utterance);
      utterance.onend = () => {
        setIsLoading(false);
      };
    },
    [selectedVoice, synth],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      speak(userText ? userText : 'Please enter text');
    },
    [speak, userText],
  );

  const handleUserText = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const message = await sendTextToOpenAi(userText);
      speak(message);
    } catch (err) {
      let message = '';
      if (err instanceof Error) message = err.message;
      console.log('err', message);
    } finally {
      setIsLoading(false);
      setUserText('');
    }
  };

  return (
    <form onChange={handleUserText} className='flex flex-row items-center justify-center gap-4' onSubmit={handleSubmit}>
      <input value={userText} name='userText' type='text' className='bg-transparent max-w-lg w-full rounded-md border border-green-500 p-2' placeholder='What do you want to know human?' />
      <button disabled={isLoading} type='submit' className='bg-orange-900 w-1/5 rounded-md p-2'>
        {isLoading ? 'Processing' : 'Ask'}
      </button>
    </form>
  );
};

export default TextToSpeecH;
