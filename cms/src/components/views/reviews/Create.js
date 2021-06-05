import {
    Create, SimpleForm, TextInput,
    AutocompleteInput, ReferenceInput,
    NumberInput, NullableBooleanInput
} from 'react-admin';

import { Row } from 'components/layout';
import MdInput from 'ra-input-markdown';

const ReviewCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <Row>
                <TextInput source="title" required />
                <TextInput source="subtitle" required />
            </Row>
            <ReferenceInput
                required
                label="Product"
                source="productId" reference="games"
                filterToQuery={searchText => ({ name: searchText })}
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <MdInput source="content" />
            <Row>
                <TextInput source="pros" />
                <TextInput source="cons" />
            </Row>
            <Row>
                <TextInput source="tags" />
            </Row>

            <Row>
                <NumberInput min={0} max={100} source="rating" />
                <NumberInput min={0} max={100} source="bsi" label="Boredom Speed Index" />
                <NullableBooleanInput source="suggested" />
            </Row>
            <Row>
                <NullableBooleanInput source="published" />
            </Row>
        </SimpleForm>
    </Create>
);

export default ReviewCreate;