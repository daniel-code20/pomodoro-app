type Props = {
  radius: number
  stroke: number
  progress: number // 0 - 100
  color: string
}

const ProgressRing = ({
  radius,
  stroke,
  progress,
  color,
}: Props) => {
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset =
    circumference - (progress / 100) * circumference

  return (
    <svg height={radius * 2} width={radius * 2}>
      {/* background */}
      <circle
        stroke="currentColor"
        className="text-gray-300 dark:text-zinc-700"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      {/* progress */}
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{
          transition: "stroke-dashoffset 1s linear",
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
        }}
      />
    </svg>
  )
}

export default ProgressRing
