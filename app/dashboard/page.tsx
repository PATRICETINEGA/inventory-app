import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AddItem from '@/components/AddItem'
import DeleteItemButton from '@/components/DeleteItemButton'
export default async function Dash() {
  const s = await getSession()
  if (!s) redirect('/login')
  const uid = (s.user as any).id
  const items = await prisma.item.findMany({ where: { ownerId: uid }, orderBy: { name: 'asc' } })
  const totalQty = items.reduce((a: number, i: any) => a + i.quantity, 0)
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Link href="/api/auth/signout" className="text-sm text-red-600">Sign out</Link>
      </div>
      <div className="bg-white p-4 rounded shadow mb-4">
        <p className="text-sm text-gray-500">Total units</p>
        <p className="text-2xl font-bold">{totalQty}</p>
      </div>
      <AddItem />
      <div className="space-y-2">
        {items.map((i: any) => (
          <div key={i.id} className="bg-white p-3 rounded shadow flex justify-between items-center text-sm">
            <div><span className="font-medium">{i.name}</span> {i.category && <span className="text-gray-500">· {i.category}</span>}</div>
            <div className="flex items-center gap-3">
              <span>{i.quantity}</span>
              <DeleteItemButton id={i.id} />
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500">No items yet</p>}
      </div>
    </div>
  )
}
