import React, { useEffect, useRef } from "react";

const randomIntFromInterval = (mn, mx) =>
  ~~(Math.random() * (mx - mn + 1) + mn);
const rad = Math.PI / 180;
const kappa = 0.5522847498;

const BalloonCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const balloonsRef = useRef([]);
  const framesRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bc = document.createElement("canvas");
    const bCtx = bc.getContext("2d");
    let cw = (canvas.width = bc.width = window.innerWidth);
    let ch = (canvas.height = bc.height = window.innerHeight + 100);

    const resize = () => {
      cw = canvas.width = bc.width = window.innerWidth;
      ch = canvas.height = bc.height = window.innerHeight + 100;
      bCtx.strokeStyle = "#abcdef";
      bCtx.lineWidth = 1;
    };

    const drawBalloon = (b, ctx) => {
      const or = b.r * kappa;
      const p1 = { x: b.cx - b.r, y: b.cy };
      const pc11 = { x: p1.x, y: p1.y + or };
      const pc12 = { x: p1.x, y: p1.y - or };
      const p2 = { x: b.cx, y: b.cy - b.r };
      const pc21 = { x: b.cx - or, y: p2.y };
      const pc22 = { x: b.cx + or, y: p2.y };
      const p3 = { x: b.cx + b.r, y: b.cy };
      const pc31 = { x: p3.x, y: p3.y - or };
      const pc32 = { x: p3.x, y: p3.y + or };
      const p4 = { x: b.cx, y: b.cy + b.R };
      const pc41 = { x: p4.x + or, y: p4.y };
      const pc42 = { x: p4.x - or, y: p4.y };
      const t1 = {
        x: p4.x + 0.2 * b.r * Math.cos(70 * rad),
        y: p4.y + 0.2 * b.r * Math.sin(70 * rad),
      };
      const t2 = {
        x: p4.x + 0.2 * b.r * Math.cos(110 * rad),
        y: p4.y + 0.2 * b.r * Math.sin(110 * rad),
      };

      ctx.beginPath();
      ctx.moveTo(p4.x, p4.y);
      ctx.bezierCurveTo(pc42.x, pc42.y, pc11.x, pc11.y, p1.x, p1.y);
      ctx.bezierCurveTo(pc12.x, pc12.y, pc21.x, pc21.y, p2.x, p2.y);
      ctx.bezierCurveTo(pc22.x, pc22.y, pc31.x, pc31.y, p3.x, p3.y);
      ctx.bezierCurveTo(pc32.x, pc32.y, pc41.x, pc41.y, p4.x, p4.y);
      ctx.lineTo(t1.x, t1.y);
      ctx.lineTo(t2.x, t2.y);
      ctx.closePath();
      ctx.fill();
    };

    const thread = (b, ctx) => {
      ctx.beginPath();
      let x, y;
      for (let i = b.a; i > 0; i -= 1) {
        const t = i * rad;
        x = b.x + b.pm * 50 * Math.cos(b.k * t - framesRef.current * rad);
        y =
          b.y +
          b.pm * 25 * Math.sin(b.k * t - framesRef.current * rad) +
          50 * t;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      return { x, y };
    };

    const updateBallons = (ctx) => {
      framesRef.current += 1;
      if (framesRef.current % 37 === 0 && balloonsRef.current.length < 37) {
        balloonsRef.current.push(new Balloon());
      }
      ctx.clearRect(0, 0, cw, ch);
      balloonsRef.current.forEach((b, i) => {
        if (b.y > -b.a) {
          b.y -= b.speed;
        } else {
          b.y = parseInt(ch + b.r + b.R);
        }
        const p = thread(b, ctx);
        b.cx = p.x;
        b.cy = p.y - b.R;
        ctx.fillStyle = Grd(p.x, p.y, b.r, b.hue);
        drawBalloon(b, ctx);
      });
    };

    const loop = () => {
      updateBallons(bCtx);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(bc, 0, 0);
      animationRef.current = requestAnimationFrame(loop);
    };

    const Balloon = function () {
      this.r = randomIntFromInterval(20, 70);
      this.R = 1.4 * this.r;
      this.x = randomIntFromInterval(this.r, cw - this.r);
      this.y = ch + 2 * this.r;
      this.a = this.r * 4.5;
      this.pm = Math.random() < 0.5 ? -1 : 1;
      this.speed = randomIntFromInterval(1.5, 4);
      this.k = this.speed / 5;
      this.hue = this.pm > 0 ? "210" : "10";
    };

    const Grd = (x, y, r, hue) => {
      const grd = ctx.createRadialGradient(
        x - 0.5 * r,
        y - 1.7 * r,
        0,
        x - 0.5 * r,
        y - 1.7 * r,
        r
      );
      grd.addColorStop(0, `hsla(${hue},100%,65%,.95)`);
      grd.addColorStop(0.4, `hsla(${hue},100%,45%,.85)`);
      grd.addColorStop(1, `hsla(${hue},100%,25%,.80)`);
      return grd;
    };

    const init = () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      resize();
      draw();
    };

    const draw = () => {
      updateBallons(bCtx);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(bc, 0, 0);
      animationRef.current = requestAnimationFrame(draw);
    };

    setTimeout(() => {
      init();
      window.addEventListener("resize", init);
    }, 15);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas id="c" ref={canvasRef} />;
};

export default BalloonCanvas;
