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

    let traits = libmoji.randTraits(libmoji.getTraits(gender,style[0]));

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


