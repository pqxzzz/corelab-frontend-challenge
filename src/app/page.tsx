import Card from "@/components/Card";
import CreateNote from "@/components/CreateNote";
import Header from "@/components/Header";
import { mockData } from "@/mock/mockData";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="bg-background h-full w-full pt-6 px-24 sm:px-28 flex flex-col items-center">
        <CreateNote />
        {mockData.map((note, index) => (
          <Card
            key={index}
            title={note.title}
            description={note.description}
            color={note.color}
            isFavorite={note.isFavorite}
          />
        ))}
      </div>
    </main>
  );
}
