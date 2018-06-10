
'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.f39d5e04-20ba-4b21-bc82-8a31efa2b10a';

const SKILL_NAME = 'Computer Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me computer facts, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'The first electronic computer ENIAC weighed more than 27 tons and took up 1800 square feet.',
    'Only about 10 percent of the worlds currency is physical money, the rest only exists on computers.',
    'TYPEWRITER is the longest word that you can write using the letters only on one row of the keyboard of your computer.',
    'Doug Engelbart invented the first computer mouse in around 1964 which was made of wood.',
    'Earth is the only planet not named after a god.',
    'There are more than 5000 new computer viruses are released every month.',
    'Around 50 percent of all Wikipedia vandalism is caught by a single computer program with more than 90 percent accuracy.',
    'If there was a computer as powerful as the human brain, it would be able to do 38 thousand trillion operations per second and hold more than 3580 terabytes of memory.',
    'Approximately 70 percent of virus writers are said to work under contract for organized crime syndicates.',
    'HP, Microsoft and Apple have one very interesting thing in common – they were all started in a garage.',
    'An average person normally blinks 20 times a minute, but when using a computer he or she blinks only 7 times a minute.',
    'The house where Bill Gates lives, was designed using a Macintosh computer.',
    'The first ever hard disk drive was made in 1979, and could hold only 5MB of data.',
    'The first 1GB hard disk drive was announced in 1980 which weighed about 550 pounds, and had a price tag of 40,000 US dollars.',
    'More than 80 percent of the emails sent daily are spams.',
    'A group of 12 engineers designed IBM PC and they were called as “The Dirty Dozen”.',
    'The original name of windows was Interface Manager.',
    'The first microprocessor created by Intel was the 4004. It was designed for a calculator, and in that time nobody imagined where it would lead.',
    'IBM 5120 from 1980 was the heaviest desktop computer ever made. It weighed about 105 pounds, not including the 130 pounds external floppy drive.',
    'Genesis Device demonstration video in Star Trek II: The Wrath of Khan was the the first entirely computer generated movie sequence in the history of cinema. That studio later become Pixar.',
    'On one of the worlds most popular shopping websites, eBay, there are transactions of approx. 680 US dollars per second.',
    'The Email is older than the World Wide Web.',
    'If you open up the case of the original Macintosh, you will find 47 signatures, which is of each member of Apples Macintosh division of 1982.',
    'Amongst the most interesting computer facts is, the first Apple computer which was built by Steve Jobs and Steve Wozniak, was made by using parts they got for free from their employers. They were made to scrounge spare parts from work.',
    'The Apollo 11 Lunar Lander which was used to travel to the moon, has less processing power than the processor of a cell phone.',
    'Out of the 1.8 billion Internet users, only 450 million can speak English.',
    'Mosaic was the first popular web browser, released in the year 1993.',
    'Computer circuitry can be destroyed by static electricity. It is so mild for humans that we do not even feel it.',
    'The Nvidia GeForce 6800 Ultra chip has one of the maximum number of transistors on it, approx. 222 million of them.',
    'I am sure most of us must have played the game Tetris. Since the time it was created in the early eighties, it has sold more than 40 million copies worldwide, which made its creator richer by 8 million US dollars.',
    'Konrad Zuse, has the credit of creating the worlds first computer, known as the Z 1, in 1936. Three years later, in the year 1939, the first fully-functioning electro-mechanical computer, known as Z 2, was developed.',
    'Stewardesses is the longest word which can be typed with only the left hand.',
    'If your work involves the extensive use of computers, then by the end of your average working day, your fingers would have traveled 12.6 miles.',
    'Lenovo stands for new legend. Le for legend, and novo stands for new.',
    'SanDisk was earlier known as SunDisk.',
    'Until September 1995, domain registration was free.',
    'Electronic brains! Thats what computers were called in the 1950s.',
    'One can type 20 times faster using a Dvorak keyboard as compared to using a Qwerty keyboard.',
    'In 1833 a man by the name of Charles Babbage invented all the parts that are now used for a modern computer. But it was only 120 years later that the first modern computers were invented.',
    'The first computer mouse ever made was made of wood.',
    'Facebook offers up to $500 to those hackers who can find any security bug and threat without actually doing the harm themselves.',
    'Over 1 million domain names are registered every month online which clearly indicates that the data is expanding and hence the need of Big Data is what considered a milestone strategy in the software industry.',
    'The first domain name ever registered in World Wide Web was www.symbolics.com and it was done on 15th March, 1985.',
    'Out of every 12 million Spams being sent by the spammers, there is only 1 reply that they receive by the receivers who probably have least idea of the existence of such things.',
    'The original URL of Yahoo was http://akebono.stanford.edu previously which was later changed to www.yahoo.com.',
    'The background scheme of Facebook is blue colored due to the reason that its founder Mark Zuckerberg has a type of color blindness which shows only the blue part and not the red and green.',
    'U.S. President Bill Clintons inauguration in January 1997 was the first to be webcast.',
    'Google uses an estimated 15 billion kilo Watt per hour of electricity per year, more than most countries. However, google generates a lot of their own power with their solar panels.',
    '70 percent of virus writers work under contract for organized crime syndicates.',
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewComputerFactIntent');
    },
    'GetNewComputerFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

 exports.handler = function (event, context, callback) {
     const alexa = Alexa.handler(event, context, callback);
     alexa.APP_ID = APP_ID;
     alexa.registerHandlers(handlers);
     alexa.execute();
 };
