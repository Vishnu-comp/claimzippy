import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import AQI from './components/AQI';
import Footer from './components/Footer';
import data from './data.json';
import './styles.css';

const App = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent(data.sections);
  }, []);

  return (
    <div>
      <Header />
      <Content data={content} />
      <AQI />
      <br/>
      <br/>
      
      <Footer />
    </div>
  );
};

export default App;
