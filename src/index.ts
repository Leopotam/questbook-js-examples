import * as fs from 'fs';
import { QuestLoader, QuestDocument } from 'questbook';
import ConsoleRunner from './console-runner';

const markup = fs.readFileSync('./quest.txt', 'utf8');
const parsedDoc = QuestLoader.loadMarkup(markup, true);
const runner = new ConsoleRunner(parsedDoc);