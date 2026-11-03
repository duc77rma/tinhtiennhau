import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AddMemberModal({ isOpen, onClose, onAddMember, existingMembers }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const trimmed = name.trim()
    if (!trimmed) {
      setError('Vui lòng nhập tên thành viên')
      return
    }
    if (existingMembers.some((m) => m.toLowerCase() === trimmed.toLowerCase())) {
      setError('Thành viên này đã tồn tại')
      return
    }

    onAddMember(trimmed)
    setName('')
    setError('')
    onClose()
  }

  function handleClose() {
    setName('')
    setError('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg">
                👤
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Thêm thành viên</h3>
                <p className="text-xs text-slate-400">Nhập tên người mới</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (error) setError('')
                }}
                placeholder="VD: Nguyễn Văn A"
                autoFocus
                className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-200 outline-none text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal mb-1
                  ${error
                    ? 'border-red-400 bg-red-50 focus:border-red-400'
                    : 'border-slate-200 bg-slate-50 focus:border-primary focus:bg-white'
                  }`}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mb-3 flex items-center gap-1"
                >
                  ⚠️ {error}
                </motion.p>
              )}
              {!error && <div className="mb-3" />}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-slate-100 text-slate-500
                    hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white
                    bg-gradient-to-r from-emerald-500 to-teal-500
                    hover:from-emerald-600 hover:to-teal-600
                    shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
                >
                  ➕ Thêm
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

