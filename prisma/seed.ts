import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('demo123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@inventory.app' },
    update: {},
    create: { email: 'demo@inventory.app', password },
  })

  await prisma.item.upsert({
    where: { id: 'seed-item' },
    update: {},
    create: { id: 'seed-item', name: 'Laptop', quantity: 5, category: 'Electronics', ownerId: user.id },
  })

  console.log('Seed done')
}

main().finally(() => prisma.$disconnect())
