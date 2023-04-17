

console.log(process.argv);

const argsID: number =  +process.argv[0];

console.log({argsID});



import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



async function main() {
    const user = await prisma.prisma_user.delete({
        where: { id: argsID }
    })
    console.log(user)
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