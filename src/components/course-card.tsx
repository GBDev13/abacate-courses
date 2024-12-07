"use client"

import { Course, UserCourse } from "@prisma/client"
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type CourseCardProps = {
  course: Course;
  userCourses: UserCourse[];
}

export const CourseCard = ({ course, userCourses }: CourseCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const user = useUser();
  const router = useRouter();

  const hasBought = userCourses.some((userCourse) => userCourse.courseId === course.id);

  const handleBuy = async () => {
    try {
      if (!user.isSignedIn) {
        router.push("/sign-in");
        return;
      }

      setIsLoading(true);
      const { data } = await axios.post("/api/courses/buy", { courseId: course.id });

      window.location.href = data.url;
    } catch {
      toast.error("An error occurred while trying to buy the course.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full border rounded-xl overflow-hidden shadow-sm group">
      <div className="w-full aspect-auto overflow-hidden">
        <Image src={course.thumbnailUrl} width={300} height={200} className="w-full h-full group-hover:scale-110 group-hover:brightness-125 transition-all" alt="Course thumbnail" />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-bold text-2xl">{course.name}</h3>
        <p className="text-sm">{course.description}</p>
        <div className="flex items-center justify-between">
          <p className="font-bold text-2xl">
            {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(course.price / 100)}
          </p>

          {hasBought ? (
            <Link passHref href={`/courses/${course.id}`}>
              <Button className="bg-brand font-bold">
                Acessar
              </Button>
            </Link>
          ) : (
            <Button disabled={isLoading} onClick={handleBuy} className="bg-brand font-bold">
              Comprar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}