import { Command, Input, Listener } from '@api';
import * as request from 'request';
import { Emoji } from '@bot/libraries/emoji';
const entities = require("html-entities").AllHtmlEntities;

export class DadJokes extends Command {
    constructor() {
        super({
            name: 'dadjoke',
            description: 'Displays a random dad joke.',
            aliases: ["djoke", "djokes", "dadjokes"]
        });
    }

    async execute(input: Input) {

        let url = `https://icanhazdadjoke.com/`;

        let headers = {
            'Accept': 'application/json',
            'User-Agent': 'Ember bot'
        }

        //Fetch from API
        request({ url, headers }, async (err, response, body) => {
            // Handle HTTP errors
            if (err) {
                this.getLogger().error(err);
                await input.channel.send(`${Emoji.ERROR}  Failed to get joke, try again later.`);
                return;
            }

            // Parse the body
            let parsed = <ApiResponse>JSON.parse(body);

            // Send joke
            await input.channel.send({
                embed: {
                    color: 3447003,
                    title: `**Dad Joke**`,
                    description: parsed.joke
                }
            });
        });
    }
}

type ApiResponse = {
    id: string;
    joke: string;
    status: number;
};
