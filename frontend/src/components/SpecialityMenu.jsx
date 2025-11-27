
import React, { useRef, useState, useEffect } from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SpecialityMenu = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;
    checkScroll();
    ref.addEventListener('scroll', checkScroll);
    return () => ref.removeEventListener('scroll', checkScroll);
  }, []);

  return (


    // <div id="speciality" className="flex flex-col items-center gap-4 px-4 mt-20">
    //   {/* Heading */}
    //   <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-100">
    //     Find the service
    //   </h1>
    //   <p className="sm:w-1/3 text-center text-sm text-gray-700 dark:text-gray-300">
    //     Find the best service for your home. Happiness is here — simply browse.
    //   </p>

    //   <div className="relative w-full pt-5 overflow-x-auto">
    //     {/* Left Arrow */}
    //     {canScrollLeft && (
    //       <button
    //         onClick={() => scroll('left')}
    //         className="absolute left-0 top-1/2 -translate-y-1/2 
    //            bg-white/90 dark:bg-gray-700/60 
    //            text-gray-700 dark:text-gray-200 
    //            shadow-lg rounded-full p-2 z-10 
    //            hover:bg-primary hover:text-white 
    //            dark:hover:bg-primary dark:hover:text-white 
    //            transition-colors duration-300 hover:scale-110 dark:hover:scale-110"
    //       >
    //         <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
    //       </button>
    //     )}

    //     {/* Scrollable List */}
    //     <div
    //       ref={scrollRef}
    //       className="flex gap-6 px-10 w-full overflow-x-auto scroll-smooth"
    //     >
    //       {Array.isArray(specialityData) &&
    //         specialityData.map((item, index) => (
    //           <Link
    //             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    //             className="flex flex-col items-center text-xs cursor-pointer 
    //                        hover:-translate-y-2 transition-all duration-300 min-w-[80px] 
    //                        text-gray-800 dark:text-gray-200"
    //             key={index}
    //             to={`/service/${item.speciality}`}
    //           >
    //             <img
    //               className="w-12 sm:w-16 mb-1"
    //               src={item.image}
    //               alt={item.speciality}
    //             />
    //             <p>{item.speciality}</p>
    //           </Link>
    //         ))}
    //     </div>

    //     {/* Right Arrow */}
    //     {canScrollRight && (
    //       <button
    //         onClick={() => scroll('right')}
    //         className="absolute right-0 top-1/2 -translate-y-1/2 
    //            bg-white/90 dark:bg-gray-700/60 
    //            text-gray-700 dark:text-gray-200 
    //            shadow-lg rounded-full p-2 z-10 
    //            hover:bg-primary hover:text-white 
    //            dark:hover:bg-primary dark:hover:text-white 
    //            transition-colors duration-300 hover:scale-110 dark:hover:scale-110"
    //       >
    //         <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
    //       </button>
    //     )}
    //   </div>
    // </div>

   <div
  id="speciality"
  className="flex flex-col items-center gap-6 px-4 mt-20 relative"
>
  {/* Heading */}
  <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 text-center animate-fade-in">
    Find the <span className="text-primary">Best Service</span>
  </h1>

  <p className="sm:w-1/3 text-center text-sm text-gray-700 dark:text-gray-300 animate-fade-in-delay">
    Discover top-rated professionals for your home and lifestyle.
    Your comfort starts here — browse and book effortlessly.
  </p>

  {/* Scrollable Wrapper */}
  <div className="relative w-full pt-6 overflow-hidden">
    {/* Left Arrow */}
    {canScrollLeft && (
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 
          bg-white/90 dark:bg-gray-800/70 
          text-gray-800 dark:text-gray-200 
          shadow-xl rounded-full p-2 z-10 
          hover:bg-primary hover:text-white 
          transition-all duration-300 ease-in-out 
          hover:scale-110 active:scale-95 backdrop-blur-md dark:hover:bg-primary"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    )}

    {/* Scrollable List */}
    <div
      ref={scrollRef}
      className="flex gap-3 px-10 w-full overflow-x-auto scroll-smooth 
                 scrollbar-thin scrollbar-thumb-gray-400/50 dark:scrollbar-thumb-gray-600/60 
                 scrollbar-track-transparent hover:scrollbar-thumb-primary/70 pb-4"
    >
      {Array.isArray(specialityData) &&
        specialityData.map((item, index) => (
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            key={index}
            to={`/service/${item.speciality}`}
            className="flex flex-col items-center justify-center text-sm cursor-pointer
                       min-w-[90px] sm:min-w-[100px] md:min-w-[110px]
                       rounded-2xl transition-all duration-500 ease-out 
                       text-gray-800 dark:text-gray-200 group relative overflow-visible"
          >
            {/* Image */}
            <img
              className="w-12 sm:w-16 mb-2 transform group-hover:scale-110 transition-transform duration-500"
              src={item.image}
              alt={item.speciality}
            />
            <p
              className="font-medium text-center leading-tight 
                         max-w-[120px] sm:max-w-[140px] break-words
                         group-hover:text-primary transition-colors duration-300"
            >
              {item.speciality}
            </p>
          </Link>
        ))}
    </div>

    {/* Right Arrow */}
    {canScrollRight && (
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 
          bg-white/90 dark:bg-gray-800/70 
          text-gray-800 dark:text-gray-200 
          shadow-xl rounded-full p-2 z-10 
          hover:bg-primary hover:text-white 
          transition-all duration-300 ease-in-out 
          hover:scale-110 active:scale-95 backdrop-blur-md dark:hover:bg-primary"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    )}
  </div>
</div>



  );
};

export default SpecialityMenu;
