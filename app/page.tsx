import Image from 'next/image'
import TextToSpeech from './components/TextToSpeech'
import {HeadCanvas} from './components/Canvas'

export default function Home() {
  return (
    <main className='h-screen'>
      <HeadCanvas />
      <TextToSpeech />
    </main>
  )
}
