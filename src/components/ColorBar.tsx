interface ColorBarProps {
  className?: string;
  height?: number;
}

const COLORS = ["#3ad3ef", "#ffbd59", "#5bc783", "#544fb3", "#3ad3ef", "#ffbd59", "#5bc783", "#544fb3"];

export default function ColorBar({ className = "", height = 4 }: ColorBarProps) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {COLORS.map((color, i) => (
        <span
          key={i}
          style={{ backgroundColor: color, height, borderRadius: 2 }}
          className="flex-1 block"
        />
      ))}
    </div>
  );
}
