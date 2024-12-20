import React from 'react';

const Content = ({ data }) => (
  <main>
    {data.map((section, index) => (
      <section id={section.title.toLowerCase().replace(' ', '-')} key={index}>
        <h2>{section.title}</h2>
        <ul>
          {section.content.split('\n').map((line, i) => {
            // Check if the line starts with a bullet point
            if (line.trim().startsWith('-')) {
              return <li key={i}>{line.trim().slice(1).trim()}</li>; // Remove the leading '-'
            }
            return <p key={i}>{line}</p>;
          })}
        </ul>
      </section>
    ))}
  </main>
);

export default Content;
