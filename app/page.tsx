'use client';
import Image from 'next/image';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useRef} from 'react';

export default function Home() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    let horizontalSection = gsap.utils.toArray<HTMLDivElement>('.box');
    horizontalSection.forEach((box) => {
      let section = box.querySelectorAll('.content');
      console.log(box.getBoundingClientRect().width * section.length);
      console.log(box.getBoundingClientRect().width);
      console.log(section.length);
      console.log(box.scrollWidth);

      gsap.to(section, {
        xPercent: -100 * (section.length - 1),
        ease: 'none',
        width: box.getBoundingClientRect().width,
        scrollTrigger: {
          trigger: box,
          pin: true,
          scrub: true,
          start: 'top top',
          end: () => `+=${box.scrollWidth}`,
          markers: true,
        },
      });
      setTimeout(() => {
        console.log('Final Width:', box.getBoundingClientRect().width);
      }, 1000);
      const sectionTimeline = gsap.timeline({
        scrollTrigger: {},
      });
    });
  }, []);

  return (
    <div className='parent'>
      <div className='intro'>
        <h1>Introduction</h1>
      </div>
      <div className='box' style={{backgroundColor: '#FFB5B5'}}>
        <div className='content' style={{backgroundColor: '#B5D8FF'}}>
          <h1>ONE</h1>
        </div>
        <div className='content' style={{backgroundColor: '#FF6B6B'}}>
          <h1>TWO</h1>
        </div>
        <div className='content' style={{backgroundColor: '#4ECDC4'}}>
          <h1>THREE</h1>
        </div>
        <div className='content' style={{backgroundColor: '#45B7D1'}}>
          <h1>FOUR</h1>
        </div>
      </div>
    </div>
  );
}
