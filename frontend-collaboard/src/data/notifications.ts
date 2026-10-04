export type NotificationType = 'task_assigned' | 'comment_added' | 'review_requested' | 'board_added'

export type AppNotification = {
  id: string
  type: NotificationType
  actor: { id: string; name: string } | null
  boardId: string | null
  taskId: string | null
  data: { taskTitle?: string; boardName?: string; preview?: string }
  read: boolean
  createdAt: string
}

export type NotificationPage = { items: AppNotification[]; nextBefore: string | null; unreadCount: number }

export type NotificationPrefs = { assigned: boolean; comment: boolean; review: boolean; boardAdded: boolean }

/** Kalimat notifikasi tanpa nama aktor (aktor ditebalkan terpisah). */
export function notificationText(n: AppNotification): string {
  const task = `"${n.data.taskTitle ?? 'tugas'}"`
  switch (n.type) {
    case 'task_assigned': return `menugaskan Anda pada ${task}`
    case 'comment_added': return `berkomentar di ${task}`
    case 'review_requested': return `memindahkan ${task} ke Review`
    case 'board_added': return `menambahkan Anda ke proyek "${n.data.boardName ?? 'baru'}"`
  }
}
