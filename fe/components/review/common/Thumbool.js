const Thumbool = ({ value = false, className }) => {
    return (
        <span className={className}>
            {value ? '👍' : '👎'}
        </span>
    );
}

export default Thumbool;