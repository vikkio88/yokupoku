const Title = ({ record }) => {
    return <span>Review: {record ? `"${record.Title}"` : ''}</span>;
};

export default Title;