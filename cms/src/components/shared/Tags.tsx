import styles from "./styles/tags.module.css";

interface Props {
  tagStrings: string | string[];
}

export default function Tags({ tagStrings }: Props) {
  let tags = new Set<string>();
  const ts = Array.isArray(tagStrings) ? tagStrings : [tagStrings];

  for (const t of ts) {
    tags = new Set([...tags, ...t.split(",")]);
  }

  return (
    <>
      {[...tags].map((t) => (
        <div key={t} className={styles.chip}>
          <span>#</span>
          {t}
        </div>
      ))}
    </>
  );
}
