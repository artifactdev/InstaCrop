const fs = window.require('fs');

document.addEventListener("DOMContentLoaded", function () {
    var holder = document.getElementById('drag-file');
    var body = document.getElementsByTagName('body')[0];
    var resetButton = document.getElementById('resetButton');
    var proceedElement = document.getElementById('imagesProceeded');
    var proceedImage = {
        currentImage: 0,
        totalImages: 0
    }

    tinybind.bind(proceedElement, { proceedImage: proceedImage })

    resetButton.addEventListener('click', function() {
        reset();
    });

    holder.ondragover = () => {
        body.classList.add('dragover');
        return false;
    };

    holder.ondragleave = () => {
        body.classList.remove('dragover');
        return false;
    };

    holder.ondragend = () => {
        body.classList.remove('dragover');
        return false;
    };

    holder.ondrop = (e) => {
        e.preventDefault();
        body.classList.remove('dragover');
        body.classList.add('proceed');
        let proceeded = document.getElementById('imagesProceeded');
        for (let index = 0; index < e.dataTransfer.files.length; index++) {
            const image = e.dataTransfer.files[index];
            proceedImage.totalImages = e.dataTransfer.files.length;
            console.log('File(s) you dragged here: ', image.path, image)
            handleImage(image.path, index);
        }

        return false;
    };

    let imagesDone = function () {
        body.classList.remove('proceed');
        body.classList.add('done');
    }

    let handleImage = function (path, index) {
        console.log(path)
        let imagePath = path.replace(/[^\/]*$/, "");
        let fileName = path.replace(/^.*(\\|\/|\:)/, '');
        console.log(imagePath, fileName)

        var worker = new Worker('jimp-worker.js');
        worker.onmessage = function (e) {

            // append a new img element using the base 64 image
            proceedImage.currentImage = proceedImage.currentImage + 1;
            if (proceedImage.currentImage == proceedImage.totalImages) {
                imagesDone();
            }
            saveImage(e.data, imagePath, fileName);
        };
        worker.postMessage(path);
    }

    let saveImage = function (image, path, filename) {
        if (!fs.existsSync(path + 'Instagram/')) {
            fs.mkdirSync(path + 'Instagram/');
        }
        var imageData = decodeBase64Image(image);
        fs.writeFile(path + 'Instagram/' + filename, imageData.data, 'base64', function (err) {
            console.log(err);
        });
    }

    let decodeBase64Image = function (dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
    }

    let reset = function () {
        proceedImage.currentImage = 0;
        proceedImage.totalImages = 0;
        body.classList.remove('done');
    }
})


