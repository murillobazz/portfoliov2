import { useRef, useState, useEffect, useCallback } from 'react';

const PADDLE_H = 30;
const PADDLE_W = 8;
const BALL_R = 5;
const PAD_X = 14;
const AI_SPEED = 1.8;      // base AI speed — slow enough to beat
const AI_ERROR = 18;       // px of random offset so AI doesn't aim perfectly
const BALL_START_V = 4.5;  // faster starting speed
const BALL_ACCEL  = 1.15;  // multiply speed on each paddle hit
const MAX_V = 12;
const WIN_SCORE = 3; // best of 5 → first to 3

function makeBall(canvasW, canvasH, direction = 1, speed = BALL_START_V) {
  const clampedSpeed = Math.min(speed, MAX_V);
  // Randomise vertical component; derive horizontal so total speed magnitude is preserved
  const velY = (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1);
  const velX = Math.sqrt(Math.max(clampedSpeed * clampedSpeed - velY * velY, 1)) * direction;
  return { x: canvasW / 2, y: canvasH / 2, vx: velX, vy: velY };
}

export function PongCard() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState(null); // 'won' | 'lost' | null
  const stateRef = useRef(null);
  const rafRef = useRef(null);
  const dragging = useRef(false);

  const movePaddle = useCallback((clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || !stateRef.current) return;
    const rect = canvas.getBoundingClientRect();
    const paddleY = clientY - rect.top - PADDLE_H / 2;
    stateRef.current.left.y = Math.max(0, Math.min(canvas.height - PADDLE_H, paddleY));
  }, []);

  // Non-passive touchmove so we can preventDefault and stop page scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onTouchMove = (e) => {
      if (!dragging.current) return;
      e.preventDefault();
      movePaddle(e.touches[0].clientY);
    };
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => container.removeEventListener('touchmove', onTouchMove);
  }, [movePaddle]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to match its CSS layout dimensions
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const ctx = canvas.getContext('2d');

    const state = {
      ball:  makeBall(canvasW, canvasH, 1),
      left:  { y: canvasH / 2 - PADDLE_H / 2 },                                        // player paddle
      right: { y: canvasH / 2 - PADDLE_H / 2, target: canvasH / 2 - PADDLE_H / 2 },   // AI paddle + imperfect tracking target
      score: { left: 0, right: 0 },
    };
    stateRef.current = state;

    const loop = () => {
      const { ball, left, right, score } = state;

      // Move ball
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Top / bottom wall bounce
      if (ball.y - BALL_R < 0)        { ball.y = BALL_R;           ball.vy =  Math.abs(ball.vy); }
      if (ball.y + BALL_R > canvasH)  { ball.y = canvasH - BALL_R; ball.vy = -Math.abs(ball.vy); }

      // Left paddle collision (player)
      if (
        ball.vx < 0 &&
        ball.x - BALL_R < PAD_X + PADDLE_W &&
        ball.y > left.y &&
        ball.y < left.y + PADDLE_H
      ) {
        // Normalised hit position [-1 … 1] — controls the bounce angle
        const paddleHitRel = (ball.y - (left.y + PADDLE_H / 2)) / (PADDLE_H / 2);
        ball.vx = Math.min(-ball.vx * BALL_ACCEL, MAX_V);
        ball.vy = paddleHitRel * 4.5;
        ball.x  = PAD_X + PADDLE_W + BALL_R; // push ball out of paddle face
      }

      // Right paddle collision (AI)
      if (
        ball.vx > 0 &&
        ball.x + BALL_R > canvasW - PAD_X - PADDLE_W &&
        ball.y > right.y &&
        ball.y < right.y + PADDLE_H
      ) {
        const paddleHitRel = (ball.y - (right.y + PADDLE_H / 2)) / (PADDLE_H / 2);
        ball.vx = Math.max(ball.vx * -BALL_ACCEL, -MAX_V);
        ball.vy = paddleHitRel * 4.5;
        ball.x  = canvasW - PAD_X - PADDLE_W - BALL_R;
        // Randomise AI target on hit so it doesn't perfectly control every return
        right.target = ball.y - PADDLE_H / 2 + (Math.random() - 0.5) * AI_ERROR * 2;
      }

      // AI tracks ball with noise — only updates target while ball is approaching
      if (ball.vx > 0) {
        right.target = ball.y - PADDLE_H / 2 + (Math.random() - 0.5) * AI_ERROR;
      }
      const aiDistToTarget = right.target - right.y;
      right.y += Math.sign(aiDistToTarget) * Math.min(AI_SPEED, Math.abs(aiDistToTarget));
      right.y  = Math.max(0, Math.min(canvasH - PADDLE_H, right.y));

      // Scoring
      let gameEnded = false;
      if (ball.x + BALL_R < 0)        { score.right++; Object.assign(ball, makeBall(canvasW, canvasH,  1)); right.target = canvasH / 2 - PADDLE_H / 2; }
      if (ball.x - BALL_R > canvasW)  { score.left++;  Object.assign(ball, makeBall(canvasW, canvasH, -1)); right.target = canvasH / 2 - PADDLE_H / 2; }
      if (score.left >= WIN_SCORE || score.right >= WIN_SCORE) gameEnded = true;

      // Draw — read CSS vars each frame so colors follow theme/scheme changes
      const rootStyles = getComputedStyle(document.documentElement);
      const colorBg    = rootStyles.getPropertyValue('--card-bg').trim();
      const colorFg    = rootStyles.getPropertyValue('--text-h').trim();
      const colorDim   = rootStyles.getPropertyValue('--text').trim();

      // Background
      ctx.fillStyle = colorBg;
      ctx.fillRect(0, 0, canvasW, canvasH);

      // Center dashed divider
      ctx.strokeStyle = colorDim;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 8]);
      ctx.beginPath();
      ctx.moveTo(canvasW / 2, 0);
      ctx.lineTo(canvasW / 2, canvasH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Paddles
      ctx.fillStyle = colorFg;
      ctx.fillRect(PAD_X, left.y, PADDLE_W, PADDLE_H);
      ctx.fillRect(canvasW - PAD_X - PADDLE_W, right.y, PADDLE_W, PADDLE_H);

      // Ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
      ctx.fill();

      // Score display
      ctx.fillStyle = colorDim;
      ctx.font = '13px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(score.left,  canvasW / 2 - 14, 18);
      ctx.textAlign = 'left';
      ctx.fillText(score.right, canvasW / 2 + 14, 18);

      if (gameEnded) {
        setResult(score.left >= WIN_SCORE ? 'won' : 'lost');
        setTimeout(() => {
          setActive(false);
          setResult(null);
        }, 2000);
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      const newWidth  = canvas.offsetWidth;
      const newHeight = canvas.offsetHeight;
      canvas.width  = newWidth;
      canvas.height = newHeight;
      // Keep paddles in bounds after resize
      state.left.y  = Math.min(state.left.y,  newHeight - PADDLE_H);
      state.right.y = Math.min(state.right.y, newHeight - PADDLE_H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [active]);

  const handleMouseDown = (e) => {
    if (!active) return;
    dragging.current = true;
    setIsDragging(true);
    movePaddle(e.clientY);
  };
  const handleMouseMove = (e) => {
    if (!active || !dragging.current) return;
    movePaddle(e.clientY);
  };
  const handleMouseUp = () => { dragging.current = false; setIsDragging(false); };
  const handleTouchStart = (e) => {
    if (!active) return;
    dragging.current = true;
    movePaddle(e.touches[0].clientY);
  };
  const handleTouchEnd = () => { dragging.current = false; };

  return (
    <div
      ref={containerRef}
      className={`home-card home-card--pong${active ? ' home-card--pong-active' : ''}`}
      style={active ? { cursor: isDragging ? 'grabbing' : 'grab' } : undefined}
      onClick={!active && !result ? () => setActive(true) : undefined}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {!active && !result && <span className="home-card-label home-card--pong-label">pong</span>}
      {result && <span className="home-card-label home-card--pong-label">{result === 'won' ? 'you won :)' : 'you lost :('}</span>}
      {active && !result && (
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />
      )}
    </div>
  );
}
