import Image from 'next/image'
import TextToSpeech from './components/TextToSpeech'
import {HeadCanvas} from './components/Canvas'
import { IsPlayingProvider } from './context/isPlayingContext'

export default function Home() {
  return (
    <main className='h-screen relative'>
      <IsPlayingProvider>
        <HeadCanvas />
        <TextToSpeech />
      </IsPlayingProvider>
    </main>
  )
}
