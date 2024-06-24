"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import CreateNote from "@/components/CreateNote";
import Header from "@/components/Header";
import { CardProps } from "@/types/CardProps";
import { CustomColorKey } from "@/utils/customColors";
import api from "@/services/api";

export default function Home() {
  const [openColorPickerIndex, setOpenColorPickerIndex] = useState<
    number | null
  >(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [todos, setTodos] = useState<CardProps[]>([]);
  const [originalTodos, setOriginalTodos] = useState<CardProps[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await api.get("/todos");
      setTodos(response.data);
      setOriginalTodos(response.data);
    } catch (error) {
      console.error("Erro ao buscar todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleColorPickerToggle = (index: number | null) => {
    setOpenColorPickerIndex(index);
  };

  const handleEditToggle = (index: number | null) => {
    if (index === editingIndex) {
      saveTodoChanges(todos[index!]);
      setEditingIndex(null);
    } else {
      if (editingIndex !== null) {
        setTodos(originalTodos);
      }
      setEditingIndex(index);
      setOriginalTodos([...todos]);
    }
  };

  const handleTitleChange = (index: number, newTitle: string) => {
    //obs: esta sendo criada uma cópia de todos para evitar modificar diretamente o array original
    const updatedTodos = [...todos];
    updatedTodos[index].title = newTitle;
    setTodos(updatedTodos);
  };

  const handleDescriptionChange = (index: number, newDescription: string) => {
    const updatedTodos = [...todos];
    updatedTodos[index].description = newDescription;
    setTodos(updatedTodos);
  };

  const handleFavoriteToggle = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].favorite = !updatedTodos[index].favorite;
    setTodos(updatedTodos);
  };

  const handleColorSelect = (index: number, color: CustomColorKey) => {
    const updatedTodos = [...todos];
    updatedTodos[index].color = color;
    setTodos(updatedTodos);
    setOpenColorPickerIndex(null);
  };

  const saveTodoChanges = async (todo: CardProps) => {
    console.log(todo);

    try {
      await api.put(`/todo/${todo.id}`, todo);
    } catch (error) {
      console.error("Falha ao salvar alterações:", error);
    }
  };

  return (
    <main className="bg-background h-screen">
      <Header />
      <div className="bg-background h-full w-full pt-6 px-24 sm:px-28 flex flex-col items-center">
        <CreateNote />
        {todos.map((todo, index) => (
          <Card
            key={index}
            index={index}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            color={todo.color}
            favorite={todo.favorite}
            isEditing={editingIndex === index}
            isColorPickerOpen={openColorPickerIndex === index}
            onColorPickerToggle={() => handleColorPickerToggle(index)}
            onCloseColorPicker={() => handleColorPickerToggle(null)}
            onEditToggle={() => handleEditToggle(index)}
            onTitleChange={(newTitle: string) =>
              handleTitleChange(index, newTitle)
            }
            onDescriptionChange={(newDescription: string) =>
              handleDescriptionChange(index, newDescription)
            }
            onFavoriteToggle={() => handleFavoriteToggle(index)}
            onColorSelect={(color: CustomColorKey) =>
              handleColorSelect(index, color)
            }
          />
        ))}
      </div>
    </main>
  );
}
