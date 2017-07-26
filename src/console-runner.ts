import * as readline from 'readline';
import * as QB from 'questbook';

export default class ConsoleRunner {
    constructor(questDoc: QB.QuestDocument) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const render = () => {
            const page = questDoc.getCurrentPage();
            if (page) {
                // logics
                if (page.logics) {
                    for (let i = 0; i < page.logics.length; i++) {
                        questDoc.processLogic(page.logics[i]);
                    }
                }
                // texts
                for (let i = 0; i < page.texts.length; i++) {
                    console.log(questDoc.processText(page.texts[i]));
                }
                if (page.choices.length === 1 && !page.choices[0].text) {
                    questDoc.makeChoice(0);
                    render();
                    return;
                }
                // choices
                for (let i = 0; i < page.choices.length; i++) {
                    const choice = page.choices[i];
                    if (!choice.condition || questDoc.processLogic(choice.condition)) {
                        console.log(`${i + 1}. ${page.choices[i].text}`);
                    }
                }
                // user input
                rl.question('> ', (answer) => {
                    questDoc.makeChoice(parseInt(answer, 10) - 1);
                    render();
                });
            } else {
                console.log('THE END');
                rl.close();
            }
        };
        render();
    }
}