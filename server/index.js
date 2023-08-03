const express = require('express');
const app = express();

const { proxy } = require('rtsp-relay')(app);
const user = ''
const pass = ''

var port = 8180;

// the endpoint our RTSP uses
app.ws('/api/stream/:cameraIP', (ws, req) =>
    proxy({
        additionalOptions: [
            '-rtsp_transport', 'tcp',
            '-q', '1',
        ],
        url: `rtsp://${user}:${pass}@${req.params.cameraIP}:554/cam/realmonitor?channel=1&subtype=0.sd`
    })(ws),
);

app.listen(port, () => {
    console.log('listening on port %s', port);
});