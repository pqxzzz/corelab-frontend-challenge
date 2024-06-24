"use client";
import React from "react";
import Header from "@/components/Header";
import CreateNote from "@/components/CreateNote";
import CardList from "@/components/CardList";

export default function Home() {
  return (
    <main className="bg-background h-screen">
      <Header />
      <div className="flex flex-col items-center mt-6">
        <CreateNote />
        <CardList />
      </div>
    </main>
  );
}
