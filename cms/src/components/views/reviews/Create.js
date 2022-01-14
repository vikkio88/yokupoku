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

                <ReferenceInput
                    required
                    label="Product"
                    /* to have this here I had to add a resource on the main App wrapper wtf */
                    source="productId" reference="products"
                    filterToQuery={searchText => ({ name: searchText })}
                >
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
            </Row>
            <Row>
                <TextInput source="title" required />
                <TextInput source="subtitle" required />
            </Row>
            <MdInput source="content" />
            <Row>
                <TextInput source="pros" />
                <TextInput source="cons" />
            </Row>
            <Row>
                <TextInput source="tags" />
                <TextInput source="image" />
            </Row>

            <Row>
                <NumberInput min={0} max={100} source="rating" />
                <NumberInput min={0} max={100} source="bsi" label="Boredom Speed Index" />
                <NullableBooleanInput source="suggested" />
                <NullableBooleanInput source="spoiler" />
            </Row>
            <Row>
                <NullableBooleanInput source="published" />
            </Row>
        </SimpleForm>
    </Create>
);

export default ReviewCreate;