import {
    Edit, SimpleForm, TextInput,
    AutocompleteInput, ReferenceInput,
    useNotify, useRefresh, useRedirect
} from 'react-admin';

import MdInput from 'ra-input-markdown';

const ReviewEdit = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    //const redirect = useRedirect();
    return (
        <Edit
            onSuccess={() => {
                notify('Updated');
                refresh();
            }}
            {...props}
        >
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="title" />
                <TextInput source="subtitle" />
                <ReferenceInput
                    disabled
                    label="Product"
                    source="productId" reference="games"
                    // for some reason this shit breaks crap
                    // filterToQuery={searchText => ({ name: searchText })}
                >
                    <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <MdInput source="content" />
            </SimpleForm>
        </Edit>
    );
};

export default ReviewEdit;