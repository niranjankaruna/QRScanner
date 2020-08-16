const AWS = require('aws-sdk');
const fs = require('fs'); 
const QrCode  = require('qrcode-reader');
const Jimp = require("jimp");

exports.handler = (event, context_received, callback_received) => {
    var qr = new QrCode();
    console.log('QRCODE reader-------- '+ qr );
	const requestBody = JSON.parse(event.body);
	console.log('Event -------- '+ event.body );
    var base64str= requestBody.base64str;
	
	console.log('base64str -------- '+ base64str );
	var buffer = new Buffer(base64str.toString(), 'base64');
	//var buffer = fs.readFileSync(__dirname + '/q.png');

	
Jimp.read(buffer, function(err, image) {
    if (err) {
        console.error(err);
        // TODO handle error
    }
    var qr = new QrCode();
    qr.callback = function(err, value) {
        if (err) {
            console.error(err);
            // TODO handle error
        }
        console.log(value.result);
        console.log(value);
		    callback_received(null, {
      statusCode: 201,
      body: JSON.stringify({
        data: value.result,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    };
    qr.decode(image.bitmap);
});
   
};