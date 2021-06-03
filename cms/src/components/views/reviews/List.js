import { List, Datagrid, TextField, EditButton, ShowButton, FunctionField, linkToRecord } from 'react-admin';
import { Link } from 'react-router-dom';

const productLink = record => {
    return (
        <Link to={linkToRecord('games', record.product.id, 'show')}>
            {`${record.product.name}`}
        </Link>
    );
};

// the list of Reviews
const Reviews = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <FunctionField
                label="Product"
                render={productLink}
            />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);

export default Reviews;