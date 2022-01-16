
const Reviews = ({ reviews }) => {

    return (
        <>
            <h3>Reviews</h3>
            <ul>
                {reviews.map(r => (
                    <li key={r.id}>
                        {r.updatedAt} - {r.title} {r.subtitle}
                    </li>
                ))}
            </ul>
        </>
    );
};


export default Reviews;