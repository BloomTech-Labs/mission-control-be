// function post(parent, args, context, info) {
//     const userId = getUserId(context);
//     const { url, description } = args;

//     return context.prisma.createLink({
//         url: url,
//         description: description,
//         postedBy: { connect: { id: userId } },
//     })
// }


function addProduct(parent, args, context, info) {
    return context.prisma.createProduct({
        name: args.name
    })
}

module.exports = {
    addProduct
}