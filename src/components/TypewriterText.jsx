import React, { useState, useEffect } from 'react';

const words = [
  'Full-Stack Web Developer',
  'Technical Team Leader @ Goldman Tech',
  'Jimma University CS Candidate',
  'Scalable Systems Architect',
  'Multilingual Problem Solver'
];

export default function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting]);

  return (
    <span className="typewriter-dynamic-text">
      {words[index].substring(0, subIndex)}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}
