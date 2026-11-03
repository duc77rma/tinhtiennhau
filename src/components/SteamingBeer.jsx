import { motion } from 'framer-motion'

export default function SteamingBeer({ side = 'left' }) {
  const isLeft = side === 'left'

  // Các dải khói / hơi lạnh bốc lên nghi ngút từ miệng cốc bia
  const steamClouds = [
    { x: -14, delay: 0, duration: 2.4, size: 'w-6 h-10', drift: -10 },
    { x: -2, delay: 0.6, duration: 2.8, size: 'w-8 h-12', drift: 8 },
    { x: 12, delay: 1.2, duration: 2.2, size: 'w-7 h-11', drift: -6 },
    { x: -8, delay: 1.7, duration: 2.6, size: 'w-6 h-9', drift: 12 },
  ]

  // Các bọt bia sủi tăm li ti bay lên trong lòng cốc bia
  const bubbles = [
    { x: -8, delay: 0, duration: 1.5, size: 4 },
    { x: 4, delay: 0.4, duration: 1.8, size: 5 },
    { x: -14, delay: 0.8, duration: 1.3, size: 3 },
    { x: 10, delay: 0.3, duration: 1.6, size: 4 },
    { x: -2, delay: 1.1, duration: 1.4, size: 5 },
  ]

  return (
    <div
      className={`fixed top-[72%] -translate-y-1/2 z-20 pointer-events-none select-none hidden lg:block ${
        isLeft ? 'left-3 xl:left-8' : 'right-3 xl:right-8'
      }`}
    >
      <div className="relative flex items-center justify-center w-28 h-36">
        {/* Glow nền vàng hổ phách tỏa nhiệt lạnh/nóng bừng */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1.05, 1.3, 1],
            opacity: [0.35, 0.7, 0.45, 0.75, 0.35],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-24 h-24 rounded-full bg-gradient-to-t from-amber-600 via-yellow-400 to-amber-200 blur-2xl"
        />

        {/* Các luồng khói hơi bốc lên từ mặt bọt bia */}
        {steamClouds.map((steam, i) => (
          <motion.div
            key={`steam-${i}`}
            animate={{
              y: [-12, -75],
              x: [steam.x, steam.x + steam.drift],
              opacity: [0, 0.75, 0.5, 0],
              scale: [0.6, 1.3, 1.6],
              rotate: [0, i % 2 === 0 ? 25 : -25],
            }}
            transition={{
              duration: steam.duration,
              repeat: Infinity,
              delay: steam.delay,
              ease: 'easeOut',
            }}
            className={`absolute -top-3 rounded-full bg-gradient-to-t from-white/90 via-slate-100/60 to-transparent blur-sm ${steam.size}`}
          />
        ))}

        {/* Bọt bia sủi tăm bên trong cốc */}
        {bubbles.map((b, i) => (
          <motion.div
            key={`bubble-${i}`}
            animate={{
              y: [24, -10],
              x: [b.x, b.x + (i % 2 === 0 ? 3 : -3)],
              opacity: [0, 0.9, 0],
              scale: [0.5, 1, 0.8],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              delay: b.delay,
              ease: 'linear',
            }}
            style={{ width: b.size, height: b.size }}
            className="absolute rounded-full bg-white/80 shadow-sm shadow-yellow-200 z-15"
          />
        ))}

        {/* Cốc bia hơi SVG 3D chi tiết cao với animation cụng ly nhấp nhô */}
        <motion.div
          animate={{
            y: [0, -6, 0, -4, 0],
            rotate: isLeft ? [0, 4, -2, 3, 0] : [0, -4, 2, -3, 0],
            filter: [
              'drop-shadow(0 0 10px rgba(245, 158, 11, 0.7)) drop-shadow(0 0 20px rgba(217, 119, 6, 0.5))',
              'drop-shadow(0 0 18px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 32px rgba(245, 158, 11, 0.8))',
              'drop-shadow(0 0 10px rgba(245, 158, 11, 0.7)) drop-shadow(0 0 20px rgba(217, 119, 6, 0.5))',
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-10 w-22 h-24 flex items-center justify-center cursor-pointer"
        >
          <svg
            viewBox="0 0 64 64"
            className="w-full h-full transform transition-transform"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradient nước bia vàng óng */}
              <linearGradient id={`beerBody-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="35%" stopColor="#f59e0b" />
                <stop offset="85%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>

              {/* Gradient bọt bia trắng xóa bồng bềnh */}
              <linearGradient id={`beerFoam-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>

              {/* Gradient quai cầm thủy tinh */}
              <linearGradient id={`beerHandle-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
              </linearGradient>

              {/* Vệt sáng bóng thủy tinh phản chiếu */}
              <linearGradient id={`glassReflection-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Quai cầm cốc bia (Handle) */}
            <path
              d={
                isLeft
                  ? 'M44 24 H52 C56 24 58 28 58 32 V40 C58 44 56 46 52 46 H44'
                  : 'M20 24 H12 C8 24 6 28 6 32 V40 C6 44 8 46 12 46 H20'
              }
              stroke={`url(#beerHandle-${side})`}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Thân ly bia thủy tinh hình khối trụ */}
            <path
              d="M18 20 L21 54 C21.5 57 23.5 59 27 59 H37 C40.5 59 42.5 57 43 54 L46 20 Z"
              fill={`url(#beerBody-${side})`}
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Khía rãnh nổi 3D đặc trưng của cốc bia hơi */}
            <line x1="26" y1="23" x2="27.5" y2="54" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
            <line x1="32" y1="23" x2="32" y2="55" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" />
            <line x1="38" y1="23" x2="36.5" y2="54" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />

            {/* Vệt bóng phản quang cạnh cốc */}
            <path
              d="M20 22 L22 53 C22.5 54.5 23 55 25 55 L24 22 Z"
              fill={`url(#glassReflection-${side})`}
            />

            {/* Lớp bọt bia xốp trào ra miệng ly */}
            <g fill={`url(#beerFoam-${side})`}>
              <ellipse cx="32" cy="19" rx="15" ry="5" />
              {/* Các đám bọt trào tràn mép ly */}
              <circle cx="21" cy="18" r="4.5" />
              <circle cx="28" cy="15" r="5.5" />
              <circle cx="36" cy="15" r="5" />
              <circle cx="43" cy="18" r="4.5" />
              {/* Bọt bia chảy rỏ giọt xuống thành ly */}
              <path d="M21 21 C21 26 23 27 24 23 Z" />
              <path d="M37 21 C37 28 39 29 40 24 Z" />
            </g>
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

