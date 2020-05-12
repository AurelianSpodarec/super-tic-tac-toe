import React from 'react';

interface SquareProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value?: number;
}

const Square = (props: SquareProps) => {
    const { onClick, value } = props;

    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;