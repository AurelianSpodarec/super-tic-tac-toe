import React from 'react';

interface SquareProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value?: any;
}

const Square = (props: SquareProps) => {
    const { onClick, value } = props;

    return (
        <button style={{ "padding": "35px" }} className="square" onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;