const fs = window.require("fs");
const sharp = window.require("sharp");

document.addEventListener("DOMContentLoaded", function() {
    var holder = document.getElementById("drag-file");
    var body = document.getElementsByTagName("body")[0];
    var resetButton = document.getElementById("resetButton");
    var proceedElement = document.getElementById("imagesProceeded");
    var proceedImage = {
        currentImage: 0,
        totalImages: 0
    };

    tinybind.bind(proceedElement, { proceedImage: proceedImage });

    resetButton.addEventListener("click", function() {
        reset();
    });

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

    let imagesDone = function() {
        body.classList.remove("proceed");
        body.classList.add("done");
    };

    let handleImage = function(path, index) {
        console.log(path);
        let imagePath = path.replace(/[^\/]*$/, "");
        let fileName = path.replace(/^.*(\\|\/|\:)/, "");
        console.log(imagePath, fileName);

        var resized = sharp(path);

        resized.metadata().then(function(metadata) {
            console.log(metadata);
            if (metadata.width < metadata.height) {
                generateImage(resized, path, imagePath, fileName, index);
            } else {
                resized.toBuffer().then(function(buffer) {
                    proceedImage.currentImage = proceedImage.currentImage + 1;
                    saveImage(buffer, imagePath, fileName, index);
                });
            }
        });
    };

    let generateImage = function(resized, path, imagePath, fileName, index) {
        sharp(path)
            .toFormat("png")
            .resize(1080, 1350, {
                fit: "contain",
                background: { r: 0, g: 0, b: 0, alpha: 0.3 }
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
        resized
            .resize(1080, 1350, {
                fit: "cover"
            })
            .blur(20)
            .composite([
                {
                    input: buffer,
                    gravity: "centre",
                    blend: "over",
                    raw: { width: 1080, height: 1350, channels: 4 }
                }
            ])
            .toBuffer()
            .then(data => {
                console.log(data);
                proceedImage.currentImage = index + 1;
                saveImage(data, imagePath, fileName, index);
            })
            .catch(err => {
                console.log(err);
            });
    };

    let saveImage = function(image, path, filename, index) {
        if (!fs.existsSync(path + "Instagram/")) {
            fs.mkdirSync(path + "Instagram/");
        }
        //var imageData = decodeBase64Image(image);
        fs.writeFile(path + "Instagram/" + filename, image, "base64", function(
            err
        ) {
            if (err) {
                console.log(err);
                return;
            }

            if (proceedImage.currentImage === proceedImage.totalImages) {
                imagesDone();
            }
        });
    };

    let reset = function() {
        proceedImage.currentImage = 0;
        proceedImage.totalImages = 0;
        body.classList.remove("done");
    };
});
