import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const slidersData = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "Delicious Pepperoni Pizza",
      buttonText: "Add to Cart",
      price: "12.99",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/2119758/pexels-photo-2119758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "Juicy Cheeseburger",
      buttonText: "Add to Cart",
      price: "9.99",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/28701160/pexels-photo-28701160/free-photo-of-colorful-japanese-sushi-platter-with-tea.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "Fresh Sushi Platter",
      buttonText: "Add to Cart",
      price: "15.99",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/5639532/pexels-photo-5639532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "Creamy Alfredo Pasta",
      buttonText: "Add to Cart",
      price: "10.99",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/628777/pexels-photo-628777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "Healthy Garden Salad",
      buttonText: "Add to Cart",
      price: "7.99",
    },
    {
      id: 6,
      image:
        "https://images.pexels.com/photos/6413444/pexels-photo-6413444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      heading: "Indulgent Chocolate Sundae",
      buttonText: "Add to Cart",
      price: "5.99",
    },
  ];

  return (
    <section className="hero h-[80vh] relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1000}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.update();
        }}
        modules={[Autoplay, Keyboard, Navigation]}
        className="mySwiper w-full h-full"
      >
        {slidersData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slider-container relative w-full h-full">
              {/* Image with adjusted positioning */}
              <img
                src={slide.image}
                alt={slide.heading}
                className="w-full h-full object-cover relative"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              {/* Content overlay */}
              <div className="absolute left-[10%] bottom-[20%] z-50 text-white">
                <h1 className="slider-heading text-white">{slide.heading}</h1>
                <p className="slider-text">&#8377; {slide.price}</p>
                <Button className="mt-3" size="lg">{slide.buttonText}</Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* custom arrows */}
      <button className="slider-btn slider-prev-btn left-0" ref={prevRef}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button className="slider-btn slider-next-btn right-0" ref={nextRef}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </section>
  );
};

export default Hero;
