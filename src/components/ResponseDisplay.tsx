interface ResponseDisplayProps {
  text: string;
}

export function ResponseDisplay({ text }: ResponseDisplayProps) {
  return (
    <div className="glass-card p-6 rounded-xl max-w-2xl mx-auto animate-fade-in">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {text}
      </p>
    </div>
  );
}
