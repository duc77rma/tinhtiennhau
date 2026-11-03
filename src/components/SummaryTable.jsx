import { motion } from 'framer-motion'
import { getMemberColor } from '../constants'
import { formatCurrency } from '../utils'

// Màu sắc xoay vòng để phân biệt từng khoản chi (nền, border rõ nét, màu chữ tên khoản và màu số tiền)
const EXPENSE_COLORS = [
  {
    badge: 'bg-violet-50/90 border-violet-400 text-violet-900 shadow-sm shadow-violet-100',
    title: 'text-violet-800 font-medium',
    amount: 'text-indigo-600 bg-violet-100/80 font-bold px-1.5 py-0.5 rounded-md border border-violet-200',
  },
  {
    badge: 'bg-sky-50/90 border-sky-400 text-sky-900 shadow-sm shadow-sky-100',
    title: 'text-sky-800 font-medium',
    amount: 'text-blue-700 bg-sky-100/80 font-bold px-1.5 py-0.5 rounded-md border border-sky-200',
  },
  {
    badge: 'bg-rose-50/90 border-rose-400 text-rose-900 shadow-sm shadow-rose-100',
    title: 'text-rose-800 font-medium',
    amount: 'text-red-700 bg-rose-100/80 font-bold px-1.5 py-0.5 rounded-md border border-rose-200',
  },
  {
    badge: 'bg-teal-50/90 border-teal-400 text-teal-900 shadow-sm shadow-teal-100',
    title: 'text-teal-800 font-medium',
    amount: 'text-emerald-700 bg-teal-100/80 font-bold px-1.5 py-0.5 rounded-md border border-teal-200',
  },
  {
    badge: 'bg-amber-50/90 border-amber-400 text-amber-900 shadow-sm shadow-amber-100',
    title: 'text-amber-800 font-medium',
    amount: 'text-yellow-800 bg-amber-100/80 font-bold px-1.5 py-0.5 rounded-md border border-amber-200',
  },
  {
    badge: 'bg-fuchsia-50/90 border-fuchsia-400 text-fuchsia-900 shadow-sm shadow-fuchsia-100',
    title: 'text-fuchsia-800 font-medium',
    amount: 'text-purple-700 bg-fuchsia-100/80 font-bold px-1.5 py-0.5 rounded-md border border-fuchsia-200',
  },
  {
    badge: 'bg-lime-50/90 border-lime-400 text-lime-900 shadow-sm shadow-lime-100',
    title: 'text-lime-800 font-medium',
    amount: 'text-green-700 bg-lime-100/80 font-bold px-1.5 py-0.5 rounded-md border border-lime-200',
  },
  {
    badge: 'bg-orange-50/90 border-orange-400 text-orange-900 shadow-sm shadow-orange-100',
    title: 'text-orange-800 font-medium',
    amount: 'text-amber-700 bg-orange-100/80 font-bold px-1.5 py-0.5 rounded-md border border-orange-200',
  },
  {
    badge: 'bg-cyan-50/90 border-cyan-400 text-cyan-900 shadow-sm shadow-cyan-100',
    title: 'text-cyan-800 font-medium',
    amount: 'text-teal-700 bg-cyan-100/80 font-bold px-1.5 py-0.5 rounded-md border border-cyan-200',
  },
  {
    badge: 'bg-pink-50/90 border-pink-400 text-pink-900 shadow-sm shadow-pink-100',
    title: 'text-pink-800 font-medium',
    amount: 'text-rose-700 bg-pink-100/80 font-bold px-1.5 py-0.5 rounded-md border border-pink-200',
  },
]

// Map mỗi expense ID → một màu cố định
function buildColorMap(expenses) {
  const map = {}
  expenses.forEach((exp, i) => {
    map[exp.id] = EXPENSE_COLORS[i % EXPENSE_COLORS.length]
  })
  return map
}

export default function SummaryTable({ expenses, members }) {
  const colorMap = buildColorMap(expenses)

  // Tính tổng tiền mỗi người + chi tiết từng khoản
  const memberDetails = {}
  members.forEach((m) => {
    memberDetails[m] = { total: 0, items: [] }
  })

  expenses.forEach((expense) => {
    const perPerson = expense.amount / expense.members.length
    expense.members.forEach((member) => {
      memberDetails[member].total += perPerson
      memberDetails[member].items.push({
        id: expense.id,
        description: expense.description,
        share: perPerson,
      })
    })
  })

  const grandTotal = Object.values(memberDetails).reduce((a, b) => a + b.total, 0)
  const hasExpenses = expenses.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-2xl shadow-lg shadow-indigo-100/50 border border-slate-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light p-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <div>
            <h2 className="text-lg font-bold text-white">Bảng Tổng Kết</h2>
          </div>
        </div>
      </div>

      <div className="p-5">
        {!hasExpenses ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">🤷</div>
            <p className="text-slate-400 text-sm">Thêm khoản chi để xem tổng kết</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-4">
              {members.map((member, index) => {
                const { total: amount, items } = memberDetails[member]
                const percentage = grandTotal > 0 ? (amount / grandTotal) * 100 : 0
                const hasItems = items.length > 0

                return (
                  <motion.div
                    key={member}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={`rounded-xl border-2 overflow-hidden transition-all duration-300
                      ${amount > 0 ? getMemberColor(member, members) : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                  >
                    {/* Member header */}
                    <div className="flex items-center gap-3 p-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm">
                            {member}
                          </span>
                          <motion.span
                            key={amount}
                            initial={{ opacity: 0.5, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="font-extrabold text-sm"
                          >
                            {formatCurrency(amount)}
                          </motion.span>
                        </div>
                        {/* Progress bar */}
                        <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 + 0.2 }}
                            className="h-full rounded-full bg-current opacity-40"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Inline expense items */}
                    {hasItems && (
                      <div className="px-3 pb-3 flex flex-wrap gap-2">
                        {items.map((item, i) => {
                          const itemColor = colorMap[item.id] || EXPENSE_COLORS[0]
                          return (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.08 + i * 0.04 }}
                              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border-2
                                ${itemColor.badge}`}
                            >
                              <span className={`truncate max-w-36 ${itemColor.title}`}>
                                {item.description}
                              </span>
                              <span className="opacity-40">•</span>
                              <span className={itemColor.amount}>
                                {formatCurrency(item.share)}
                              </span>
                            </motion.div>
                          )
                        })}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Grand total */}
            <motion.div
              layout
              className="border-t-2 border-dashed border-slate-200 pt-4 mt-4"
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4">
                <span className="font-bold text-slate-600 text-sm flex items-center gap-1.5">
                  🧮 Tổng cộng
                </span>
                <motion.span
                  key={grandTotal}
                  initial={{ opacity: 0.5, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-extrabold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                >
                  {formatCurrency(grandTotal)}
                </motion.span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}
