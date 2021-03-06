import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getComments } from '../../store/reviews/actions';
import HomeView from './HomeView';

const Home = () => {
  const [name] = useState('Alexander');
  const reviewsArr = useSelector(({ reviews }) => reviews.reviews);
  const [timer, setTimer] = useState({
    ms: 0,
    s: 0,
    m: 0,
    h: 0,
  });
  const [time] = useState(+new Date());
  const dispatch = useDispatch();

  const featuredRef = React.createRef(null);
  const projectsRef = React.createRef(null);
  const footerRef = React.createRef(null);
  const goToSection = (section) => window.scrollTo({ top: section.current.offsetTop, behavior: 'smooth' });
  const breakPoints = [
    { width: 200, itemsToShow: 1 },
    { width: 800, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
  ];

  let updateH = timer.h;
  let updateM = timer.m;
  let updateS = timer.s;
  let updateMs = timer.ms;

  const run = () => {
    const currentTime = +new Date();
    updateMs = Math.floor(((currentTime - time) / 10) % 100);
    updateS = Math.floor(((currentTime - time) / 1000) % 60);
    updateM = Math.floor(((currentTime - time) / 1000 / 60) % 60);
    updateH = Math.floor(((currentTime - time) / (1000 * 60 * 60)) % 24);
    setTimer({
      ms: updateMs, m: updateM, s: updateS, h: updateH
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      run();
    }, 10);
    dispatch(getComments());
    return () => clearInterval(interval);
  }, []);

  return (
    <HomeView
      name={name}
      goToSection={goToSection}
      footerRef={footerRef}
      featuredRef={featuredRef}
      projectsRef={projectsRef}
      timer={timer}
      reviews={reviewsArr}
      breakPoints={breakPoints}
    />

  );
};

export default Home;
