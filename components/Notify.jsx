export default function Notify({title, body, Icon}) {
  return (
    <div className="grid place-items-center">
      <div className="flex items-center flex-col gap-my-sm">
        <Icon size={50} />
        <div className="flex flex-col gap-my-xs text-center">
          <h2 className="text-2xl">{title}</h2>
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
}