
function product(parent, args, context, info){
    return context.prisma.product({id:args.id});
};

function products(parent, args, context, info){
    return context.prisma.products();
};

module.exports = {
    product,
    products
}