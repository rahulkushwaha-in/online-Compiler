import { Sun, Moon, Monitor } from 'lucide-react';

const themes = [
  { id: 'vs-dark', icon: Moon, label: 'Dark' },
  { id: 'vs-light', icon: Sun, label: 'Light' },
  { id: 'hc-black', icon: Monitor, label: 'High Contrast' },
];

export function ThemeSwitcher({ theme, onThemeChange }) {
  return (
    <div className="flex gap-2">
      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onThemeChange(id)}
          className={`p-2 rounded-md flex items-center gap-2 transition-colors ${
            theme === id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
          }`}
          title={`Switch to ${label} theme`}
        >
          <Icon size={18} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}