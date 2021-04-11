import React from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "./CarouselItem";

// Info on photo carousel: https://www.npmjs.com/package/react-material-ui-carousel#props

export default function PhotoCarousel() {
  var items = [
    {
      title: "What makes coffee sooo good...",
      image: "1",
      href: "/blog/view/How%20It's%20Roasted",
    },
    {
      title: "What coffee best suits me?",
      image: "2",
      href: "/blog/view/Roast%20Levels",
    },
    {
      title: "Robusta vs Arabica",
      image: "3",
      href: "/blog/view/Robusta%20vs.%20Arabica",
    },
    {
      title: "Where it grows",
      image: "4",
      href: "/blog/view/Where%20It%20Grows",
    },
  ];
  return (
    <Carousel
      swipe={true}
      animation="slide"
      autoPlay={true}
      stopAutoPlayOnHover={false}
      interval={8000}
    >
      {items.map((item, i) => (
        <CarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
}
