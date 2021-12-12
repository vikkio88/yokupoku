import {
    Create, SimpleForm, TextInput, DateInput,
    SelectInput
} from 'react-admin';
import { JsonInput } from "react-admin-json-view";
import { Row } from 'components/layout';
import { TYPES } from 'yokupoku-shared/enums/cms/products';

const PrductCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <Row>
                <TextInput source="name" />
                <TextInput source="genre" />
            </Row>
            <Row>
                <SelectInput source="type" label="Type" choices={TYPES.map(t => ({ id: t, name: t }))} />
            </Row>
            <Row>
                <JsonInput source="meta" addLabel />
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

export default PrductCreate;