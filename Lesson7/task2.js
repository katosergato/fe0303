/**
 * Дан обьект с баллами за задание
*/
const grade = {
    Anton: getRandomBall(0, 90),
    Maksym: 90,
    Vladyslav: getRandomBall(),
    Oleksii: getRandomBall(40),
    Vadim: getRandomBall(40, 70),
    Maxim: getRandomBall(15, 80)
};

console.log(grade);

/** Требуется:
 1. Указать имя учащегося с максимальным количеством баллов
 2. Указать максимальный балл. (домой)
 3. Указать средний балл.
 4. Указать учащегося с баллом ближайшим к среднему.
 5. Перечислить учащихся с баллом ниже среднего.
 6. Перечислить учащихся занявших первые три места в порядке убывания рейтинга. (домой)
*/

function getRandomBall(min = 0, max = 100) {
    return Math.round(min + Math.random() * (max - min));
}

function getLeader( grade ) {
    let leaderName = '',
        leaderScore = -Infinity;

    for (const name in grade) {
        if (grade[name] > leaderScore) {
            leaderName = name;
            leaderScore = grade[name];
        }
    }

    return leaderName;
}

function getAverageGrade( grade ) {
    let sum = 0,
        count = 0;

    for (const name in grade) {
        sum += grade[name]; // sum = sum + grade[num];
        count++;
    }


    return sum/count;
}

function getAverageGamer( grade ) {
    let gamerName = '',
        gamerScoreDif = Infinity;
    const avr = getAverageGrade(grade);

    for (const name in grade) {
        const scoreDif = Math.abs(grade[name] - avr);

        if ( scoreDif < gamerScoreDif) {
            gamerName = name;
            gamerScoreDif = scoreDif;
        }
    }

    return gamerName;
}

function getLagging( grade ) {
    const avr = getAverageGrade(grade),
        gamerNames = Object.keys(grade);

    return gamerNames
        .filter(
            function(name, idx, arr) {
                return grade[name] < avr;
            }
        )
        .sort(function(name1, name2) {
            // name1 <=> name2 => grade[name1] - grade[name2] <=> 0
            return grade[name1] - grade[name2];
        });
}

function getWinners( grade ) {
    const gamerNames = Object.keys(grade);

    return gamerNames
        .sort((name1, name2) =>  grade[name2] - grade[name1])
        .filter((name, idx) => idx < 3);
}

console.log('1. Leader:', getLeader(grade));
console.log('3. Average Grade:', getAverageGrade(grade));
console.log('4. Average Gamer:', getAverageGamer(grade));
console.log('5. Lagging Gamer:', getLagging(grade));
console.log('6. Get winners:', getWinners(grade));
