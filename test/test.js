import libmoji from '../dist/libmoji.esm.js';

console.log('Imported successfully!', libmoji);

// Test the library
const randomMoji = () => {
    let pose = libmoji.poses[libmoji.randInt(libmoji.poses.length)];
    let gender = libmoji.genders[libmoji.randInt(libmoji.genders.length)];
    let style = libmoji.styles[libmoji.randInt(libmoji.styles.length)];
    let traits = libmoji.randTraits(libmoji.getTraits(gender[0],style[0]));
    let outfit = libmoji.randOutfit(libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(gender[0]))));

    let testUrl = libmoji.buildPreviewUrl(pose,3,gender[1],style[1],0,traits,outfit);

    // Add this to the end of the file as an image
    let img = document.createElement('img');
    img.src = testUrl;
    img.width = 200;
    document.body.querySelector("#randos").appendChild(img);
};

for (let i = 0; i < 4; i++) {
    randomMoji();
}

document.querySelector("button#build").addEventListener("click", () => {
    let pose = document.querySelector("select#pose").value;
    let gender = document.querySelector("select#gender").value;
    let genderVal = gender == 'male'? 1 : 2;
    let style = libmoji.styles[0];
    let brand = libmoji.getBrands(gender).filter((brand) => brand["id"] == document.querySelector("select#brands").value)[0];
    let outfit = libmoji.getOutfits(brand).filter((outfit) => outfit["id"] == document.querySelector("select#outfits").value)[0].id;

    console.log(outfit);
    console.log(libmoji.getTraits(gender,style[0]));

    let traits = [];

    Array.from(document.body.querySelector("#traits").children).forEach((child) => {
        let trait = child.querySelector("select");
        if (trait) {
            traits.push([trait.name,trait.value]);
        }
    }
    );

    let testUrl = libmoji.buildPreviewUrl(pose,3,gender == 'male'? 1 : 2,style[1],0,traits,outfit);
    let img = document.createElement('img');
    img.src = testUrl;
    img.width = 200;
    Array.from(document.body.querySelector("#bitmoji").children).forEach((child) => { child.remove(); });
    document.body.querySelector("#bitmoji").appendChild(img);

});

document.querySelector("select#gender").addEventListener("change", (e) => {
    // Update the traits and brands
    let traits = libmoji.getTraits(e.target.value,libmoji.styles[0][0]);
    let brands = libmoji.getBrands(e.target.value);

    // Clear the traits and brands
    Array.from(document.body.querySelector("#traits").children).forEach((child) => { child.remove(); });
    Array.from(document.body.querySelector("#brands").children).forEach((child) => { child.remove(); });
    Array.from(document.body.querySelector("#outfits").children).forEach((child) => { child.remove(); });

    // Add the brands
    brands.forEach((brand) => {
        let brandOption = document.createElement("option");
        brandOption.value = brand["id"];
        brandOption.innerText = brand["name"];
        document.body.querySelector("#brands").appendChild(brandOption);
    });
    
    document.querySelector("select#brands").dispatchEvent(new Event('change'));

    // Add the traits
    traits.forEach((trait) => {
        console.log(trait);
        let traitDiv = document.createElement("div");
        let traitLabel = document.createElement("label");
        traitLabel.innerText = trait.key.replace(/_/g," ") + ": ";
        traitDiv.appendChild(traitLabel);
        let traitInput = document.createElement("select");
        traitInput.id = trait.key;
        traitInput.name = trait.key;

        for (let i = 0; i < trait.options.length; i++) {
            let option = document.createElement("option");
            option.value = trait.options[i].value;
            option.innerText = trait.options[i].value == "-1" ? "None" : trait.options[i].value;
            traitInput.appendChild(option);
        }
        traitDiv.appendChild(traitInput);
        document.body.querySelector("#traits").appendChild(traitDiv);
    });
});

document.querySelector("select#brands").addEventListener("change", (e) => {
    // Update the outfits
    let outfits = libmoji.getOutfits(libmoji.getBrands(document.querySelector("select#gender").value).filter((brand) => brand["id"] == e.target.value)[0]);

    // Clear the outfits
    Array.from(document.body.querySelector("#outfits").children).forEach((child) => { child.remove(); });

    // Add the outfits
    outfits.forEach((outfit) => {
        console.log(outfit);
        let outfitOption = document.createElement("option");
        outfitOption.value = outfit["id"];
        outfitOption.innerText = outfit["description"].length > 0 ? outfit["description"] : outfit["outfit"];
        document.body.querySelector("#outfits").appendChild(outfitOption);
    });
});

// Change gender to trigger the event
document.querySelector("select#gender").dispatchEvent(new Event('change'));


// For each skin tone, add a div with a bitmoji using it and the ID
let skinTones = libmoji.getTraits("male",libmoji.styles[0][0]).filter((trait) => trait.key == "skin_tone")[0].options.map((option) => option.value);
console.log(skinTones);
skinTones.forEach((skinTone) => {
    let div = document.createElement('div');
    let text = document.createElement('p');
    text.innerText = `Skin Tone: ${skinTone}`;
    div.appendChild(text);

    let img = document.createElement('img');
    img.src = libmoji.buildPreviewUrl("head",3,1,5,0,[["skin_tone",skinTone]], "");
    img.width = 100; // Reduced width to fit better with text
    img.id = `skinTone-${skinTone}`; // Make ID more specific
    div.appendChild(img);

    document.body.querySelector("#skinTones").appendChild(div);
});

// For each hair color, add a div with a bitmoji using it and the ID
let hairColors = libmoji.getTraits("male",libmoji.styles[0][0]).filter((trait) => trait.key == "hair_tone")[0].options.map((option) => option.value);
console.log(hairColors);
hairColors.forEach((hairColor) => {
    let div = document.createElement('div');
    let text = document.createElement('p');
    text.innerText = `Hair Color: ${hairColor}`;
    div.appendChild(text);

    let img = document.createElement('img');
    img.src = libmoji.buildPreviewUrl("head",3,1,5,0,[["hair_tone",hairColor]], "");
    img.width = 100; // Reduced width to fit better with text
    img.id = `hairColor-${hairColor}`; // Make ID more specific
    div.appendChild(img);

    document.body.querySelector("#hairColors").appendChild(div);
});


// For each hair style, add a div with a bitmoji using it and the ID
let hairStyles = libmoji.getTraits("male",libmoji.styles[0][0]).filter((trait) => trait.key == "hair")[0].options.map((option) => option.value);
console.log(hairStyles);
hairStyles.forEach((hairStyle) => {
    let div = document.createElement('div');
    let text = document.createElement('p');
    text.innerText = `Hair Style: ${hairStyle}`;
    div.appendChild(text);

    let img = document.createElement('img');
    img.src = libmoji.buildPreviewUrl("head",3,1,5,0,[["hair",hairStyle]], "");
    img.width = 100; // Reduced width to fit better with text
    img.id = `hairStyle-${hairStyle}`; // Make ID more specific
    div.appendChild(img);

    document.body.querySelector("#hairStyles").appendChild(div);
});

let hairStyles2 = libmoji.getTraits("female",libmoji.styles[0][0]).filter((trait) => trait.key == "hair")[0].options.map((option) => option.value);
console.log(hairStyles2);

hairStyles2.forEach((hairStyle) => {
    let div = document.createElement('div');
    let text = document.createElement('p');
    text.innerText = `Hair Style: ${hairStyle}`;
    div.appendChild(text);

    let img = document.createElement('img');
    img.src = libmoji.buildPreviewUrl("head",3,2,5,0,[["hair",hairStyle]], "");
    img.width = 100; // Reduced width to fit better with text
    img.id = `hairStyle-${hairStyle}`; // Make ID more specific
    div.appendChild(img);

    document.body.querySelector("#hairStyles").appendChild(div);
});