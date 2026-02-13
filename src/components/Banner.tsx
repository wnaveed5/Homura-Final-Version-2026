'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Banner() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
      console.log('Mobile detection:', isMobileDevice, 'Width:', window.innerWidth);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopImages = [
    '/images/hat1.jpg',
    '/images/hat2.jpg',
    '/images/hat3.jpg'
  ];

  const mobileImages = [
    '/images/hat1.jpg',
    '/images/hat2.jpg',
    '/images/hat3.jpg'
  ];

  const images = mounted && isMobile ? mobileImages : desktopImages;
  
  console.log('Current images being used:', {
    mounted,
    isMobile,
    images: images,
    imageType: mounted && isMobile ? 'mobile' : 'desktop'
  });

  // Show loading state until mounted to prevent black screen flash
  if (!mounted) {
    return (
      <div className="banner-container">
        <div className="banner-loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="banner-container"
      style={{
        marginTop: isMobile ? '0' : '-3rem',
      }}
    >
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="banner-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${isMobile ? 'mobile' : 'desktop'}-${index}`}>
            <div className="banner-slide">
              <Image 
                src={image} 
                alt={`Homura Hat ${index + 1}`} 
                fill
                priority={index === 0}
                quality={90}
                className="banner-img"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                onLoad={() => {
                  console.log('Image loaded successfully:', image);
                  // Ensure smooth transition when images load
                  const img = document.querySelector(`img[src="${image}"]`) as HTMLImageElement;
                  if (img) {
                    img.style.opacity = '1';
                  }
                }}
                onError={(e) => {
                  console.error('Image failed to load:', image, e);
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}