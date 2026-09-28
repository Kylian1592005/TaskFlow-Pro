import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import SearchFilter from "./components/SearchFilter";
import KanbanBoard from "./components/KanbanBoard";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const initialForm = {
    title: "",
    description: "",
    status: "todo",
    priority: "low",
  };

  const [formInput, setFormInput] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [showData, setShowData] = useLocalStorage("tasks", []);

  const submitForm = (e) => {
    e.preventDefault();
    if (editId) {
      const data = showData.map((data) =>
        data.id === editId ? { ...data, ...formInput } : data,
      );
      setShowData(data);
      setEditId(null);
    } else {
      setShowData([
        ...showData,
        {
          id: nextId,
          ...formInput,
        },
      ]);
      setNextId((prevId) => prevId + 1);
    }
    setFormInput(initialForm);
  };

  const handleInputChange = (value, id) => {
    setFormInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOnDelete = (id) => {
    const filteredData = showData.filter((data) => data.id !== id);
    setShowData(filteredData);

    if (editId === id) {
      setEditId(null);
      setFormInput(initialForm);
    }
  };

  const handleOnEdit = (id) => {
    setEditId(id);
    const targetItem = showData.find((data) => data.id === id);
    if (targetItem) {
      setFormInput({
        title: targetItem.title,
        description: targetItem.description,
        status: targetItem.status,
        priority: targetItem.priority,
      });
    }
  };

  const handleChangeStatus = (id, status) => {
    const targetData = showData.map((data) =>
      data.id === id ? { ...data, status: status } : data,
    );
    setShowData(targetData);
  };

  const lowerSearch = search.toLowerCase();
  const trimSearch = lowerSearch.trim();

  const searchTask = showData.filter((data) => {
    const descriptionMatch = data.description
      .toLowerCase()
      .includes(trimSearch);
    const titleMatch = data.title.toLowerCase().includes(trimSearch);
    const priorityMatch = data.priority.includes(priority);

    return priorityMatch && (descriptionMatch || titleMatch);
  });

  // Helper template array to render columns easily without repeating card markup
  const columns = [
    {
      title: "Todo",
      status: "todo",
      color: "border-sky-500 bg-sky-50 text-sky-700",
    },
    {
      title: "In Progress",
      status: "in-progress",
      color: "border-amber-500 bg-amber-50 text-amber-700",
    },
    {
      title: "Done",
      status: "done",
      color: "border-emerald-500 bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-8 tracking-tight">
        Kanban Task Manager
      </h1>

      <TaskForm
        submitForm={submitForm}
        formInput={formInput}
        handleInputChange={handleInputChange}
        editId={editId}
      />

      <SearchFilter
        search={search}
        setSearch={setSearch}
        priority={priority}
        setPriority={setPriority}
      />

      <KanbanBoard
        columns={columns}
        searchTask={searchTask}
        onChangeStatus={handleChangeStatus}
        onDelete={handleOnDelete}
        onEdit={handleOnEdit}
      />
    </div>
  );
}

export default App;
