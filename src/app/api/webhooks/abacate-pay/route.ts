import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();

  if (!body || !body.data || !body.event) return new Response("Invalid payload", { status: 400 });

  const { data, event } = body;

  switch (event) {
    case "billing.paid":
      const customerEmail = data.billing.customer.metadata.email;

      const user = await prisma.user.findUnique({
        where: {
          email: customerEmail,
        }
      });

      if (!user) return new Response("User not found", { status: 404 });

      console.log(JSON.stringify(data, null, 2));

      // TODO: get courseId from webhook data
      const courseId = "cm4db3wfa000118fq57p51o0x";

      const course = await prisma.course.findUnique({
        where: { id: courseId }
      });

      if (!course) return new Response("Course not found", { status: 404 });

      await prisma.userCourse.create({
        data: {
          userId: user.id,
          courseId: course.id,
        }
      });

      return NextResponse.json({ success: true });
    default:
      return new Response("Invalid event", { status: 400 });
  }
}