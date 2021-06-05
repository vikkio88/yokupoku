const Title = ({ record }) => {
    return <span>Review: {record ? `"${record?.title || 'No Title'}" (${record?.product?.name ?? "Product"})` : ''}</span>;
};

export default Title;