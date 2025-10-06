type Props = {
  title?: string;
  values?: string | null;
};
export function CSV({ title, values = "" }: Props) {
  const vals = (values || "").split(",");
  return (
    <article className="row">
      {title && <strong>{title}:</strong>}
      {vals.map((v, i) => (
        <span key={i}>{v}</span>
      ))}
    </article>
  );
}
