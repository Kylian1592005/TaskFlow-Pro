import TaskCard from "./TaskCard";

export default function KanbanColumn({
  column,
  columns,
  tasks,
  onChangeStatus,
  onEdit,
  onDelete,
}) {
  const columnTasks = tasks.filter((task) => task.status === column.status);
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
      <div
        className={`px-3 py-1.5 rounded-lg border font-bold uppercase tracking-wider text-xs mb-4 flex justify-between items-center ${column.color}`}
      >
        <span>{column.title}</span>
        <span className="text-xs bg-white bg-opacity-60 px-2 py-0.5 rounded-full">
          {columnTasks.length}
        </span>
      </div>

      {columnTasks.length === 0 ? (
        <div className="text-xs text-slate-400 text-center py-8 italic border-2 border-dashed border-slate-200 rounded-lg">
          No tasks here
        </div>
      ) : (
        <div className="space-y-3 flex-1">
          {columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columns={columns}
              onChangeStatus={onChangeStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
