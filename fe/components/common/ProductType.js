import { PRODUCT_TYPES } from 'yokupoku-shared/enums/db';

const map = {
    [PRODUCT_TYPES.GAME]: '🎮',
    [PRODUCT_TYPES.MOVIE]: '🎥',
    [PRODUCT_TYPES.BOOK]: '📚',
    [PRODUCT_TYPES.TV]: '📺',
    [PRODUCT_TYPES.MUSIC]: '🎶',
    [PRODUCT_TYPES.COMIC_BOOK]: '🗯️',
    [PRODUCT_TYPES.OTHER]: '🤷',
};


const ProductType = ({ type }) => {
    if (!Object.keys(map).includes(type)) return null;

    return <span title={type}>{map[type]}</span>;
};


export default ProductType;