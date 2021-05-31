import { Show, SimpleShowLayout, TextField, DateField, ChipField, NumberField, BooleanField } from 'react-admin';

// Single Game View
const Game = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="meta.edition" label="Edition" />
            <ChipField source="genre" />
            <ChipField source="meta.store" label="Store" />
            <NumberField source="meta.played" label="Played Time" />
            <BooleanField source="meta.refunded" label="Refunded?" />
            <NumberField source="meta.price" label="Price" options={{ style: 'currency', currency: 'GBP' }} />
            <TextField source="genre" />
            <DateField source="createdAt" />
        </SimpleShowLayout>
    </Show>
);

export default Game;