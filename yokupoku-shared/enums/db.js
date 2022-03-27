const TABLES = {
    PRODUCTS: 'products',
    REVIEWS: 'reviews',
    DEVICES: 'devices',
};


const PRODUCT_TYPES = {
    GAME: 'game',
    MOVIE: 'movie',
    BOOK: 'book',
    TV: 'tv',
    MUSIC: 'music',
    COMIC_BOOK: 'comic_book',
    OTHER: 'other',
};

const DEVICE_TYPES = {
    GAME_CONSOLE: 'game_console',
    PC: 'pc',
    READING: 'reading',
    MULTIMEDIA: 'multimedia',
    OTHER: 'other',
};


// For games
const GAMES_STORES = [
    'steam',
    'gog',
    'origin',
    'epic',
    'battle.net',
    'ubi',
    'itch.io',
    'nintendo:eshop',
    'playstation:store',
    'xbox:store',
    // used for slug
    'other',
    'physicalsupport',
    'amazon',
    'amazon:used',
];


const SLUGEABLE_STORES = GAMES_STORES.slice(0, 9);


module.exports = {
    TABLES,
    PRODUCT_TYPES,
    GAMES_STORES,
    SLUGEABLE_STORES,
    DEVICE_TYPES
};