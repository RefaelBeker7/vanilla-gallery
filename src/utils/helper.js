var getFiveImg = (index, cached_images) => {
    let randomNum, result = [];
    for (let i = 0; i < 5; i++) {
        randomNum = index[Math.floor(Math.random() * index.length)];
        result.push(cached_images[randomNum]);
        index.splice(randomNum, 1);
    }
    return result;
}

module.exports = {
   getFiveImg
}