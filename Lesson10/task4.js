const animal = {
    canEat: true,
    canSleep: true,
    canRun: true,
    canSwim: false,
    fill: 100,
    speed: 10,
    eat(addEat) {
        this.fill = this.fill + addEat;
    },
    run() {
        if (this.fill < 20) {
            console.error('tired');
        } else {
            let speed = this.speed;

            if (this.fill > 100) {
                console.error('overeaten');
                speed *= 0.5;
            }

            this.fill -= 20;

            console.info(this.name, 'run', speed);
        }
    }
};

const rabbit = {
    name: 'rabbit'
};

rabbit.__proto__ = animal;

console.log( rabbit.name );
console.log( rabbit.canEat ); // true

console.log( 1, rabbit.fill );
console.log( 2, animal.fill );

rabbit.run();

console.log( 3, rabbit.fill );
console.log( 4, animal.fill );
