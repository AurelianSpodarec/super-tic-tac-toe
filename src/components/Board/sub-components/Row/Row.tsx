import React from 'react';

interface RowProps {
    children?: any;
}

const Row = (props: RowProps) => {
    const { children } = props;
    console.log("children", children)

    return (
        <div className="row">
            {children}
        </div>
    );
}

export default Row;