import { Edit, SimpleForm, TextInput, NumberInput, NullableBooleanInput, DateInput } from 'react-admin';

// Single Game View
const Game = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="name" />
            <TextInput source="genre" />
            <TextInput source="meta.edition" label="Edition" />
            <TextInput source="meta.store" label="Store" />
            <NumberInput source="meta.played" label="Played Time" step={1} min={0} />
            <NullableBooleanInput source="meta.refunded" label="Refunded?" />
            <NumberInput source="meta.price" label="Price" step={1} min={0} />
            <DateInput source="createdAt" />
        </SimpleForm>
    </Edit>
);

export default Game;