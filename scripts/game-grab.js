const fs = require('fs');
const { getInfoFromSteam, reupImage } = require('./meta-grab');

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('need steam url');
    process.exit(1);
}

const OUTPUT_FILE = 'data/games.json';
const steamUrl = args[1];
const storeUrl = args[2] || null;


const main = async url => {
    const { image, tags, title } = await getInfoFromSteam(url);
    const imageUrl = await reupImage(image);
    const game =
    {
        "name": title,
        "genre": tags[0],
        "meta": {
            "device": "pc",
            "store": !Boolean(storeUrl) ? "steam" : getStoreFromUrl(storeUrl),
            "played": 0,
            "edition": null,
            "refunded": false,
            "price": 0
        },
        "tags": tags.join(', '),
        "links": storeUrl || steamUrl,
        "image": imageUrl
    };

    console.log(`Got game '${game.name}', store: '${game.meta.store}'`);
    fs.appendFileSync(OUTPUT_FILE, JSON.stringify(game, null, 2));

    process.exit(0);
};

function getStoreFromUrl(url) {
    const stores = [
        { name: "epic", pattern: /epicgames\.com/ },
        { name: "steam", pattern: /store\.steampowered\.com/ },
        { name: "gog", pattern: /gog\.com/ },
        { name: "origin", pattern: /origin\.com|ea\.com/ },
        { name: "battle.net", pattern: /battle\.net/ },
        { name: "ubi", pattern: /store\.ubisoft\.com/ },
        { name: "itch.io", pattern: /itch\.io/ },
        { name: "nintendo:eshop", pattern: /nintendo\.com/ },
        { name: "playstation:store", pattern: /store\.playstation\.com/ },
        { name: "xbox:store", pattern: /microsoft\.com|xbox\.com/ },
        { name: "amazon", pattern: /amazon\.com/ },
        { name: "amazon:used", pattern: /amazon\.com\/used/ }
    ];
    for (const store of stores) {
        if (store.pattern.test(url)) {
            return store.name;
        }
    }
    return "unknown";
}


main(steamUrl);