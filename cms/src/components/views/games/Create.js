import {
    Create, SimpleForm, TextInput,
    NumberInput, NullableBooleanInput,
    SelectInput, TextField
} from 'react-admin';
import { Row } from 'components/layout';
import { STORES } from 'enums/games';

const GameCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <Row>
                <TextInput source="name" />
                <TextInput source="genre" />
            </Row>
            <Row>
                <TextInput source="meta.edition" label="Edition" />
                <SelectInput source="meta.store" label="Store" choices={STORES.map(s => ({ id: s, name: s }))} />
                <NumberInput source="meta.played" label="Played Time" step={1} min={0} />
                <NullableBooleanInput source="meta.refunded" label="Refunded?" />
                <NumberInput source="meta.price" label="Price" step={1} min={0} />
            </Row>
            <Row>
                <TextInput multiline source="notes" />
            </Row>
        </SimpleForm>
    </Create>
);

export default GameCreate;