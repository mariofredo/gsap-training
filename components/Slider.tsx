import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
export default function Slider({data}: {data: any}) {
  return (
    <Swiper slidesPerView={5} draggable>
      {data.map((item: any, index: number) => (
        <SwiperSlide key={`slide_key_${index}`}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
}
