"use client";

interface Props {
  overrideScene?: string;   // optional scene key to go back to
  children?: React.ReactNode;
}

function BackButton({ overrideScene, children }: Props) {

  return (
    <button>
      <span className="sr-only">Go Back To Previous Scene</span>
      {children || (
        <div>
          <svg className="text-[#ffac99] fill-[#ffac99] w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M20 13.5a4.505 4.505 0 0 1-4.5 4.5H12a1 1 0 0 1 0-2h3.5a2.5 2.5 0 0 0 0-5H7.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.416l3-3a1 1 0 0 1 1.414 1.416L7.414 9H15.5a4.505 4.505 0 0 1 4.5 4.5"
            />
          </svg>
        </div>
      )}
    </button>
  );
}

export default BackButton
