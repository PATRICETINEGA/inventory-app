import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { name, quantity, category } = body
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 })

  const item = await prisma.item.create({
    data: { name, quantity: parseInt(quantity) || 0, category, ownerId: (session.user as any).id },
  })
  return NextResponse.json(item)
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const item = await prisma.item.findUnique({ where: { id } })
  if (!item || item.ownerId !== (session.user as any).id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await prisma.item.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
