const name = (parent, _, context) => {
    const res = context.prisma.name({ id: parent.id }).name()
      return res
    }


    const isUsed = (parent, _, context) => {
        const res = context.prisma.isUsed({id: parent.id}).isUsed()
        return res
    }

  module.exports = {
    name,
    isUsed
  }