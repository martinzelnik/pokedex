export default function Dimension({ dimensionName, minimum, maximum }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <h4>{dimensionName}</h4>
            <p>{`${minimum} - ${maximum}`}</p>
        </div>
    )
}