import { motion, AnimatePresence } from 'framer-motion'
import { getMemberColor } from '../constants'
import { formatCurrency } from '../utils'

export default function ExpenseList({ expenses, members, onDeleteExpense, onEditExpense }) {
  if (expenses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg shadow-indigo-100/50 p-6 sm:p-8 border border-slate-100 text-center"
      >
        <div className="text-5xl mb-3">🧾</div>
        <p className="text-slate-400 font-medium">Chưa có khoản chi nào</p>
        <p className="text-slate-300 text-sm mt-1">Hãy thêm khoản chi đầu tiên nhé!</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="inline-flex items-center gap-2 mb-1 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border-2 border-slate-200/90 shadow-sm">
        <h2 className="text-base font-extrabold text-slate-800">📋 Danh sách khoản chi</h2>
        <span className="text-xs font-black bg-primary/15 text-primary px-2.5 py-0.5 rounded-full border border-primary/20">
          {expenses.length}
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        {expenses.map((expense) => (
          <motion.div
            key={expense.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="bg-white rounded-xl shadow-md shadow-slate-100 border-2 border-slate-200 p-4 group
              hover:shadow-lg hover:shadow-indigo-100/50 hover:border-indigo-300 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-700 text-sm truncate">
                  {expense.description}
                </h3>
                <p className="text-primary font-extrabold text-lg mt-0.5">
                  {formatCurrency(expense.amount)}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {expense.members.map((member) => (
                    <span
                      key={member}
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border
                        ${getMemberColor(member, members)}`}
                    >
                      {member}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-medium text-slate-500 mt-2">
                  Mỗi người: <span className="font-semibold text-slate-700">{formatCurrency(expense.amount / expense.members.length)}</span>
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEditExpense(expense)}
                  className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-100
                    flex items-center justify-center text-sm transition-colors cursor-pointer"
                  title="Sửa"
                >
                  ✏️
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDeleteExpense(expense.id)}
                  className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100
                    flex items-center justify-center text-sm transition-colors cursor-pointer"
                  title="Xóa"
                >
                  🗑️
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
