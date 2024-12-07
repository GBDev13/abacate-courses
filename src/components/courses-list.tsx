import { prisma } from "@/lib/prisma";
import { CourseCard } from "./course-card";
import { currentUser } from "@clerk/nextjs/server";
import { UserCourse } from "@prisma/client";

export const CoursesList = async () => {
  const courses = await prisma.course.findMany();

  const user = await currentUser();

  let userCourses: UserCourse[] = [];

  if (user) {
    userCourses = await prisma.userCourse.findMany({
      where: {
        user: {
          clerkUserId: user.id,
        }
      },
    });
  }

  return (
    <section className="w-full py-10">
      <h2 className="text-4xl font-bold text-center">Todos os Cursos</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {courses.map((course) => (
          <CourseCard key={`course-${course.id}`} course={course} userCourses={userCourses} />
        ))}
      </div>
    </section>
  );
};
