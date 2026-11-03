import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { THEMES } from '../themePresets'

export default function ThemeSelector({ currentTheme, onSelectTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Đóng khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white border-2 border-indigo-200/80 hover:border-indigo-400 text-xs sm:text-sm font-bold text-slate-700 shadow-sm transition-all cursor-pointer"
        title="Đổi chủ đề nền"
      >
        <span>🎨</span>
        <span className="hidden md:inline">{currentTheme.name}</span>
        <span className="md:hidden">Theme</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-[10px] opacity-60">
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-slate-200 p-2 z-50 space-y-1.5"
          >
            <div className="px-2 py-1 text-[11px] font-black uppercase tracking-wider text-slate-400">
              Chọn Theme Nền Background
            </div>
            {THEMES.map((t) => {
              const isSelected = t.id === currentTheme.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    onSelectTheme(t)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer
                    ${isSelected
                      ? 'bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border-2 border-indigo-400 shadow-sm'
                      : 'hover:bg-slate-100/80 border-2 border-transparent'
                    }`}
                >
                  <div>
                    <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                      <span>{t.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{t.description}</div>
                  </div>
                  {isSelected && (
                    <span className="text-xs font-black text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full">
                      ✓
                    </span>
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

