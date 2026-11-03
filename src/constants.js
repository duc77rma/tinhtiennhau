// Màu sắc xoay vòng cho thành viên
export const COLOR_POOL = [
  'bg-indigo-100 text-indigo-700 border-indigo-300',
  'bg-pink-100 text-pink-700 border-pink-300',
  'bg-emerald-100 text-emerald-700 border-emerald-300',
  'bg-amber-100 text-amber-700 border-amber-300',
  'bg-cyan-100 text-cyan-700 border-cyan-300',
  'bg-violet-100 text-violet-700 border-violet-300',
  'bg-rose-100 text-rose-700 border-rose-300',
  'bg-teal-100 text-teal-700 border-teal-300',
  'bg-sky-100 text-sky-700 border-sky-300',
  'bg-orange-100 text-orange-700 border-orange-300',
  'bg-lime-100 text-lime-700 border-lime-300',
  'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300',
]

export const DEFAULT_MEMBERS = [
  'Q97',
  'Đặng Anh',
  'Cự Đức',
  'Maily',
  'Phan Ly',
  'Hoàng Linh',
  'Thu Duyên',
  'Hà Vi',
  'Huyền Linh',
  'Cự Mạnh',
]

export function getMemberColor(member, members) {
  const index = members.indexOf(member)
  return COLOR_POOL[index % COLOR_POOL.length]
}
