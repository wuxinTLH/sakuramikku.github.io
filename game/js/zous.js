class Zous {
    hp;
    atta;
    defend;

    constructor(h, a, d) {
        this.hp = h;
        this.atta = a;
        this.defend = d;
    };
}
class Ani {
    hp;
    atta;
    defend;

    constructor(h, a, d) {
        this.hp = h;
        this.atta = a;
        this.defend = d;
    };

}

function attack(target, attacker) {
    if (target.defend >= attacker.atta) {
        return target.hp;
    } else {
        return target.hp + target.defend - attacker.atta;
    }
}