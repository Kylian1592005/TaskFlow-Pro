import { useState } from "react";

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

  const [showData, setShowData] = useState([
    {
      id: 1,
      title: "JavaScript",
      description: "To interact web page",
      status: "todo",
      priority: "high",
    },
    {
      id: 2,
      title: "Js",
      description: "To interact web page",
      status: "in-progress",
      priority: "high",
    },
    {
      id: 3,
      title: "Css",
      description: "To add design",
      status: "done",
      priority: "high",
    },
  ]);

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

      {/* Form Container */}
      <form
        onSubmit={submitForm}
        className="bg-white p-6 mb-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4 border border-slate-200"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="title"
            className="text-sm font-semibold text-slate-700"
          >
            Title:
          </label>
          <input
            id="title"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            type="text"
            placeholder="e.g., learn react"
            required
            value={formInput.title}
            onChange={(e) => handleInputChange(e.target.value, e.target.id)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-slate-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            rows="3"
            placeholder="Write task details..."
            required
            value={formInput.description}
            onChange={(e) => handleInputChange(e.target.value, e.target.id)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="status"
            className="text-sm font-semibold text-slate-700"
          >
            Status:
          </label>
          <select
            id="status"
            className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formInput.status}
            onChange={(e) => handleInputChange(e.target.value, e.target.id)}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="priority"
            className="text-sm font-semibold text-slate-700"
          >
            Priority:
          </label>
          <select
            id="priority"
            className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formInput.priority}
            onChange={(e) => handleInputChange(e.target.value, e.target.id)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm ${
            editId
              ? "bg-amber-600 hover:bg-amber-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Kanban Board Grid */}
      <div className="max-w-md bg-white w-full my-3 border-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>

        {/* Flex container to place the search bar and select dropdown side-by-side */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            <input
              type="search"
              id="search"
              className="block w-full p-3 ps-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm placeholder-gray-400 focus:outline-none"
              placeholder="Search"
              required
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <select
              id="status"
              className="h-full px-3 py-3 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl items-start">
        {columns.map((col) => (
          <div
            key={col.status}
            className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[400px]"
          >
            {/* Header Badge */}
            <div
              className={`px-3 py-1.5 rounded-lg border font-bold uppercase tracking-wider text-xs mb-4 flex justify-between items-center ${col.color}`}
            >
              <span>{col.title}</span>
              <span className="text-xs bg-white bg-opacity-60 px-2 py-0.5 rounded-full">
                {searchTask.filter((d) => d.status === col.status).length}
              </span>
            </div>

            {/* Task Card Stack */}
            {searchTask.filter((d) => d.status === col.status).length ===
            0 ? (
              <div className="text-xs text-slate-400 text-center py-8 italic border-2 border-dashed border-slate-200 rounded-lg">
                No tasks here
              </div>
            ) : (
              <div className="space-y-3 flex-1">
                {searchTask
                  .filter((data) => data.status === col.status)
                  .map((data) => (
                    <div
                      key={data.id}
                      className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between gap-3 group hover:shadow-md transition-shadow duration-200"
                    >
                      <div>
                        <strong className="text-base font-semibold text-slate-800 block mb-1">
                          {data.title}
                        </strong>
                        <p className="text-sm text-slate-600 leading-relaxed break-words">
                          {data.description}
                        </p>
                      </div>

                      <div>
                        <label htmlFor="priority">
                          <b> Priority: </b>
                        </label>
                        {data.priority}
                      </div>

                      <div>
                        {columns.map((col) =>
                          col.status === data.status ? (
                            ""
                          ) : (
                            <button
                              key={col.status}
                              className="bg-transparent hover:bg-slate-100 text-slate-700 text-xs font-semibold py-1.5 px-3 mr-1 border border-slate-300 rounded-md transition-colors duration-200"
                              onClick={() =>
                                handleChangeStatus(data.id, col.status)
                              }
                            >
                              {col.title}
                            </button>
                          ),
                        )}
                      </div>

                      {/* Action Row */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleOnEdit(data.id)}
                          className="bg-transparent hover:bg-slate-100 text-slate-700 text-xs font-semibold py-1.5 px-3 border border-slate-300 rounded-md transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleOnDelete(data.id)}
                          className="bg-red-50 hover:bg-red-600 text-red-700 text-xs font-semibold hover:text-white py-1.5 px-3 border border-red-200 hover:border-transparent rounded-md transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
