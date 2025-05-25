'use client';
import {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import {DummyFour, DummyOne, DummyThree, DummyTwo} from '@/public/images';
import {useGSAP} from '@gsap/react';

const images = [
  DummyOne,
  DummyTwo,
  DummyThree,
  DummyFour,
  DummyOne,
  DummyTwo,
  DummyThree,
  DummyFour,
  DummyOne,
  DummyTwo,
  DummyThree,
  DummyFour,
];

export default function GsapHorizontalSlider() {
  const [phase, setPhase] = useState('first'); // "single" or "slider"
  const [currentImage, setCurrentImage] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  // Rotate images while in "single" phase
  useEffect(() => {
    if (phase !== 'first') return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 200);

    const timeout = setTimeout(() => {
      setPhase('second');
    }, 1400);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'second') return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        {position: 'absolute', left: '50%', x: '-50%'},
        {
          left: (i) => `${i * 20}%`,
          x: (i) => `0`,
          // stagger: 0.15,
          duration: 2,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to('.single-card', {
              opacity: 0,
              duration: 1.5,
              onComplete: () => {
                gsap.set('.single-card', {display: 'none'});
                // setPhase('slider');
              },
            });
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [phase]);
  // Animate to slider
  useEffect(() => {
    if (phase !== 'slider') return;

    const ctx = gsap.context(() => {
      gsap.to('.single-card', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.set('.single-card', {display: 'none'});

          // Animate in horizontal cards
          gsap.fromTo(
            cardsRef.current,
            {opacity: 0, x: 100},
            {
              opacity: 1,
              x: 0,
              stagger: 0.15,
              duration: 0.6,
              ease: 'power2.out',
            }
          );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [phase]);

  return (
    <div
      className='w-full h-screen flex justify-center items-center mt-20'
      ref={containerRef}
    >
      {/* Single Card */}
      {phase === 'first' && (
        <div className='single-card w-[calc(100%_/_5)] h-auto overflow-hidden rounded-xl shadow-xl'>
          <img
            src={images[currentImage].src}
            alt='rotating'
            className='w-full h-full object-cover'
          />
        </div>
      )}
      {phase === 'second' && (
        <div className='w-full h-full bg-white rounded-xl shadow-xl second_phase flex justify-center items-center'>
          {images.slice(0, 5).map((img, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className='w-[calc(100%_/_5)] h-auto overflow-hidden rounded-xl shadow-xl'
              onClick={() => {
                setPhase('slider');
              }}
            >
              <img
                src={img.src}
                alt={`img-${idx}`}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>
      )}
      {/* Horizontal Slider */}
      {phase === 'slider' && (
        <div className='flex overflow-x-auto gap-4 px-4 max-w-full'>
          {images.map((img, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className='min-w-[calc(100%_/_5)] h-auto rounded-lg overflow-hidden shadow-md opacity-0'
            >
              <img
                src={img?.src}
                alt={`img-${idx}`}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
