"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
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
    name: "ProjectNote",
    embedded: false
  },
  {
    name: "Rating",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "ProjectRole",
    embedded: false
  },
  {
    name: "ProductRole",
    embedded: false
  },
  {
    name: "ProgramRole",
    embedded: false
  },
  {
    name: "Person",
    embedded: false
  },
  {
    name: "TimeZone",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
