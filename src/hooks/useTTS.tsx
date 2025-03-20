
import { useState, useCallback, useRef } from 'react';

interface TTSHookReturnType {
  speak: (text: string) => Promise<void>;
  stop: () => void;
  isSpeaking: boolean;
  error: string | null;
}

export function useTTS(): TTSHookReturnType {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(async (text: string): Promise<void> => {
    try {
      // Stop any currently playing speech
      stop();
      
      setError(null);
      setIsSpeaking(true);
      
      // For now we'll use the browser's built-in speech synthesis
      // This will be replaced with Eleven Labs in a production environment
      const speech = new SpeechSynthesisUtterance(text);
      
      // Set voice to a more natural sounding one if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || // Prefer Google voices on Chrome
        voice.name.includes('Daniel') || // Good voice on Safari/macOS
        voice.name.includes('Microsoft')  // Good voice on Edge/Windows
      );
      
      if (preferredVoice) {
        speech.voice = preferredVoice;
      }
      
      speech.rate = 1.0;
      speech.pitch = 1.0;
      speech.volume = 1.0;
      
      return new Promise((resolve) => {
        speech.onend = () => {
          setIsSpeaking(false);
          resolve();
        };
        
        speech.onerror = (event) => {
          setError(`Speech synthesis error: ${event.error}`);
          setIsSpeaking(false);
          resolve();
        };
        
        window.speechSynthesis.speak(speech);
      });
    } catch (err) {
      setError(`TTS error: ${err instanceof Error ? err.message : String(err)}`);
      setIsSpeaking(false);
      return Promise.resolve();
    }
  }, [stop]);

  return { speak, stop, isSpeaking, error };
}
