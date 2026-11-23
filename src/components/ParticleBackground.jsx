import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: null,
      y: null,
      radius: 140
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Tech tokens that drift in the background
    const techTokens = ['{ }', '</>', '01', 'λ', '⚡', 'API', 'SQL', 'AI', 'GIT', 'ERP', 'PWA'];
    const floatingTokens = [];
    const tokenCount = Math.min(Math.floor(window.innerWidth / 120), 14);

    for (let i = 0; i < tokenCount; i++) {
      floatingTokens.push({
        text: techTokens[i % techTokens.length],
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.floor(Math.random() * 6) + 11,
        opacity: Math.random() * 0.12 + 0.05,
        color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#a855f7' : '#34d399'
      });
    }

    // Constellation Particles
    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 25), 45);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        baseColor: i % 3 === 0 ? 'rgba(56, 189, 248, ' : i % 3 === 1 ? 'rgba(168, 85, 247, ' : 'rgba(59, 130, 246, '
      });
    }

    // Traveling Data Packets along lines
    const packets = [];
    for (let i = 0; i < 8; i++) {
      packets.push({
        fromIndex: Math.floor(Math.random() * particleCount),
        toIndex: Math.floor(Math.random() * particleCount),
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw floating tech code glyphs
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      floatingTokens.forEach((t) => {
        t.x += t.vx;
        t.y += t.vy;

        if (t.x < 0) t.x = width;
        if (t.x > width) t.x = 0;
        if (t.y < 0) t.y = height;
        if (t.y > height) t.y = 0;

        ctx.font = `600 ${t.size}px monospace`;
        ctx.fillStyle = t.color;
        ctx.globalAlpha = t.opacity;
        ctx.fillText(t.text, t.x, t.y);
      });
      ctx.globalAlpha = 1.0;

      // 2. Connect particle network lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            const alpha = 0.18 * (1 - dist / 130);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw moving data packets across connected nodes
      packets.forEach((pkt) => {
        const p1 = particles[pkt.fromIndex];
        const p2 = particles[pkt.toIndex];
        if (p1 && p2) {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            pkt.progress += pkt.speed;
            if (pkt.progress >= 1) {
              pkt.progress = 0;
              pkt.fromIndex = pkt.toIndex;
              pkt.toIndex = Math.floor(Math.random() * particles.length);
            }

            const currentX = p1.x + dx * pkt.progress;
            const currentY = p1.y + dy * pkt.progress;

            ctx.beginPath();
            ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#38bdf8';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#38bdf8';
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            // Re-assign target closer
            pkt.toIndex = Math.floor(Math.random() * particles.length);
          }
        }
      });

      // 4. Update & draw particles with mouse interaction
      particles.forEach((p) => {
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < mouse.radius) {
            const force = (1 - mdist / mouse.radius) * 1.5;
            p.x -= (mdx / mdist) * force;
            p.y -= (mdy / mdist) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor + '0.6)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.baseColor + '0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-particles-canvas" />;
}
