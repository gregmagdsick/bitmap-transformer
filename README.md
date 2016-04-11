# bitmap-transformer

For this project, I worked with Rachel Burke, Phillip Nguyen, Shelly Yusuf and James Norton. In addition, we referenced https://github.com/redfieldstefan/bitmap-transformer/blob/master/lib/transform.js for more insight.

***To Run***
on the command line, from the base directory, type 'node lib/bitmapTransformer.js [,image] [,transformType]'

where [image] is the name of the image, and [transformType] is either 'invert' or 'grayscale', depending on which transform you want to do.

The default value for transformType is greyscale, so if you leave off that argument, you will perform a greyscale transformation.

Also, the default value for image is pallet-bitmap.bmp, so if all you type is  'node lib/bitmapTransformer.js', you will run a greyscale transform on the pallet-bitmap.bmp file.

***To Test***
on the command line, type gulp test, and you will run the linter on all files, as well as run the mocha tests that are in /test.
