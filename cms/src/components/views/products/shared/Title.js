const Title = ({ record }) => {
    return <span>Product: {record ? `"${record.name}"` : ''}</span>;
};

export default Title;