import { Tooltip } from 'react-tippy';

const T = props => {
    const { children, ...rest } = props;

    return (
        <Tooltip
            position="top"
            trigger="mouseenter"
            arrow
            inertia
            {...rest}
        >
            {children}
        </Tooltip>
    );
};

export default T;