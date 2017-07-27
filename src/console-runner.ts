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
                    for (const logic of page.logics) {
                        questDoc.processLogic(logic);
                    }
                }
                // texts
                for (const text of page.texts) {
                    console.log(questDoc.processText(text));
                }
                // check for single choice without text (auto redirection)
                if (questDoc.makeAutoChoice(page)) {
                    render();
                    return;
                }
                // choices
                for (let i = 0; i < page.choices.length; i++) {
                    const choice = page.choices[i];
                    if (questDoc.isChoiceVisible(choice)) {
                        console.log(`${i + 1}. ${choice.text}`);
                    }
                }
                // user input
                rl.question('> ', (answer) => {
                    const choiceId = parseInt(answer, 10) - 1;
                    questDoc.makeChoice(page.choices[choiceId]);
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