import Card from "@/components/Card";
import CreateNote from "@/components/CreateNote";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="bg-background h-screen w-full pt-6 px-24 sm:px-28 flex flex-col items-center">
        <CreateNote />
        <Card />
      </div>
    </main>
  );
}
