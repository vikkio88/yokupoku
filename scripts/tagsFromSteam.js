const tags = document.getElementsByClassName("app_tag");
const extractedTags = [];
for (i = 0; i < tags.length; i++) {
    //extractedTags.push(trim());
    const tag = tags.item(i).text;
    if (!Boolean(tag)) continue;
    extractedTags.push(tag.trim().toLowerCase());
}
console.log(extractedTags.join(", "));