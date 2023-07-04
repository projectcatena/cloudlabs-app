type ModalTitleProps = {
  className: string,
  title: string,
  description: string,
}

export default function ModalTitle(
  { title = "", description = "", className = "" }: ModalTitleProps
) {
  return (
    <div className={className}>
      <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <p className="text-gray-500">
        {description}
      </p>
    </div>
  )
}
