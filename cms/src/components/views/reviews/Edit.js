import {
    Edit, SimpleForm, TextInput, NumberInput,
    NullableBooleanInput, DateInput,
    useNotify, useRefresh
} from 'react-admin';
import MdInput from 'ra-input-markdown';
import { Row } from 'components/layout';
import Title from './shared/Title';

const ReviewEdit = props => {
    const notify = useNotify();
    const refresh = useRefresh();

    return (
        <Edit
            onSuccess={() => {
                notify('Updated');
                refresh();
            }}
            title={<Title />}
            {...props}
        >
            <SimpleForm>
                <TextInput disabled source="id" />
                <Row>
                    <TextInput source="title" required />
                    <TextInput source="subtitle" required />
                </Row>
                <Row>
                    <TextInput disabled source="product.type" label="Product Type" />
                    <TextInput disabled source="product.name" label="Product Name" />
                </Row>
                <MdInput source="content" />
                <Row>
                    <TextInput source="pros" />
                    <TextInput source="cons" />
                </Row>
                <Row>
                    <TextInput source="tags" />
                </Row>

                <Row>
                    <NumberInput min={0} max={100} source="rating" />
                    <NumberInput min={0} max={100} source="bsi" label="Boredom Speed Index" />
                    <NullableBooleanInput source="suggested" />
                </Row>
                <Row>
                    <NullableBooleanInput source="published" />
                </Row>

                <Row>
                    <DateInput disabled source="createdAt" />
                    <DateInput disabled source="updatedAt" />
                </Row>
            </SimpleForm>
        </Edit>
    );
};

export default ReviewEdit;