interface OverlayCurtainProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

function OverlayCurtain({ variant = 'primary', className = '' }: OverlayCurtainProps) {
  const variants = {
    primary: "theme-bg-menu-curtain",
    secondary: "theme-bg-curtain",
    gamee: ""
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none ${variants[variant]} ${className}`}
    />
  );
}

export default OverlayCurtain;
