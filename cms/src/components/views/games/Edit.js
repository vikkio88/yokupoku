import {
    Edit,
    SimpleForm, TextInput, NumberInput,
    NullableBooleanInput, SelectInput, DateInput
} from 'react-admin';

import { Row } from 'components/layout';
import { STORES } from 'enums/games';

import Title from './shared/Title';


const GameEdit = props => (
    <Edit {...props} title={<Title />}>
        <SimpleForm>
            <Row>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="name" />
            </Row>
            <Row>
                <TextInput source="genre" />
                <TextInput source="meta.edition" label="Edition" />
            </Row>
            <Row>
                <SelectInput source="meta.store" label="Store" choices={STORES.map(s => ({ id: s, name: s }))} />
                <NumberInput source="meta.played" label="Played Time" step={1} min={0} />
                <NullableBooleanInput source="meta.refunded" label="Refunded?" />
                <NumberInput source="meta.price" label="Price" step={1} min={0} />
            </Row>
            <Row>
                <TextInput multiline source="notes" />
            </Row>
            <Row>
                <DateInput source="createdAt" />
                <DateInput source="updatedAt" />
            </Row>
        </SimpleForm>
    </Edit>
);

export default GameEdit;