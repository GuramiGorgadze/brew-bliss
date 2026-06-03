import { useState, useRef } from 'react';

export default function ImageMagnifier({ src, alt, zoom = 2.5, size = 180 }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        className="image-magnifier"
        ref={imgRef}
        src={src}
        alt={alt}
      />

      {show && (
        <div
          className="image-magnifier__magnifier"
          style={{
            top: `${pos.y}%`,
            left: `${pos.x}%`,
            width: size,
            height: size,
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoom * 100}%`,
            backgroundPosition: `${pos.x}% ${pos.y}%`,
          }}
        />
      )}
    </div>
  );
}
