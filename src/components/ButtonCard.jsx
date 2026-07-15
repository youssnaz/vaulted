export default function ButtonCard({
  icon,
  title,
  subtitle,
  onClick,
}) {
  return (
    <button className="action-card" onClick={onClick}>
      <span className="icon-shell">
        {icon}
      </span>

      <span className="action-text">
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>

      <span className="arrow">›</span>
    </button>
  );
}