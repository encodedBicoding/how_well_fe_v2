const dotenv = require('dotenv');
const cron = require('node-cron')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

dotenv.config();
class Cron {
    constructor() {}

    async execute() {
        await this.preventSleep();
    }

    async preventSleep() {
        cron.schedule('* * * * *', async () => {
            await fetch(process.env.SERVER_API,{
                method: 'GET',
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