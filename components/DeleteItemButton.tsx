'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteItemButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function del() {
    if (!confirm('Delete this item?')) return
    setLoading(true)
    await fetch(`/api/items?id=${id}`, { method: 'DELETE' })
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={del}
      disabled={loading}
      className="text-xs text-red-600 hover:underline disabled:opacity-50"
    >
      {loading ? '...' : 'Delete'}
    </button>
  )
}
