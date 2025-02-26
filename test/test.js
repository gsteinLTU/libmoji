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
    document.body.appendChild(img);
};

for (let i = 0; i < 8; i++) {
    randomMoji();
}

