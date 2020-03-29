var questions = [{
    question: "What's the currency of the USA?",
    choices: ["US dollar", "Ruble", "Horses", "Gold"],
    corAnswer: 0
}, {
    question: "Where was the American Declaration of Independence signed?",
    choices: ["Philadelphia", "At the bottom", "Frankie's Pub", "China"],
    corAnswer: 0
}];

function addProperty( questions ) {
    return questions.map(
        question => {
            // question.usersAnswer = null;

            // return Object.assign({}, question, { userAnswer: null });
            return {...question, userAnswer: null};
        }
    );
}

const newQuestion = addProperty( questions );

// console.log( questions );
// console.log( newQuestion );

function transportationCost( days ) {
    const discount = days >= 7 ? 50 : days >= 3 ? 20 : 0;

    return days * 40 - discount;
}

console.log( transportationCost(10) === 350 ); // 40 * 10 - 50;
console.log( transportationCost(5) === 180 ); // 40 * 5 - 20;
console.log( transportationCost(2) === 80 ); // 40 * 2;
