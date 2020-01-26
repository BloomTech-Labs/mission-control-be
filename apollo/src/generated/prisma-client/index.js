"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Program",
    embedded: false
  },
  {
    name: "Product",
    embedded: false
  },
  {
    name: "Project",
    embedded: false
  },
  {
    name: "Note",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Person",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
