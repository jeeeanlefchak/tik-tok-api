const { WebcastPushConnection } = require('tiktok-live-connector');
let tiktokUsername = "jeeeanlefchak";
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);
const gTTS = require('gtts');
var player = require('play-sound')(opts = {})

tiktokLiveConnection.on('chat', data => {
    console.log('\x1b[34m', `${data.uniqueId.toUpperCase()}: ${data.comment}`);
})

tiktokLiveConnection.connect().then(state => {
    // console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

tiktokLiveConnection.getAvailableGifts().then(giftList => {
    this.giftList = giftList;
    tiktokLiveConnection.on('gift', data => {
        let item = giftList.find(x => x.id == data.giftId);
        console.log('\x1b[31m',`${data.uniqueId.toUpperCase()} mandou um PRESENTE ${item.name}`);

        let speech = `${data.nickname} ${item.name} Obrigado pelo presente!`;
        const gtts = new gTTS(speech, 'pt-BR');
        let aleatoryName = `Audio/${(Math.random() + 1).toString(36).substring(7)}.mp3`;
        gtts.save(`${aleatoryName}`, function (err, result) {
            if (!err) {
                player.play(aleatoryName);
            }
        });

    })
}).catch(err => {
    console.error(err);
})
