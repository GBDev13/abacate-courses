import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

type CoursePageProps = {
  params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });

  if (!course) return notFound();

  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const userCourse = await prisma.userCourse.findFirst({
    where: {
      user: {
        clerkUserId: user.id,
      },
      courseId: course.id,
    },
  });

  if (!userCourse) {
    return redirect("/?error=course_not_bought");
  }

  return (
    <main className="container py-10">
      <Image src={course.thumbnailUrl} width={1200} height={300} alt="Course thumbnail" className="w-full h-[300px] object-cover rounded-xl" />
      <h1 className="text-4xl font-bold mt-4">{course.name}</h1>
      <p className="text-lg mt-2">{course.description}</p>

      <video className="w-full aspect-video mx-auto bg-black rounded-xl overflow-hidden mt-10" controls src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" />
    </main>
  )
}