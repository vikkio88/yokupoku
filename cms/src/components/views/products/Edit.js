import {
    Edit,
    SimpleForm, TextInput, NumberInput,
    NullableBooleanInput, SelectInput, DateInput
} from 'react-admin';

import { Row } from 'components/layout';

import Title from './shared/Title';


const Edit = props => (
    <Edit {...props} title={<Title />}>
        <SimpleForm>
            <Row>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="name" />
            </Row>
            <Row>
                <TextInput disabled source="type" />
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
    </Edit>
);

export default Edit;