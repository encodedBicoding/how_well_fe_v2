const dotenv = require('dotenv');
const axios = require('axios')
const cron = require('node-cron')
dotenv.config();
class Cron {
    constructor() {}

    async execute() {
        await this.preventSleep();
    }

    async preventSleep() {
        cron.schedule('10 * * * *', async () => {
            axios({
                method: 'GET',
                url: process.env.SERVER_API,
            })
            .then((response) => {
                if(response.status === 200) {
                    console.log('cron job ran @', `${new Date().toLocaleDateString()}T${new Date().toLocaleTimeString()}`)
                }
            })
        })
    }
}

module.exports = Cron;