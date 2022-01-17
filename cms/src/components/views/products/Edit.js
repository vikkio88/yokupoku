import {
    Edit,
    SimpleForm, TextInput, DateInput
} from 'react-admin';
import { JsonInput } from "react-admin-json-view";
import { Row } from 'components/layout';

import Title from './shared/Title';


const PrductEdit = props => (
    <Edit {...props} title={<Title />}>
        <SimpleForm>
            <Row>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="slug" />
                <TextInput source="name" />
            </Row>
            <Row>
                <TextInput disabled source="type" />
            </Row>
            <Row>
                <JsonInput source="meta" addLabel />
            </Row>
            <Row>
                <TextInput source="tags" />
                <TextInput source="links" />
            </Row>
            <Row>
                <TextInput source="image" />
                <TextInput multiline source="notes" />
            </Row>
            <Row>
                <DateInput source="released" />
                <DateInput source="consumed" />
            </Row>
        </SimpleForm>
    </Edit>
);

export default PrductEdit;