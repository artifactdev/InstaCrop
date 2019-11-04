importScripts('lib/jimp.js');

self.addEventListener('message', function (e) {
    Jimp.read(e.data).then(function (image) {
        var blurred = image;
        var resized = image.clone();

        console.log(image)

        if (image.bitmap.height > image.bitmap.width) {
            resized.contain(1080, 1350, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
            blurred
                .blur(30)
                .color([
                    { apply: 'darken', params: [10] }
                ])
                .cover(1080, 1350, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
                .composite(resized, 0, 0, {
                    mode: Jimp.BLEND_SOURCE_OVER,
                    opacitySource: 1,
                    opacityDest: 0.5
                });


            blurred.getBase64(Jimp.MIME_JPEG, function (err, src) {
                self.postMessage(src);
            });
        } else {
            image.getBase64(Jimp.MIME_JPEG, function (err, src) {
                self.postMessage(src);
            })
        }
    });
});