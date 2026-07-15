import { ArrowLeft } from "lucide-react";

export default function Header({
  title,
  onBack,
  onDone,
  showDone = false,
}) {
  return (
    <header className="page-header">
      <button
        className="header-back"
        onClick={onBack}
        aria-label="Go back"
      >
        <ArrowLeft size={22} />
      </button>

      <h1 className="page-title">{title}</h1>

      {showDone ? (
        <button
          className="header-done"
          onClick={onDone}
        >
          Done
        </button>
      ) : (
        <div className="header-spacer" />
      )}
    </header>
  );
}