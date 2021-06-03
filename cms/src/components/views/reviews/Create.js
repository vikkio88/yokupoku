import {
    Create, SimpleForm, TextInput,
    AutocompleteInput, ReferenceInput
} from 'react-admin';

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
            <TextInput multiline source="content" />
        </SimpleForm>
    </Create>
);

export default ReviewCreate;