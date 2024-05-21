import React, { useEffect, useRef } from "react";

const PI2 = Math.PI * 2;
const random = (min, max) => (Math.random() * (max - min + 1) + min) | 0;
const timestamp = () => new Date().getTime();

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false;
    this.offsprings = offsprings;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.shade = shade;
    this.history = [];
  }

  update(delta, ctx, birthday) {
    if (this.dead) return;

    let xDiff = this.targetX - this.x;
    let yDiff = this.targetY - this.y;
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
      this.x += xDiff * 2 * delta;
      this.y += yDiff * 2 * delta;

      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > 20) this.history.shift();
    } else {
      if (this.offsprings && !this.madeChilds) {
        let babies = this.offsprings / 2;
        for (let i = 0; i < babies; i++) {
          let targetX =
            (this.x + this.offsprings * Math.cos((PI2 * i) / babies)) | 0;
          let targetY =
            (this.y + this.offsprings * Math.sin((PI2 * i) / babies)) | 0;
          birthday.fireworks.push(
            new Firework(this.x, this.y, targetX, targetY, this.shade, 0)
          );
        }
      }
      this.madeChilds = true;
      this.history.shift();
    }

    if (this.history.length === 0) this.dead = true;
    else if (this.offsprings) {
      for (let i = 0; this.history.length > i; i++) {
        let point = this.history[i];
        ctx.beginPath();
        ctx.fillStyle = `hsl(${this.shade},100%,${i}%)`;
        ctx.arc(point.x, point.y, 1, 0, PI2, false);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.fillStyle = `hsl(${this.shade},100%,50%)`;
      ctx.arc(this.x, this.y, 1, 0, PI2, false);
      ctx.fill();
    }
  }
}

class Birthday {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.resize();
    this.fireworks = [];
    this.counter = 0;
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    let center = (this.width / 2) | 0;
    this.spawnA = (center - center / 4) | 0;
    this.spawnB = (center + center / 4) | 0;
    this.height = this.canvas.height = window.innerHeight;
    this.spawnC = this.height * 0.1;
    this.spawnD = this.height * 0.5;
  }

  onClick(evt) {
    let x = evt.clientX || (evt.touches && evt.touches[0].pageX);
    let y = evt.clientY || (evt.touches && evt.touches[0].pageY);
    let count = random(3, 5);
    for (let i = 0; i < count; i++) {
      this.fireworks.push(
        new Firework(
          random(this.spawnA, this.spawnB),
          this.height,
          x,
          y,
          random(0, 260),
          random(30, 110)
        )
      );
    }
    this.counter = -1;
  }

  update(delta) {
    this.ctx.globalCompositeOperation = "hard-light";
    this.ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.globalCompositeOperation = "lighter";
    for (let firework of this.fireworks) firework.update(delta, this.ctx, this);

    this.counter += delta * 3;
    if (this.counter >= 1) {
      this.fireworks.push(
        new Firework(
          random(this.spawnA, this.spawnB),
          this.height,
          random(0, this.width),
          random(this.spawnC, this.spawnD),
          random(0, 360),
          random(30, 110)
        )
      );
      this.counter = 0;
    }

    if (this.fireworks.length > 1000) {
      this.fireworks = this.fireworks.filter((firework) => !firework.dead);
    }
  }
}

const FireworksCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const birthdayRef = useRef(null);
  const thenRef = useRef(timestamp());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    birthdayRef.current = new Birthday(canvas, ctx);

    const handleResize = () => birthdayRef.current.resize();
    const handleClick = (evt) => birthdayRef.current.onClick(evt);

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleClick);

    const loop = () => {
      const now = timestamp();
      const delta = now - thenRef.current;
      thenRef.current = now;
      birthdayRef.current.update(delta / 1000);
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleClick);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas id="birthday" ref={canvasRef} />;
};

export default FireworksCanvas;
