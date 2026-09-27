export default function TaskCard({
  task,
  columns,
  onChangeStatus,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between gap-3 group hover:shadow-md transition-shadow duration-200">
      <div>
        <strong className="text-base font-semibold text-slate-800 block mb-1">
          {task.title}
        </strong>
        <p className="text-sm text-slate-600 leading-relaxed break-words">
          {task.description}
        </p>
      </div>

      <div>
        <label htmlFor="priority">
          <b> Priority: </b>
        </label>
        {task.priority}
      </div>

      <div>
        {columns.map((col) =>
          col.status === task.status ? (
            ""
          ) : (
            <button
              key={col.status}
              className="bg-transparent hover:bg-slate-100 text-slate-700 text-xs font-semibold py-1.5 px-3 mr-1 border border-slate-300 rounded-md transition-colors duration-200"
              onClick={() => onChangeStatus(task.id, col.status)}
            >
              {col.title}
            </button>
          ),
        )}
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => onEdit(task.id)}
          className="bg-transparent hover:bg-slate-100 text-slate-700 text-xs font-semibold py-1.5 px-3 border border-slate-300 rounded-md transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-50 hover:bg-red-600 text-red-700 text-xs font-semibold hover:text-white py-1.5 px-3 border border-red-200 hover:border-transparent rounded-md transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
