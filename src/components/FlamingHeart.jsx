import { useEffect, useRef } from 'react'

export default function FlamingHeart({ side = 'left' }) {
  const isLeft = side === 'left'
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Kích thước canvas cố định sắc nét
    const width = 200
    const height = 220
    canvas.width = width
    canvas.height = height

    const rand = Math.random

    // Hàm phương trình toán học tính tọa độ hình trái tim
    const heartPosition = (rad) => [
      Math.pow(Math.sin(rad), 3),
      -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad)),
    ]

    const scaleAndTranslate = (pos, sx, sy, dx, dy) => [
      dx + pos[0] * sx,
      dy + pos[1] * sy,
    ]

    // Tập hợp điểm khung trái tim 3 lớp (ngoài, giữa, trong)
    const pointsOrigin = []
    const dr = 0.12
    for (let i = 0; i < Math.PI * 2; i += dr) {
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 70, 4.3, 0, 0))
    }
    for (let i = 0; i < Math.PI * 2; i += dr) {
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 50, 3.1, 0, 0))
    }
    for (let i = 0; i < Math.PI * 2; i += dr) {
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 30, 1.8, 0, 0))
    }

    const heartPointsCount = pointsOrigin.length
    const targetPoints = []

    const pulse = (kx, ky) => {
      for (let i = 0; i < pointsOrigin.length; i++) {
        targetPoints[i] = [
          kx * pointsOrigin[i][0] + width / 2,
          ky * pointsOrigin[i][1] + height / 2 - 10,
        ]
      }
    }

    // Khởi tạo các hạt sao phát sáng (particles)
    const traceCount = 35
    const particles = []

    for (let i = 0; i < heartPointsCount; i++) {
      const x = rand() * width
      const y = rand() * height
      particles[i] = {
        vx: 0,
        vy: 0,
        speed: rand() * 2 + 3.8,
        q: ~~(rand() * heartPointsCount),
        D: 2 * (i % 2) - 1,
        force: 0.2 * rand() + 0.72,
        // Màu lửa rực rỡ: Đỏ Ruby, Cam Lửa, Vàng Hổ Phách với hiệu ứng phát quang
        f: `hsla(${rand() * 28 + 348}, ${rand() * 35 + 65}%, ${rand() * 35 + 50}%, ${rand() * 0.4 + 0.45})`,
        trace: Array.from({ length: traceCount }, () => ({ x, y })),
      }
    }

    const config = {
      traceK: 0.42,
      timeDelta: 0.012,
    }

    let time = 0
    let animationFrameId

    const loop = () => {
      const n = -Math.cos(time)
      // Nhịp tim đập phập phồng co bóp (Pulse)
      pulse((1 + n) * 0.52 + 0.12, (1 + n) * 0.52 + 0.12)
      time += (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta

      // Clear với độ trong suốt mờ để tạo vệt đuôi sao chổi (Trail Glow)
      // composite destination-out tạo nền trong suốt hoàn hảo trên mọi theme
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.14)'
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = particles.length; i--; ) {
        const u = particles[i]
        const q = targetPoints[u.q]
        if (!q) continue

        const dx = u.trace[0].x - q[0]
        const dy = u.trace[0].y - q[1]
        const length = Math.sqrt(dx * dx + dy * dy)

        if (length < 10) {
          if (rand() > 0.95) {
            u.q = ~~(rand() * heartPointsCount)
          } else {
            if (rand() > 0.99) u.D *= -1
            u.q += u.D
            u.q %= heartPointsCount
            if (u.q < 0) u.q += heartPointsCount
          }
        }

        u.vx += (-dx / length) * u.speed
        u.vy += (-dy / length) * u.speed
        u.trace[0].x += u.vx
        u.trace[0].y += u.vy
        u.vx *= u.force
        u.vy *= u.force

        for (let k = 0; k < u.trace.length - 1; ) {
          const T = u.trace[k]
          const N = u.trace[++k]
          N.x -= config.traceK * (N.x - T.x)
          N.y -= config.traceK * (N.y - T.y)
        }

        ctx.fillStyle = u.f
        for (let k = 0; k < u.trace.length; k++) {
          ctx.fillRect(u.trace[k].x, u.trace[k].y, 1.4, 1.4)
        }
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none hidden lg:block ${
        isLeft ? 'left-1 xl:left-6' : 'right-1 xl:right-6'
      }`}
    >
      <div className="relative flex items-center justify-center w-48 h-52">
        {/* Hào quang lửa nhịp đập nền phía sau */}
        <div className="absolute w-28 h-28 rounded-full bg-gradient-to-t from-red-600/35 via-orange-500/25 to-pink-500/25 blur-2xl animate-pulse" />

        {/* Canvas chứa thuật toán hạt toán học đập phập phồng */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full filter drop-shadow-[0_0_12px_rgba(239,68,68,0.85)] drop-shadow-[0_0_24px_rgba(249,115,22,0.65)]"
        />
      </div>
    </div>
  )
}
