//- components/palette.tsx

'use client';

import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { getRandomHexColor, isColorDark } from '@/libs/color';
import { LockKeyhole, LockKeyholeOpen, Copy, ClipboardCheck } from 'lucide-react';

interface Color {
  hex: string;
  locked: boolean;
}

const PaletteComp = () => {
  const totalColors = Number(process.env.NEXT_PUBLIC_TOTAL_PALETTE) || 12;
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    const initialColors = Array.from({ length: totalColors }, () => ({
      hex: getRandomHexColor(true),
      locked: false,
    }));
    setColors(initialColors);
  }, [totalColors]);

  const generateColors = () => {
    const newColors = colors.map(color => color.locked ? color : { hex: getRandomHexColor(), locked: false });
    setColors(newColors);
  };

  const toggleLock = (index: number) => {
    const newColors = [...colors];
    newColors[index].locked = !newColors[index].locked;
    setColors(newColors);
  };

  const [isCopied, setIsCopied] = useState<boolean[]>(new Array(colors.length).fill(false));
  const copyToClipboard = (copyText: string, copyIndex: number) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText);
      } else {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = copyText;
        tempTextArea.style.position = 'fixed';
        tempTextArea.style.left = '-9999px';
        tempTextArea.style.top = '0';
        document.body.appendChild(tempTextArea);
        tempTextArea.focus();
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
      }

      setIsCopied(prevIsCopied => {
        const newIsCopied = [...prevIsCopied];
        newIsCopied[copyIndex] = true;
        return newIsCopied;
      });

      setTimeout(() => setIsCopied(prevIsCopied => {
        const newIsCopied = [...prevIsCopied];
        newIsCopied[copyIndex] = false;
        return newIsCopied;
      }), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setIsCopied(prevIsCopied => {
        const newIsCopied = [...prevIsCopied];
        newIsCopied[copyIndex] = false;
        return newIsCopied;
      });
    }
  };

  const handleReset = () => {
    const newColors = colors.map(() => ({ hex: '#ffffff', locked: false }));
    setColors(newColors);
  };

  return (
    <>
      <div className="flex rounded-lg" role="group">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold text-lg mb-8 cursor-pointer border border-gray-200 rounded-l-4xl"
          onClick={generateColors}
        >
          Generate
        </button>
        <button
          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-8 py-3 font-semibold text-lg mb-8 cursor-pointer border border-gray-200 rounded-r-4xl"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-5 text-center items-center max-w-6xl mx-auto mt-4">
        {colors.map((color, index) => (
          <div key={index} className="text-center mb-4 group">
            <div
              className="flex w-32 h-48 rounded-lg transition-all duration-300 transform group-hover:scale-105 cursor-pointer items-center justify-center"
              style={{ backgroundColor: color.hex }}
            >
              <button
                title={color.locked ? 'Klik untuk membuka kunci' : 'Klik untuk mengunci'}
                className={`cursor-pointer group-hover:opacity-100 ${color.locked || isMobile ? 'opacity-100' : 'opacity-0'} ${isColorDark(color.hex) ? 'text-sky-200' : 'text-black'}`}
                onClick={() => toggleLock(index)}
              >
                {color.locked ? (<LockKeyhole />) : (<LockKeyholeOpen />)}
              </button>
            </div>

            <button
              id="hex-"
              title="Click to copy to clipboard"
              onClick={() => copyToClipboard(color.hex, index)}
              disabled={isCopied[index]}
              className="w-32 mt-2 text-white bg-slate-800 hover:bg-slate-700 rounded-lg px-2 py-1 text-sm cursor-pointer transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center"
            >
              {isCopied[index]
                ? (<><ClipboardCheck size={14} className='mr-2 text-green-600' /><span className="text-green-600 font-mono">Copied!</span></>)
                : (<><Copy size={14} className='mr-2' /><span className='font-mono'>{color.hex}</span></>)
              }
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default PaletteComp;
