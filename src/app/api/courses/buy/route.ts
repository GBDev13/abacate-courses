import { AbacatePayApi } from "@/lib/abacate-pay";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  if (!body.courseId) {
    return new Response("Invalid payload", { status: 400 });
  }

  const course = await prisma.course.findUnique({
    where: {
      id: body.courseId,
    },
  });

  if (!course) {
    return new Response("Course not found", { status: 404 });
  }

  const userCourse = await prisma.userCourse.findFirst({
    where: {
      user: {
        clerkUserId: user.id,
      },
      courseId: course.id,
    },
  });

  if (userCourse) {
    return new Response("User already bought this course", { status: 400 });
  }

  const url = await AbacatePayApi.createCheckoutUrl({
    product: {
      id: course.id,
      name: course.name,
      price: course.price,
      description: course.description,
    },
    customer: {
      name: user.fullName!,
      email: user.primaryEmailAddress?.emailAddress!,
      cellphone: user.primaryPhoneNumber?.phoneNumber,
    },
  });

  return NextResponse.json({ url });
};
