const { WebcastPushConnection } = require('tiktok-live-connector');
let tiktokUsername = "banggjean";
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);
const gTTS = require('gtts');
var player = require('play-sound')(opts = {})
setInterval(bemVindo, 50000);

tiktokLiveConnection.on('disconnected', () => {
    console.log('Disconnected :(');
})

tiktokLiveConnection.on('streamEnd', (actionId) => {
    if (actionId === 3) {
        console.log('Stream ended by user');
    }
    if (actionId === 4) {
        console.log('Stream ended by platform moderator (ban)');
    }
})

tiktokLiveConnection.on('chat', data => {
    console.log('\x1b[34m', `${data.uniqueId.toUpperCase()}: ${data.comment}`);
})

tiktokLiveConnection.connect().then(state => {
    // console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);

})

function reproduzirAudio(speech) {
    let aleatoryName = `Audio/${(Math.random() + 1).toString(36).substring(7)}.mp3`;
    const gtts = new gTTS(speech, 'pt-BR');
    gtts.save(`${aleatoryName}`, function (err, result) {
        if (!err) {
            player.play(aleatoryName);
        }
    });
}

tiktokLiveConnection.getAvailableGifts().then(giftList => {
    this.giftList = giftList;
    tiktokLiveConnection.on('gift', data => {
        //let item = giftList.find(x => x.id == data.giftId);
        console.log('\x1b[31m', `${data.uniqueId.toUpperCase()} mandou um PRESENTE ${data.giftName} x${data.repeatCount}`);

        let speech = `${data.nickname} Obrigado pelo presente ${data.giftName}`;
        reproduzirAudio(speech);
    })
}).catch(err => {
    console.error(err);
})

tiktokLiveConnection.on('share', (data) => {
    console.log(data.uniqueId, "shared the stream!");
    let speech = `${data.nickname} Compartilhou a live`;
    reproduzirAudio(speech);
})

function bemVindo() {
    reproduzirAudio("Bem vindo a Live");
}