const Title = ({ record }) => {
    return <span>Game: {record ? `"${record.name}"` : ''}</span>;
};

export default Title;