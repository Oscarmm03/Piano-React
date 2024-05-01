import React, { useState, useEffect } from 'react';
import './App.css';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import Soundfont from 'soundfont-player';
import 'react-piano/dist/styles.css';

function App() {
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  const [audioContext, setAudioContext] = useState(null);
  const [soundfont, setSoundfont] = useState(null);

  useEffect(() => {
  }, []);

  const initializeAudio = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(audioCtx);

    Soundfont.instrument(audioCtx, 'acoustic_grand_piano').then((sf) => {
      setSoundfont(sf);
    });
  };

  const playNote = (midiNumber) => {
    if (soundfont && audioContext) {
      const note = MidiNumbers.getAttributes(midiNumber).note;
      soundfont.play(note, audioContext.currentTime, { duration: 1 });
    }
  };

  const stopNote = (midiNumber) => {
    };

  return (
    <div>
      {!audioContext && (
        <button className="bg-red-500 text-lg" onClick={initializeAudio}>Iniciar piano</button>
      )}
      {audioContext && soundfont && (
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={playNote}
          stopNote={stopNote}
          width={1000}
          keyboardShortcuts={keyboardShortcuts}
        />
      )}
    </div>
  );
}

export default App;
