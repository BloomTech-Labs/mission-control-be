//LAB23-T1 Search Feed Resolver
const count = (_, args, context) => {
    const res =  context.prisma
      .ProjectsConnection({
        where: {
          OR: [
            { name_contains: args.filter },
            { product_contains: args.filter },
            { status_contains: args.filter },
            { active_contains: args.filter },
            { assignments_contains: args.filter },
            { notes_contains: args.filter },
          ],
        },
      })
      .aggregate()
      .count()
      return res
    }
    const filter = (_, args, context) => {
    const res =  context.prisma.projects({
      where: {
        OR: [
            { name_contains: args.filter },
            { product_contains: args.filter },
            { status_contains: args.filter },
            { active_contains: args.filter },
            { assignments_contains: args.filter },
            { notes_contains: args.filter },
        ],
      },
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
    })
    return res
  }
  module.exports = {
    count,
    filter
  }