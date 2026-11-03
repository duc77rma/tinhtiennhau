import { motion } from 'framer-motion'

export default function MemeBackground({ theme }) {
    const memes = theme?.memes || ['💸', '😭', '🍕', '💳', '📉', '🤡', '🏃‍♂️💨']
    const blobs = theme?.ambientBlobs || [
        'from-indigo-400/25 via-purple-300/20 to-pink-300/25',
        'from-pink-300/25 via-rose-200/20 to-amber-200/25',
    ]

    // Định vị các meme rải đều trên background (tăng gấp đôi mật độ: 20 vị trí rải khắp màn hình)
    const memePositions = [
        // Nhóm trên (Top)
        { x: '4%', y: '8%', duration: 7, delay: 0 },
        { x: '22%', y: '5%', duration: 7.5, delay: 2.2 },
        { x: '48%', y: '4%', duration: 6, delay: 1.2 },
        { x: '72%', y: '6%', duration: 8.5, delay: 0.5 },
        { x: '92%', y: '10%', duration: 8, delay: 1 },

        // Nhóm giữa trên (Mid-Top)
        { x: '12%', y: '26%', duration: 6.8, delay: 1.8 },
        { x: '85%', y: '28%', duration: 7.2, delay: 0.7 },
        { x: '2%', y: '42%', duration: 8.2, delay: 1.1 },
        { x: '94%', y: '44%', duration: 6.5, delay: 2.5 },

        // Nhóm trung tâm & hai bên sườn (Mid)
        { x: '15%', y: '58%', duration: 7.8, delay: 0.4 },
        { x: '88%', y: '60%', duration: 8.8, delay: 1.6 },
        { x: '3%', y: '68%', duration: 6.2, delay: 2.1 },
        { x: '93%', y: '74%', duration: 7.4, delay: 1.9 },

        // Nhóm dưới (Bottom)
        { x: '10%', y: '82%', duration: 8.4, delay: 0.9 },
        { x: '28%', y: '90%', duration: 6.6, delay: 1.4 },
        { x: '45%', y: '93%', duration: 7.6, delay: 0.3 },
        { x: '65%', y: '88%', duration: 8.1, delay: 2.3 },
        { x: '82%', y: '92%', duration: 5.8, delay: 1.7 },

        // Hai điểm phụ tạo chiều sâu
        { x: '20%', y: '45%', duration: 9.2, delay: 0.6 },
        { x: '78%', y: '46%', duration: 8.6, delay: 1.3 },
    ]

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Dynamic ambient blobs */}
            <motion.div
                key={`blob-1-${theme.id}`}
                animate={{
                    scale: [1, 1.25, 0.95, 1],
                    x: [0, 50, -40, 0],
                    y: [0, -40, 30, 0],
                    rotate: [0, 90, 180, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full bg-gradient-to-tr ${blobs[0]} blur-3xl`}
            />
            <motion.div
                key={`blob-2-${theme.id}`}
                animate={{
                    scale: [1.1, 0.9, 1.2, 1.1],
                    x: [0, -60, 40, 0],
                    y: [0, 50, -30, 0],
                    rotate: [0, -90, -180, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className={`absolute top-1/3 -right-24 w-[36rem] h-[36rem] rounded-full bg-gradient-to-bl ${blobs[1] || blobs[0]} blur-3xl`}
            />

            {/* Floating funny meme items */}
            {memePositions.map((pos, idx) => {
                const icon = memes[idx % memes.length]
                return (
                    <motion.div
                        key={`${theme.id}-${idx}`}
                        style={{ left: pos.x, top: pos.y }}
                        animate={{
                            y: ['-20px', '20px', '-20px'],
                            rotate: [-15, 15, -15],
                            scale: [0.95, 1.15, 0.95],
                        }}
                        transition={{
                            duration: pos.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: pos.delay,
                        }}
                        className="absolute select-none text-3xl sm:text-4xl opacity-60 hover:opacity-100 transition-opacity filter drop-shadow-md cursor-default pointer-events-auto"
                    >
                        {icon}
                    </motion.div>
                )
            })}
        </div>
    )
}
