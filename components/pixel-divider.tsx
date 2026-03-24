interface PixelDividerProps {
  variant?: "default" | "alt"
}

export function PixelDivider({ variant = "default" }: PixelDividerProps) {
  const colors = variant === "default" 
    ? ["bg-pixel-red", "bg-pixel-yellow", "bg-pixel-green", "bg-pixel-blue"]
    : ["bg-pixel-blue", "bg-pixel-green", "bg-pixel-yellow", "bg-pixel-red"]

  return (
    <div className="flex justify-center items-center gap-2 py-8">
      {colors.map((color, i) => (
        <div
          key={i}
          className={`w-3 h-3 ${color}`}
          style={{ 
            imageRendering: "pixelated",
            animation: `pixel-bounce 1s ease-in-out ${i * 0.1}s infinite`
          }}
        />
      ))}
      <div className="w-16 h-0.5 bg-border mx-2" />
      {colors.reverse().map((color, i) => (
        <div
          key={i + 4}
          className={`w-3 h-3 ${color}`}
          style={{ 
            imageRendering: "pixelated",
            animation: `pixel-bounce 1s ease-in-out ${(i + 4) * 0.1}s infinite`
          }}
        />
      ))}
    </div>
  )
}
