'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function AddItem() {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const r = useRouter()
  async function submit(e: any) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, quantity, category }) })
    setName(''); setQuantity(''); setCategory(''); setLoading(false); r.refresh()
  }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4 space-y-2">
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Item name" className="w-full border p-2 rounded text-sm" required />
      <input value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder="Quantity" type="number" className="w-full border p-2 rounded text-sm" />
      <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" className="w-full border p-2 rounded text-sm" />
      <button type="submit" disabled={loading} className="bg-teal-600 text-white px-4 py-1 rounded text-sm disabled:opacity-50">Add</button>
    </form>
  )
}
