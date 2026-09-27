export default function TaskForm({formInput, submitForm, handleInputChange, editId}) {
  return (
    <form
      onSubmit={submitForm}
      className="bg-white p-6 mb-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4 border border-slate-200"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-semibold text-slate-700">
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
  );
}
