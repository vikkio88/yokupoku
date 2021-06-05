import {
    Create, SimpleForm, TextInput,
    AutocompleteInput, ReferenceInput
} from 'react-admin';

import MdInput from 'ra-input-markdown';

const ReviewCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="subtitle" />
            <ReferenceInput
                label="Product"
                source="productId" reference="games"
                filterToQuery={searchText => ({ name: searchText })}
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <MdInput source="content" />
        </SimpleForm>
    </Create>
);

export default ReviewCreate;