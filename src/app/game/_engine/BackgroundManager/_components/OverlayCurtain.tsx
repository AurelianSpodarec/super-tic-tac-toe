interface CurtainProps {
  variant?: 'primary' | 'secondary' | 'gamee';
  className?: string;
}

const Curtain = ({ variant = 'primary', className = '' }: CurtainProps) => {
  const variants: Record<string, string> = {
    primary: 'curtain-primary',
    secondary: 'curtain-secondary',
    gamee: '',
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none ${variants[variant]} ${className}`}
    />
  );
};

export default Curtain;
