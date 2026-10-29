import { CELSIUS, FAHRENHEIT } from "../utils/units";

const OPTIONS = [
  { value: CELSIUS, label: "°C", description: "Celsius" },
  { value: FAHRENHEIT, label: "°F", description: "Fahrenheit" },
];

const UnitToggle = ({ unit, onChange }) => (
  <div
    className="inline-flex items-center rounded-xl border border-line bg-surface p-1 shadow-sm"
    role="group"
    aria-label="Temperature unit"
  >
    {OPTIONS.map((option) => {
      const isSelected = unit === option.value;

      return (
        <button
          key={option.value}
          type="button"
          aria-label={`Use ${option.description}`}
          aria-pressed={isSelected}
          onClick={() => onChange(option.value)}
          className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
            isSelected
              ? "bg-ink text-white shadow-sm"
              : "text-ink-soft hover:bg-slate-100 hover:text-ink"
          }`}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

export default UnitToggle;
