export function Input({ label, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm mb-1">{label}</label>}
      <input {...props} className={`w-full border rounded px-3 py-2 ${props.className || ''}`} />
    </div>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm mb-1">{label}</label>}
      <select {...props} className={`w-full border rounded px-3 py-2 ${props.className || ''}`}>{children}</select>
    </div>
  );
}

export function Button({ children, className = '', ...props }) {
  return (
    <button {...props} className={`px-4 py-2 rounded bg-medium-slate-blue text-white ${className}`}>{children}</button>
  );
}


