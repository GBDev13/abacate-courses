import { CoursesList } from "@/components/courses-list";

export default async function Home() {
  return (
    <main className="flex flex-col w-full container">
      <CoursesList />
    </main>
  );
}
