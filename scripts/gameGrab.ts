import { appendFileSync, writeFileSync } from "node:fs";
import { getInfoFromSteam, reupImage } from "./metaGrab";

const args = Bun.argv.slice(2);
if (args.length < 1) {
  console.error("need steam url");
  process.exit(1);
}

const OUTPUT_FILE = "data/games.json";
const steamUrl = args[0];
const storeUrl = args[1] || undefined;

type Game = {
  name: string;
  genre: string | cheerio.TagElement;
  meta: {
    device: string;
    store: string;
    played: number;
    edition: string | null;
    refunded: boolean;
    price: number;
  };
  tags: string;
  links: string;
  image: string | null;
};

const main = async (steamUrl: string, storeUrl?: string) => {
  console.log("Parsing game", {
    steamUrl,
    storeUrl,
  });

  const outputFile = Bun.file(OUTPUT_FILE);
  let games: Game[] = [];
  try {
    if (await outputFile.exists()) {
      games = (await outputFile.json()) as Game[];
    }
  } catch (error) {
    console.error(`Error while parsing ${OUTPUT_FILE}`, { error });
    process.exit(1);
  }

  const { image, tags, title } = await getInfoFromSteam(steamUrl);
  console.log("got info from steam");
  let name = title.replace(/Save.+?on (.+?)(?: on Steam)?/, "$1") || title;
  const game = {
    name,
    genre: tags[0],
    meta: {
      device: "pc",
      store: !Boolean(storeUrl) ? "steam" : getStoreFromUrl(storeUrl),
      played: 0,
      edition: null,
      refunded: false,
      price: 0,
    },
    tags: tags.join(", ") as string,
    links: storeUrl || steamUrl,
    image: null,
  };
  const img = await reupImage(image);
  game.image = img;
  games.push(game);

  console.log(`Got game '${name}', store: '${game.meta.store}'`);
  try {
    await Bun.write(OUTPUT_FILE, JSON.stringify(games, null, 2));
  } catch (error) {
    console.error(`Error while writing on file ${OUTPUT_FILE}`, { error });

    process.exit(1);
  }

  console.log(`\tsaved in ${OUTPUT_FILE}`);
  console.log("all finished. Bye!");
  process.exit(0);
};

function getStoreFromUrl(url?: string | null) {
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
    { name: "amazon:used", pattern: /amazon\.com\/used/ },
  ];
  for (const store of stores) {
    if (store.pattern.test(url ?? "")) {
      return store.name;
    }
  }
  return "unknown";
}

main(steamUrl, storeUrl);
