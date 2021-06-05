const Csl = ({ source, record }) => {
    const values = record?.[source]?.trim()?.split(',') ?? null;
    if (!values) return <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>Nothing yet...</span>;
    return (
        <ul>
            {values.map((v, i) => <li key={`${source}_${i}`}>{v}</li>)}
        </ul>
    );

};

Csl.defaultProps = {
    addLabel: true
};

export default Csl;