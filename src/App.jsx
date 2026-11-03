import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DEFAULT_MEMBERS } from './constants'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SummaryTable from './components/SummaryTable'
import AddMemberModal from './components/AddMemberModal'
import MemeBackground from './components/MemeBackground'
import ThemeSelector from './components/ThemeSelector'
import FlamingHeart from './components/FlamingHeart'
import SteamingBeer from './components/SteamingBeer'
import { THEMES } from './themePresets'

export default function App() {
    const [currentTheme, setCurrentTheme] = useState(THEMES[0])
    const [members, setMembers] = useState([...DEFAULT_MEMBERS])
    const [expenses, setExpenses] = useState([])
    const [editingExpense, setEditingExpense] = useState(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
    const [showAddMember, setShowAddMember] = useState(false)

    function handleAddMember(name) {
        setMembers((prev) => [...prev, name])
    }

    function handleAddExpense(expense) {
        if (editingExpense) {
            setExpenses((prev) => prev.map((e) => (e.id === expense.id ? expense : e)))
            setEditingExpense(null)
        } else {
            setExpenses((prev) => [expense, ...prev])
        }
    }

    function handleDeleteExpense(id) {
        setShowDeleteConfirm(id)
    }

    function confirmDelete() {
        setExpenses((prev) => prev.filter((e) => e.id !== showDeleteConfirm))
        if (editingExpense?.id === showDeleteConfirm) setEditingExpense(null)
        setShowDeleteConfirm(null)
    }

    function handleEditExpense(expense) {
        setEditingExpense(expense)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function handleCancelEdit() {
        setEditingExpense(null)
    }

    return (
        <div
            className={`relative min-h-screen ${currentTheme.bgClass} overflow-x-hidden selection:bg-primary/20 transition-colors duration-500`}
            style={currentTheme.containerStyle}
        >
            {/* Background meme & animated blobs theo Theme */}
            <MemeBackground theme={currentTheme} />

            {/* 2 quả tim lửa đang đập ở 2 bên sườn màn hình */}
            <FlamingHeart side="left" />
            <FlamingHeart side="right" />

            {/* 2 cốc bia hơi bốc khói sủi bọt ở 2 bên sườn màn hình */}
            <SteamingBeer side="left" />
            <SteamingBeer side="right" />

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl border-b-2 shadow-md transition-all duration-300 ${currentTheme.headerBg}`}
            >
                {/* Header background animated gradient beam trải dài full 100% màn hình */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/10 via-accent/15 to-primary/10 opacity-90 pointer-events-none" />

                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3 relative z-10">
                        {/* Animated Meme Avatar */}
                        <motion.div
                            animate={{
                                rotate: [0, -8, 8, -6, 6, 0],
                                scale: [1, 1.08, 0.98, 1.05, 1],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center cursor-pointer"
                        >
                            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-2xl">
                                💸
                            </div>
                        </motion.div>

                        <div>
                            <div className="flex items-center gap-1.5">
                                <h1 className={`text-xl sm:text-2xl font-black bg-gradient-to-r ${currentTheme.titleGradient} bg-clip-text text-transparent tracking-tight`}>
                                    CÁI GIÁ PHẢI TRẢ
                                </h1>
                                <motion.span
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                                    className="text-base select-none"
                                    title="Ví rỗng nhưng vui!"
                                >
                                </motion.span>
                            </div>
                            <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                                <motion.span
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="inline-block text-[10px]"
                                >
                                    🤝💕🎭💕
                                </motion.span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                        {/* Bộ chọn Theme có sẵn */}
                        <ThemeSelector currentTheme={currentTheme} onSelectTheme={setCurrentTheme} />

                        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-50/80 border border-indigo-200/70 text-xs sm:text-sm font-bold text-indigo-700 shadow-sm">
                            <span>👥</span>
                            <span>{members.length}</span>
                            <span className="text-[11px] font-medium text-indigo-500 hidden sm:inline">người</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-pink-50/80 border border-pink-200/70 text-xs sm:text-sm font-bold text-pink-700 shadow-sm">
                            <span>🧾</span>
                            <motion.span
                                key={expenses.length}
                                initial={{ scale: 1.4, color: '#ec4899' }}
                                animate={{ scale: 1, color: '#be185d' }}
                                className="font-extrabold"
                            >
                                {expenses.length}
                            </motion.span>
                            <span className="text-[11px] font-medium text-pink-500 hidden sm:inline">khoản</span>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main content */}
            <main className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-8 sm:pt-28 sm:pb-12">
                {/* Row 1: Form + Danh sách khoản chi */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-5">
                        <ExpenseForm
                            key={editingExpense?.id || 'new'}
                            members={members}
                            onAddExpense={handleAddExpense}
                            editingExpense={editingExpense}
                            onCancelEdit={handleCancelEdit}
                            onOpenAddMember={() => setShowAddMember(true)}
                        />
                    </div>
                    <div className="lg:col-span-7">
                        <ExpenseList
                            expenses={expenses}
                            members={members}
                            onDeleteExpense={handleDeleteExpense}
                            onEditExpense={handleEditExpense}
                        />
                    </div>
                </div>

                {/* Row 2: Bảng tổng kết */}
                <div className="mt-6">
                    <SummaryTable expenses={expenses} members={members} />
                </div>
            </main>

            {/* Add member modal */}
            <AddMemberModal
                isOpen={showAddMember}
                onClose={() => setShowAddMember(false)}
                onAddMember={handleAddMember}
                existingMembers={members}
            />

            {/* Delete confirmation modal */}
            <AnimatePresence>
                {showDeleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
                        onClick={() => setShowDeleteConfirm(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
                        >
                            <div className="text-center">
                                <div className="text-4xl mb-3">🗑️</div>
                                <h3 className="font-bold text-slate-800 text-lg">Xóa khoản chi?</h3>
                                <p className="text-slate-400 text-sm mt-1 mb-5">Bạn có chắc muốn xóa khoản chi này không?</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowDeleteConfirm(null)}
                                        className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-danger text-white hover:bg-danger-dark transition-colors shadow-lg shadow-danger/30 cursor-pointer"
                                    >
                                        Xóa luôn
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
