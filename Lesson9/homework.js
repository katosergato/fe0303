function getAge( people ) {
    return people.died - people.born;
}

function getPeopleByName( name, data  ) {
    return data.find(people => people.name === name);
}

function getAgeDiffBeetwenMother( people, data ) {
    const mother = getPeopleByName( people.mother, data );

    if (!mother) {
        return null;
    }

    return getAge(mother) - getAge(people);
}

function getSum( arr ) {
    return arr.reduce(
        (sum, number) => sum + number,
        0
    );
}

function getAverage( arr ) {
    return getSum(arr) / arr.length;
}

function task1( data ) {
    const ageDiffs = data
        .map(people => getAgeDiffBeetwenMother(people, data))
        .filter(age => age !== null)
        .map(ageDiff => Math.abs(ageDiff));

    return getAverage( ageDiffs );
}

function getParents( people, data ) {
    const mother = getPeopleByName( people.mother, data ),
        father = getPeopleByName( people.father, data );

    if (!mother || !father ) {
        return null;
    }

    return {father, mother};
}

function task2( data ) {
    const familyDiff = data.map(people => getParents(people, data))
        .filter(parents => parents !== null)
        .reduce(
            (familly, {mother, father}) => {
                const familyKey = `${mother.name}-${mother.born}-${father.name}-${father.born}`;
                // const familyKey = mother.name + "-" + mother.born + "-" + father.name + "-" + father.born;
                // const familyKey = [mother.name, mother.born, father.name, father.born].join('-');

                if (!familly[familyKey]) {
                    familly[familyKey] = Math.abs(getAge(mother) - getAge(father));
                }

                return familly;
            },
            {}
        );

    return getAverage( Object.values(familyDiff) );
}

function getChildren(motherName, fatherName, data) {
    return data.filter(people => people.mother === motherName && people.father === fatherName);
}

function task3( data ) {
    const familys = data.map(people => getParents(people, data))
            .filter(parents => parents !== null)
            .map(family => {
                family.children = getChildren(family.mother.name, family.father.name, data);

                return family;
            }),
        childrenCounts = familys.map(
            family => family.children.length
        );

    return getAverage( childrenCounts );
}

console.log( ANCESTRY_DATA );
console.log( task1( ANCESTRY_DATA ) ); // 18.166666666666668
console.log( task2( ANCESTRY_DATA ) ); // 13.5
console.log( task3( ANCESTRY_DATA ) ); // 1.5555555555555556
