<script>

// IMAGE UPLOADER

    var globalReader = function () {

        var reader = new FileReader();

        reader.onload = (function (event) {
            app.ports.imageRead.send(event.target.result)
        });

        return reader;

    }();


    app.ports.readImage.subscribe(function (info) {
        globalReader.readAsDataURL(info.fileValue);

        console.log(info.fileValue)

    });

    app.ports.sendPdfFileName.subscribe(function (info) {

        console.log(info.data)
        var url = "https://knode.work/files/" + info.data
        window.open(url,'_blank');

    });


    app.ports.sendDocumentForPrinting.subscribe(function (info) {

        var url = info.data
        console.log(url)
        window.open(url,'_blank');

    });

    app.ports.incrementVersion.subscribe(function (url) {
        window.open(url,'_blank');
    });

    app.ports.sendCredentials.subscribe(function (credentialsWrapper) {

        console.log("JS/url: " + credentialsWrapper.url)
        console.log("JS/signature: " + credentialsWrapper.credentials.signature)

    });

    // convert datURI to binary data
    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        var byteString = atob(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to an ArrayBuffer
        var arrayBuffer = new ArrayBuffer(byteString.length);

        var _ia = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            _ia[i] = byteString.charCodeAt(i);
        }

        var dataView = new DataView(arrayBuffer);
        // var blob = new Blob([dataView], { type: mimeString });
        return dataView;
    }

    // https://stackoverflow.com/questions/51758069/s3-jquery-upload-is-corrupted

    app.ports.uploadImage.subscribe(function (info) {

        console.log("xxx, url = " + info.url)

    var reader = new FileReader();

        reader.readAsDataURL(info.fileValue);

        reader.onload = function(e) {

            console.log("file size = " + reader.result.length)
            console.log("mime type = " + info.fileValue.type)

            const blob = dataURItoBlob(reader.result);

            fetch(info.url, {
                method: 'PUT',
                body: blob
            });

        }

    });
</script>
