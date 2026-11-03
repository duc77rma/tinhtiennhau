export const THEMES = [
    {
        id: 'nhau-karaoke',
        name: '🍻 Tăng 1 Nhậu - Tăng 2 Karaoke 🎤',
        description: 'Bia bọt tưng bừng, tay mic tay ly, quẩy tới bến',
        bgClass: 'bg-[#181126] text-amber-50',
        containerStyle: {
            backgroundImage: `
        radial-gradient(circle at 20% 15%, rgba(245, 158, 11, 0.28) 0%, transparent 40%),
        radial-gradient(circle at 80% 25%, rgba(236, 72, 153, 0.28) 0%, transparent 45%),
        radial-gradient(circle at 50% 85%, rgba(168, 85, 247, 0.25) 0%, transparent 50%),
        linear-gradient(to right, rgba(251, 191, 36, 0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(236, 72, 153, 0.08) 1px, transparent 1px)
      `,
            backgroundSize: '100% 100%, 100% 100%, 100% 100%, 36px 36px, 36px 36px',
        },
        headerBg: 'bg-[#231738]/90 border-amber-400/50 shadow-amber-950/50',
        titleGradient: 'from-amber-400 via-rose-400 to-fuchsia-400',
        memes: ['🍺', '🍻', '🎤', '🍗', '🍾', '🥂', '🕺', '💃', '🥃', '🎶', '🤤', '🥴', '🔥', '💸'],
        ambientBlobs: [
            'from-amber-500/25 via-orange-500/20 to-rose-500/25',
            'from-purple-600/30 via-pink-500/20 to-amber-400/25',
        ],
    },
    {
        id: 'meme-party',
        name: '🎉 Meme Party',
        description: 'Vui nhộn, meme sticker, năng động',
        bgClass: 'bg-[#faf5ff]',
        containerStyle: {
            backgroundImage: `
        radial-gradient(circle at 15% 15%, rgba(236, 72, 153, 0.18) 0%, transparent 35%),
        radial-gradient(circle at 85% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 40%),
        radial-gradient(circle at 50% 85%, rgba(245, 158, 11, 0.15) 0%, transparent 45%),
        linear-gradient(to right, rgba(168, 85, 247, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(168, 85, 247, 0.05) 1px, transparent 1px)
      `,
            backgroundSize: '100% 100%, 100% 100%, 100% 100%, 32px 32px, 32px 32px',
        },
        headerBg: 'bg-white/90 border-purple-200 shadow-purple-100/60',
        titleGradient: 'from-purple-600 via-pink-600 to-amber-500',
        memes: ['💸', '😭', '🍕', '💳', '📉', '🤡', '🏃‍♂️💨', '🍻', '🍜', '🔥', '🌚', '💰'],
        ambientBlobs: [
            'from-fuchsia-400/25 via-pink-400/20 to-purple-400/25',
            'from-amber-300/20 via-orange-300/20 to-rose-300/25',
        ],
    },
    {
        id: 'cyberpunk',
        name: '⚡ Cyberpunk Neon',
        description: 'Hắc ám bí ẩn, ánh neon rực rỡ',
        bgClass: 'bg-[#0b0f19] text-slate-100',
        containerStyle: {
            backgroundImage: `
        radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.25) 0%, transparent 50%),
        radial-gradient(circle at 100% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 45%),
        radial-gradient(circle at 0% 100%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
        linear-gradient(to right, rgba(30, 41, 59, 0.7) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(30, 41, 59, 0.7) 1px, transparent 1px)
      `,
            backgroundSize: '100% 100%, 100% 100%, 100% 100%, 40px 40px, 40px 40px',
        },
        headerBg: 'bg-[#0f172a]/90 border-cyan-500/40 shadow-cyan-950/50',
        titleGradient: 'from-cyan-400 via-fuchsia-400 to-pink-500',
        memes: ['👾', '⚡', '🤖', '💀', '🚀', '🔮', '💸', '🕶️', '💊', '🛸'],
        ambientBlobs: [
            'from-cyan-500/25 via-blue-500/20 to-purple-600/30',
            'from-fuchsia-500/25 via-pink-500/20 to-rose-500/25',
        ],
    },
    {
        id: 'sunset-anime',
        name: '🌅 Sunset Lofi',
        description: 'Hoàng hôn ấm áp, chill nhẹ nhàng',
        bgClass: 'bg-[#fff7ed]',
        containerStyle: {
            backgroundImage: `
        radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.18) 0%, transparent 45%),
        radial-gradient(circle at 80% 30%, rgba(244, 63, 94, 0.16) 0%, transparent 50%),
        radial-gradient(circle at 50% 90%, rgba(139, 92, 246, 0.15) 0%, transparent 55%),
        radial-gradient(rgba(249, 115, 22, 0.1) 1.5px, transparent 1.5px)
      `,
            backgroundSize: '100% 100%, 100% 100%, 100% 100%, 24px 24px',
        },
        headerBg: 'bg-white/90 border-orange-200 shadow-orange-100/50',
        titleGradient: 'from-orange-500 via-rose-500 to-indigo-600',
        memes: ['🧋', '🍡', '🐱', '🌅', '✨', '☕', '🍉', '🥺', '💸', '🎶'],
        ambientBlobs: [
            'from-orange-400/25 via-rose-400/20 to-amber-300/25',
            'from-purple-400/20 via-pink-300/20 to-rose-300/20',
        ],
    },
]
