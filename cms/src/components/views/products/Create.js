import {
    Create, SimpleForm, TextInput,
    NumberInput, NullableBooleanInput, DateInput,
    SelectInput
} from 'react-admin';
import { Row } from 'components/layout';
import { TYPES } from 'enums/products';

const Create = props => (
    <Create {...props}>
        <SimpleForm>
            <Row>
                <TextInput source="name" />
                <TextInput source="genre" />
            </Row>
            <Row>
                <SelectInput source="type" label="Type" choices={TYPES.map(t => ({ id: t, name: t }))} />
                <TextInput source="meta" label=" Meta"/>
            </Row>
            <Row>
                <TextInput source="tags" />
                <TextInput source="links" />
            </Row>
            <Row>
                <TextInput multiline source="notes" />
            </Row>
            <Row>
                <DateInput source="released" />
                <DateInput source="consumed" />
            </Row>
        </SimpleForm>
    </Create>
);

export default Create;