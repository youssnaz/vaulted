export default function TextField({
  label,
  placeholder = "",
  type = "text",
  value,
  onChange,
}) {
  return (
    <div className="text-field">
      <label>{label}</label>

      <input
        className="text-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}