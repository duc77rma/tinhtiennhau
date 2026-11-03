/**
 * Định dạng số tiền theo kiểu Việt Nam: 150,000 VNĐ
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(Math.round(amount)) + ' VNĐ'
}

/**
 * Tạo ID duy nhất
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
}

