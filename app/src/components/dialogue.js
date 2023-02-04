const wrongGuess = [
    `It's a good day to die`,
    'ouch',
    'smh',
    `where's the rest of me?`,
    `I'm innocent`,
    `it wasn't me, it was the one armed man`,
    'you got the wrong guy',
    `don't I get a phone call first?`,
    `just kill me already`,
];

const rightGuess = [
    'about dang time',
    'yes, do more of that',
    `hurry, running out of time`,
    'lucky guess',
    'yay, not as bad as I thought',
];

const escaped = [
    'Thanks partner',
    'I thought I was a gonner',
    'mighty fine of ya',
    `congrats, you don't suck`,
    'deepest graditude',
    'I got away with murder, Yay!'
];

const handleRandomDialogue = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const getDialogue = (arg) => {
    switch (arg) {
        case 'wrong':
            return handleRandomDialogue(wrongGuess);
        case 'right':
            return handleRandomDialogue(rightGuess);
        case 'escape':
            return handleRandomDialogue(escaped);
        default:
            break;
    }
}

export default getDialogue;

