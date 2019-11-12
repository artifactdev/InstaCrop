const fs = window.require("fs");
const sharp = window.require("sharp");

let config = {
    width: 1080,
    height: 1350,
    blur: 20,
    darkeness : 0.3
};

document.addEventListener("DOMContentLoaded", function() {
    var holder = document.getElementById("drag-file");
    var body = document.getElementsByTagName("body")[0];
    var resetButton = document.getElementById("resetButton");
    var successElement = document.getElementById("success");
    var proceedElement = document.getElementById("imagesProceeded");
    var proceedImage = {
        totalImages: 0,
        savedImage: 0
    };

    tinybind.bind(proceedElement, { proceedImage: proceedImage });
    tinybind.bind(successElement, { proceedImage: proceedImage });

    resetButton.addEventListener("click", function() {
        reset();
    });

    const init = function() {
        prepareConfig();
    }


    let prepareConfig = function() {
        config.width = isInStorage('width')  ? parseInt(getItem('width')) : 1080;
        config.height = isInStorage('height')  ? parseInt(getItem('height')) : 1350;
        config.blur = isInStorage('blur')  ? parseInt(getItem('blur')) : 20;
        config.darkeness = isInStorage('darkeness')  ? parseFloat(getItem('darkeness')) : 0.3;
        console.log(config);
        prependDroparea();

    }

    let prependDroparea = function() {
        holder.ondragover = () => {
            body.classList.add("dragover");
            return false;
        };

        holder.ondragleave = () => {
            body.classList.remove("dragover");
            return false;
        };

        holder.ondragend = () => {
            body.classList.remove("dragover");
            return false;
        };

        holder.ondrop = e => {
            e.preventDefault();
            body.classList.remove("dragover");
            body.classList.add("proceed");
            let proceeded = document.getElementById("imagesProceeded");
            for (let index = 0; index < e.dataTransfer.files.length; index++) {
                const image = e.dataTransfer.files[index];
                proceedImage.totalImages = e.dataTransfer.files.length;
                console.log("File(s) you dragged here: ", image.path, image);
                handleImage(image.path, index);
            }

            return false;
        };
    }

    let imagesDone = function() {
        body.classList.remove("proceed");
        body.classList.add("done");
    };

    let handleImage = function(path, index) {
        console.log(path);
        let imagePath = path.match(/^.*(\\|\/|\:)/);
        let fileName = path.replace(/^.*(\\|\/|\:)/, "");
        console.log(imagePath, fileName);

        var resized = sharp(path);

        resized.metadata().then(function(metadata) {
            console.log(metadata);
            if (metadata.width < metadata.height) {
                generateImage(resized, path, imagePath, fileName, index);
            } else {
                resized.toBuffer().then(function(buffer) {
                    saveImage(buffer, imagePath, fileName, index);
                });
            }
        });
    };

    let generateImage = function(resized, path, imagePath, fileName, index) {
        sharp(path)
            .resize(config.width, config.height, {
                fit: "contain",
                background: { r: 0, g: 0, b: 0, alpha: config.darkeness }
            })
            .raw()
            .toBuffer()
            .then(function(buffer) {
                generateBackground(resized, buffer, imagePath, fileName, index);
            });
    };

    let generateBackground = function(
        resized,
        buffer,
        imagePath,
        fileName,
        index
    ) {
        console.log(blur)
        resized
            .resize(config.width, config.height, {
                fit: "cover"
            })
            .blur(config.blur)
            .composite([
                {
                    input: buffer,
                    gravity: "centre",
                    blend: "over",
                    raw: { width: config.width, height: config.height, channels: 4 }
                }
            ])
            .toBuffer()
            .then(data => {
                console.log(data);
                saveImage(data, imagePath, fileName, index);
            })
            .catch(err => {
                console.log(err);
            });
    };

    let saveImage = function(image, path, filename, index) {
        if (!fs.existsSync(path[0] + "Instagram/")) {
            fs.mkdirSync(path[0] + "Instagram/");
        }
        proceedImage.savedImage = proceedImage.savedImage + 1;
        fs.writeFile(path[0] + "Instagram/" + filename, image, "base64", function(
            err
        ) {
            if (err) {
                console.log(err);
                return;
            }
            if (proceedImage.savedImage === proceedImage.totalImages) {
                imagesDone();
            }
        });
    };

    let reset = function() {
        proceedImage.savedImage = 0;
        proceedImage.totalImages = 0;
        body.classList.remove("done");
    };

    const isInStorage = function(key) {
        var item = window.localStorage.getItem(key);
        console.log('key', item)
        if (item !== null) {
            return true;
        } else {
            return false;
        }
    }

    const getItem = function(key) {
        return window.localStorage.getItem(key);
    }

    const setItem = function(key, value) {
        window.localStorage.setItem(key,value);
    }

    init();
});
