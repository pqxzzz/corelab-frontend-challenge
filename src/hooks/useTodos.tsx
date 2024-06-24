import { useState } from "react";
import { CardProps } from "@/types/CardProps";
import api from "@/services/api";
import { CustomColorKey } from "@/utils/customColors";

const useTodos = () => {
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
    const updatedTodos = [...todos];
    updatedTodos[index].title = newTitle;
    setTodos(updatedTodos);
  };

  const handleDescriptionChange = (index: number, newDescription: string) => {
    const updatedTodos = [...todos];
    updatedTodos[index].description = newDescription;
    setTodos(updatedTodos);
  };

  const handleFavoriteToggle = async (index: number) => {
    if (index >= 0 && index < todos.length) {
      const updatedTodos = [...todos];
      updatedTodos[index].favorite = !updatedTodos[index].favorite;
      setTodos(updatedTodos);

      try {
        await api.put(`/todo/${updatedTodos[index].id}`, {
          favorite: updatedTodos[index].favorite
        });
      } catch (error) {
        console.error("Falha ao atualizar status de favorito:", error);
      }
    } else {
      console.error("Índice inválido:", index);
    }
  };

  const handleColorSelect = (index: number, color: CustomColorKey) => {
    const updatedTodos = [...todos];
    updatedTodos[index].color = color;
    setTodos(updatedTodos);
    setOpenColorPickerIndex(null);
  };

  const saveTodoChanges = async (todo: CardProps) => {
    try {
      await api.put(`/todo/${todo.id}`, todo);
    } catch (error) {
      console.error("Falha ao salvar alterações:", error);
    }
  };

  return {
    todos,
    editingIndex,
    openColorPickerIndex,
    handleColorPickerToggle,
    handleEditToggle,
    handleTitleChange,
    handleDescriptionChange,
    handleFavoriteToggle,
    handleColorSelect,
    fetchTodos
  };
};

export default useTodos;
