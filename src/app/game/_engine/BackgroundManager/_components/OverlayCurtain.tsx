interface OverlayCurtainProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const OverlayCurtain: React.FC<OverlayCurtainProps> = ({
  variant = 'primary',
  className = '',
}) => {
  const variants = {
    primary: "theme-bg-menu-curtain",
    secondary: "theme-bg-curtain",
    gamee: ""
    // primary: "bg-[radial-gradient(circle,rgba(0,0,0,0)_10%,rgba(0,0,0,0.85)_60%)] animate-fadeOut",
    // secondary: "bg-[radial-gradient(circle,rgba(0,0,0,0)_-40%,rgba(0,0,0,0.85)_50%)] animate-fadeOut-slow",
  };

  return (
    <div className={`fixed inset-0 pointer-events-none select-none ${variants[variant]} ${className}`} />
  );
};
