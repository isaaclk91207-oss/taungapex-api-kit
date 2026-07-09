import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create permissions
  const permissions = await Promise.all([
    prisma.permission.create({ data: { name: "user:create", module: "user", action: "create" } }),
    prisma.permission.create({ data: { name: "user:read", module: "user", action: "read" } }),
    prisma.permission.create({ data: { name: "user:update", module: "user", action: "update" } }),
    prisma.permission.create({ data: { name: "user:delete", module: "user", action: "delete" } }),
    prisma.permission.create({ data: { name: "role:read", module: "role", action: "read" } }),
    prisma.permission.create({ data: { name: "role:create", module: "role", action: "create" } }),
    prisma.permission.create({ data: { name: "role:update", module: "role", action: "update" } }),
    prisma.permission.create({ data: { name: "role:delete", module: "role", action: "delete" } }),
    prisma.permission.create({ data: { name: "auth:read", module: "auth", action: "read" } }),
  ]);

  console.log(`Created ${permissions.length} permissions`);

  // Create roles
  const userRole = await prisma.role.create({
    data: {
      name: "user",
      description: "Default user role",
      permissions: { connect: permissions.filter((p) => ["user:read", "auth:read"].includes(p.name)).map((p) => ({ id: p.id })) },
    },
  });

  const adminRole = await prisma.role.create({
    data: {
      name: "admin",
      description: "Administrator role with full access",
      permissions: { connect: permissions.map((p) => ({ id: p.id })) },
    },
  });

  console.log(`Created roles: ${userRole.name}, ${adminRole.name}`);
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
