import {
    Show, SimpleShowLayout, TextField,
    DateField, ChipField, NumberField, BooleanField, FunctionField
} from 'react-admin';

import { Csl } from 'components/common';

import Title from './shared/Title';

// Single Game View
const Game = props => (
    <Show {...props} title={<Title />}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="type" />
            <TextField source="name" />
            <TextField source="meta.edition" label="Edition" />
            <ChipField source="genre" />
            <ChipField source="meta.store" label="Store" />
            <NumberField source="meta.played" label="Played Time" />
            <BooleanField source="meta.refunded" label="Refunded?" />
            <NumberField source="meta.price" label="Price" />
            <TextField source="notes" />
            <Csl source="tags" />
            <Csl source="links" />
            <DateField source="released" />
            <DateField source="consumed" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </SimpleShowLayout>
    </Show >
);

export default Game;