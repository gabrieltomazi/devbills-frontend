import { type ReactNode, type SelectHTMLAttributes, useId } from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
    fullWidth?: boolean;
    options: SelectOption[];
}

export default function Select({
    className = "",
    error,
    fullWidth = true,
    id,
    icon,
    label,
    options,
    ...rest
}: SelectProps) {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <div className={`${fullWidth ? "w-full" : ""} mb-4`}>

            {/* Caso tenha label, renderiza a label */}
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-50 mb-2">
                    {label}
                </label>
            )}

            {/* Caso tenha icon, renderiza o icon */}
            <div className="relative">
                {icon && (
                    <div className="absolute top-5 inset-y-0 left-0 pl-2 flex items-center cursor-pointer text-gray-400">
                        {icon}
                    </div>
                )}
            </div>

            <select
                className={`block w-full rounded-xl border ${error ? "border-red-500" : "border-gray-700"}
                bg-gray-800 px-4 py-3 text-sm text-gray-50 transition-all focus:outline-none focus:ring-2
                ${error ? "focus:border-red-500 focus:ring-red-500/20" : "focus:border-primary-500 focus:ring-primary-500/20"}
                ${icon ? "pl-10" : ""}
                ${className}
                `}
                id={inputId}
                defaultValue=""
                {...rest}
            >

                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
