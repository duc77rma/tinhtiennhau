import { useState } from 'react'
import { motion } from 'framer-motion'
import { getMemberColor } from '../constants'
import { generateId } from '../utils'

export default function ExpenseForm({ members, onAddExpense, editingExpense, onCancelEdit, onOpenAddMember }) {
    const [description, setDescription] = useState(editingExpense?.description || '')
    const [amount, setAmount] = useState(editingExpense?.amount || '')
    const [selectedMembers, setSelectedMembers] = useState(
        editingExpense?.members || [...members]
    )
    const [errors, setErrors] = useState({})
    const [shakeField, setShakeField] = useState(null)

    const isEditing = !!editingExpense
    const allSelected = selectedMembers.length === members.length

    function toggleMember(member) {
        setSelectedMembers((prev) =>
            prev.includes(member)
                ? prev.filter((m) => m !== member)
                : [...prev, member]
        )
        if (errors.members) setErrors((prev) => ({ ...prev, members: null }))
    }

    function toggleAll() {
        setSelectedMembers(allSelected ? [] : [...members])
        if (errors.members) setErrors((prev) => ({ ...prev, members: null }))
    }

    function triggerShake(field) {
        setShakeField(field)
        setTimeout(() => setShakeField(null), 500)
    }

    function validate() {
        const newErrors = {}
        if (!description.trim()) {
            newErrors.description = 'Vui lòng nhập tên khoản chi'
            triggerShake('description')
        }
        const numAmount = parseFloat(amount)
        if (!amount || isNaN(numAmount)) {
            newErrors.amount = 'Vui lòng nhập số tiền'
            triggerShake('amount')
        } else if (numAmount <= 0) {
            newErrors.amount = 'Số tiền phải lớn hơn 0'
            triggerShake('amount')
        }
        if (selectedMembers.length === 0) {
            newErrors.members = 'Chọn ít nhất 1 thành viên'
            triggerShake('members')
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!validate()) return
        const expense = {
            id: editingExpense?.id || generateId(),
            description: description.trim(),
            amount: parseFloat(amount),
            members: [...selectedMembers],
            createdAt: editingExpense?.createdAt || new Date().toISOString(),
        }
        onAddExpense(expense)
        resetForm()
    }

    function resetForm() {
        setDescription('')
        setAmount('')
        setSelectedMembers([...members])
        setErrors({})
    }

    function handleCancel() {
        resetForm()
        onCancelEdit?.()
    }

    function handleAmountChange(e) {
        const val = e.target.value.replace(/[^0-9.]/g, '')
        setAmount(val)
        if (errors.amount) setErrors((prev) => ({ ...prev, amount: null }))
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg shadow-indigo-100/50 p-5 sm:p-6 border-2 border-slate-200"
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg">
                    💸
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">
                        {isEditing ? '✏️ Sửa khoản chi' : 'Thêm khoản chi mới'}
                    </h2>
                </div>
            </div>

            {/* Tên khoản chi */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    📝 Tên khoản chi
                </label>
                <motion.div animate={shakeField === 'description' ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                                if (errors.description) setErrors((prev) => ({ ...prev, description: null }))
                            }}
                            placeholder="VD: Tiền ăn tối, Tiền taxi..."
                            className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-200 outline-none text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal
              ${errors.description
                                    ? 'border-danger bg-red-50 focus:border-danger'
                                    : 'border-slate-200 bg-slate-50 focus:border-primary focus:bg-white'
                                }`}
                        />
                </motion.div>
                {errors.description && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-danger text-xs mt-1 flex items-center gap-1">
                        ⚠️ {errors.description}
                    </motion.p>
                )}
            </div>

            {/* Số tiền */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    💰 Số tiền (VNĐ)
                </label>
                <motion.div animate={shakeField === 'amount' ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="VD: 500000"
                            min="0"
                            className={`w-full px-4 py-2.5 pr-16 rounded-xl border-2 transition-all duration-200 outline-none text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal
                ${errors.amount
                                    ? 'border-danger bg-red-50 focus:border-danger'
                                    : 'border-slate-200 bg-slate-50 focus:border-primary focus:bg-white'
                                }`}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">VNĐ</span>
                    </div>
                </motion.div>
                {errors.amount && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-danger text-xs mt-1 flex items-center gap-1">
                        ⚠️ {errors.amount}
                    </motion.p>
                )}
            </div>

            {/* Chọn thành viên */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-600">👥 Ai tham gia?</label>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onOpenAddMember}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-all duration-200 cursor-pointer"
                        >
                            + Thêm người
                        </button>
                        <button
                            type="button"
                            onClick={toggleAll}
                            className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200
                ${allSelected
                                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                }`}
                        >
                            {allSelected ? '✅ Đã chọn tất cả' : 'Chọn tất cả'}
                        </button>
                    </div>
                </div>

                <motion.div
                    animate={shakeField === 'members' ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-xl border-2 transition-colors
            ${errors.members ? 'border-danger bg-red-50' : 'border-slate-100 bg-slate-50'}`}
                >
                    {members.map((member) => {
                        const isSelected = selectedMembers.includes(member)
                        return (
                            <motion.button
                                key={member}
                                type="button"
                                onClick={() => toggleMember(member)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all duration-200 text-sm font-medium cursor-pointer
                  ${isSelected
                                        ? getMemberColor(member, members) + ' border-current shadow-sm'
                                        : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                                    }`}
                            >
                                <span>{member}</span>
                                {isSelected && (
                                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto text-xs">✓</motion.span>
                                )}
                            </motion.button>
                        )
                    })}
                </motion.div>
                {errors.members && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-danger text-xs mt-1 flex items-center gap-1">
                        ⚠️ {errors.members}
                    </motion.p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 rounded-xl font-bold text-white text-sm
            bg-gradient-to-r from-primary to-primary-light
            hover:from-primary-dark hover:to-primary
            shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40
            transition-all duration-300 cursor-pointer"
                >
                    {isEditing ? '💾 Lưu thay đổi' : '➕ Thêm khoản chi'}
                </motion.button>
                {isEditing && (
                    <motion.button
                        type="button"
                        onClick={handleCancel}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 py-3 rounded-xl font-bold text-slate-500 text-sm bg-slate-100 hover:bg-slate-200 transition-all duration-200 cursor-pointer"
                    >
                        Hủy
                    </motion.button>
                )}
            </div>
        </motion.form>
    )
}
