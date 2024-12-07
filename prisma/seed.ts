import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const courses: Prisma.CourseCreateInput[] =  [
  {
    name: 'Next.js do zero ao avançado',
    description: 'Aprenda Next.js do zero ao avançado com esse curso prático e direto ao ponto.',
    price: 10000,
    thumbnailUrl: 'https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: "React do zero ao avançado",
    description: "Aprenda React do zero ao avançado com esse curso prático e direto ao ponto.",
    price: 5999,
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "JavaScript do zero ao avançado",
    description: "Aprenda JavaScript do zero ao avançado com esse curso prático e direto ao ponto.",
    price: 14999,
    thumbnailUrl: "https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "TypeScript do zero ao avançado",
    description: "Aprenda TypeScript do zero ao avançado com esse curso prático e direto ao ponto.",
    price: 2999,
    thumbnailUrl: "https://images.unsplash.com/photo-1699885960867-56d5f5262d38?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "CSS do zero ao avançado",
    description: "Aprenda CSS do zero ao avançado com esse curso prático e direto ao ponto.",
    price: 3999,
    thumbnailUrl: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "HTML do zero ao avançado",
    description: "Aprenda HTML do zero ao avançado com esse curso prático e direto ao ponto.",
    price: 1999,
    thumbnailUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

async function main() {
  const coursesSeed = courses.map((course) => {
    return prisma.course.create({ data: course })
  })

  await prisma.$transaction([...coursesSeed])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
