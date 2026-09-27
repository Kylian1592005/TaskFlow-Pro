import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard({
  columns,
  searchTask,
  onChangeStatus,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl items-start">
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          column={column}
          columns={columns}
          tasks={searchTask}
          onChangeStatus={onChangeStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
