const sallaries = [1000, 1600, 1300, 1245];

console.log(
    sallaries.reduce(
        (sum, sallary) => sum + sallary,
        0
    ) / sallaries.length
);
