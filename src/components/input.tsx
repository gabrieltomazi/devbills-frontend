import { type InputHTMLAttributes, type ReactNode, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  id?: string;
  label?: string;
  placeholder?: string;

}


export default function Input({
  error,
  fullWidth,
  icon,
  id,
  label,
  placeholder,
  className,
  ...rest
}: InputProps) {

  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`${fullWidth ? "w-full" : ''} mb-4`}>

      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-50 mb-2">
          {label}
        </label>
      )}

      <div>

      </div>

      <div className="relative">
        {icon && (
          <div className="absolute bottom-0 top-5 inset-y-0 left-0 pl-3 flex items-center cursor-pointer text-gray-400">
            {icon}
          </div>
        )}
      </div>

      <input
        className={`block w-full rounded-xl border ${error ? "border-red-500" : "border-gray-700"}
        bg-gray-800 px-4 py-3 text-sm text-gray-50 transition-all focus:outline-none focus:ring-2
        ${error ? "focus:border-red-500 focus:ring-red-500/20" : "focus:border-primary-500 focus:ring-primary-500/20"}
        ${icon ? "pl-10" : ''}
        ${className}
        `}
        placeholder={placeholder}
        type="text"
        id={inputId}
        {...rest}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}

    </div>

  )

}
