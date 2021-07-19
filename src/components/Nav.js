import { render } from '@testing-library/react';
import React, { useState, useRef, useEffect } from 'react';

function Nav() {
  const canvasRef = useRef(null);

  const draw = (canvas, ctx, frameCount, moveSlowly, fadeInWave) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.moveTo(fadeInWave, 0);
    for (let i = 0; i < canvas.height; i++) {
      ctx.lineTo(
        fadeInWave +
          Math.sin(i * 0.0005 * frameCount + moveSlowly) *
            90 *
            Math.sin(frameCount),
        i
      );
      // ctx.lineTo(
      //   fadeInWave * Math.sin(fadeInWave * 0.003) +
      //     Math.sin(i * 0.0005 * frameCount + moveSlowly) *
      //       90 *
      //       Math.sin(frameCount),
      //   i
      // );
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let moveSlowly = 0.01;
    let fadeInWave = canvas.width;
    let frameCount = 30;
    let animationFrameId;
    const render = () => {
      fadeInWave = fadeInWave - 15;
      moveSlowly = moveSlowly + 0.1;
      draw(canvas, ctx, frameCount, moveSlowly, fadeInWave);
      animationFrameId = window.requestAnimationFrame(render);
      frameCount = frameCount - 0.23;
      if (fadeInWave <= 0) {
        fadeInWave = 0;
      }
      if (frameCount <= 0) {
        frameCount = 0;
      }
    };
    // const canvas = canvasRef.current;
    // const ctx = canvas.getContext('2d');
    // let moveSlowly = 0.01;
    // let fadeInWave = canvas.width;
    // let frameCount = 20;
    // let animationFrameId;
    // const render = () => {
    //   fadeInWave = fadeInWave - 10;
    //   moveSlowly = moveSlowly + 0.1;
    //   draw(canvas, ctx, frameCount, moveSlowly, fadeInWave);
    //   animationFrameId = window.requestAnimationFrame(render);
    //   frameCount = frameCount - 0.08;
    //   if (fadeInWave <= 0) {
    //     fadeInWave = 0;
    //   }
    // };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
}

export default Nav;
