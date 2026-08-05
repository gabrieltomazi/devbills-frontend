
interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowEffect?: boolean;
  hover?: boolean;
  icon?: React.ReactNode;
  subtitle?: string;
  title?: string;
}


export default function Card({
  children,
  className = "",
  hover = false,
  icon,
  subtitle,
  title
}: CardProps) {

  return (
    <main className={`bg-gray-900 rounded-xl flex-1 p-4 border-2 border-green-500  transition-all duration-150 min-w-75 max-w-2xl
    ${hover ? "hover:border-primary-500 hover:shadow-md hover:-translate-y-0.5 shadow-green-500" : ''}
    ${className}
    `}>
      <div>

        <div className="flex gap-3 mb-4 items-center">
          <div className="bg-gray-700 rounded-xl p-2">
            {icon}
          </div>
          <h2>{title}</h2>
        </div>

        {children}
      </div>
    </main>
  )
}