import {
    Edit,
    SimpleForm, TextInput, NumberInput,
    NullableBooleanInput, SelectInput, DateInput
} from 'react-admin';

import { Row } from 'components/layout';
import { STORES, DEVICES } from 'yokupoku-shared/enums/cms/games';

import Title from './shared/Title';


const GameEdit = props => (
    <Edit {...props} title={<Title />}>
        <SimpleForm>
            <Row>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="slug" />
                <TextInput source="name" />
            </Row>
            <Row>
                <TextInput disabled source="type" />
                <TextInput source="genre" />
                <TextInput source="meta.edition" label="Edition" />
            </Row>
            <Row>
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
            <Row>
                <DateInput source="createdAt" />
                <DateInput source="updatedAt" />
            </Row>
        </SimpleForm>
    </Edit>
);

export default GameEdit;