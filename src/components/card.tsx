
interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowEffect?: boolean;
  hover?: boolean;
  icon?: React.ReactNode;
  title?: string;
}


export default function Card({
  children,
  className = "",
  icon,
  title
}: CardProps) {

  return (
    <main className={`rounded-xl p-4 bg-gray-900 border border-gray-500 transition-all duration-250 min-w-75
    hover:shadow-md hover:-translate-y-0.5 hover:border-primary-500
    ${className}
    `}>
      <div>

        <div className="flex gap-3 mb-4 items-center">
          {icon && (

            <div className="bg-gray-700 rounded-xl p-2">
              {icon}
            </div>
          )}

          <h2>{title}</h2>
        </div>

        {children}
      </div>
    </main>
  )
}