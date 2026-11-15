import { Elysia, t } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const userRoutes = new Elysia({ prefix: "/users" })
  // GET /users - list all users
  .get("/", async () => {
    try {
      const allUsers = await db.select().from(users);
      return {
        success: true,
        data: allUsers,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      };
    }
  })

  // GET /users/:id - get single user
  .get(
    "/:id",
    async ({ params: { id }, set }) => {
      try {
        const result = await db
          .select()
          .from(users)
          .where(eq(users.id, Number(id)));

        if (result.length === 0) {
          set.status = 404;
          return {
            success: false,
            message: "User not found",
          };
        }

        return {
          success: true,
          data: result[0],
        };
      } catch (error: any) {
        set.status = 500;
        return {
          success: false,
          message: "Failed to fetch user",
          error: error.message,
        };
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )

  // POST /users - create a new user
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const result = await db.insert(users).values({
          name: body.name,
          email: body.email,
        });

        set.status = 201;
        return {
          success: true,
          message: "User created successfully",
          data: {
            id: result[0].insertId,
            name: body.name,
            email: body.email,
          },
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          message: "Failed to create user",
          error: error.message,
        };
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ format: "email" }),
      }),
    }
  )

  // DELETE /users/:id - delete a user
  .delete(
    "/:id",
    async ({ params: { id }, set }) => {
      try {
        const result = await db
          .delete(users)
          .where(eq(users.id, Number(id)));

        if (result[0].affectedRows === 0) {
          set.status = 404;
          return {
            success: false,
            message: "User not found",
          };
        }

        return {
          success: true,
          message: `User with id ${id} deleted successfully`,
        };
      } catch (error: any) {
        set.status = 500;
        return {
          success: false,
          message: "Failed to delete user",
          error: error.message,
        };
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );

