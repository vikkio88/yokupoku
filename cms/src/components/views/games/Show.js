import {
    Show, SimpleShowLayout, TextField,
    DateField, ChipField, NumberField, BooleanField
} from 'react-admin';

import Title from './shared/Title';

// Single Game View
const Game = props => (
    <Show {...props} title={<Title />}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="meta.edition" label="Edition" />
            <ChipField source="genre" label="genre" />
            <ChipField source="meta.store" label="Store" label="store" />
            <NumberField source="meta.played" label="Played Time" />
            <BooleanField source="meta.refunded" label="Refunded?" />
            <NumberField source="meta.price" label="Price" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <TextField source="notes" />
        </SimpleShowLayout>
    </Show >
);

export default Game;