import {
    Create, SimpleForm, TextInput,
    NumberInput, NullableBooleanInput, DateInput,
    SelectInput
} from 'react-admin';
import { Row } from 'components/layout';
import { STORES, DEVICES } from 'yokupoku-shared/enums/cms/games';

const GameCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <Row>
                <TextInput source="name" />
                <TextInput source="genre" />
            </Row>
            <Row>
                <TextInput source="meta.edition" label="Edition" />
                <SelectInput source="meta.device" label="Device" choices={DEVICES.map(d => ({ id: d, name: d }))} />
                <SelectInput source="meta.store" label="Store" choices={STORES.map(s => ({ id: s, name: s }))} />
                <NumberInput source="meta.played" label="Played Time" step={1} min={0} />
                <NullableBooleanInput source="meta.refunded" label="Refunded?" />
                <NumberInput source="meta.price" label="Price" step={1} min={0} />
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
    </Create>
);

export default GameCreate;