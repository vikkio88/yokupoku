import s from "./styles.module.css";
export default function Spinner() {
  return (
    <div>
      <div className={`${s.spinner} anim_spin`}></div>
    </div>
  );
}
