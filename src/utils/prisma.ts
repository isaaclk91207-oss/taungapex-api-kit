import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { config } from "../config";

const adapter = new PrismaMariaDb(config.databaseUrl);

const prisma = new PrismaClient({ adapter });

export default prisma;
