class Zous {
    hp;
    atta;
    defend;
    xp;
    level;
    name;
    constructor(h, a, d) {
        this.name = "宙斯";
        this.level = 1;
        this.hp = h;
        this.atta = a;
        this.defend = d;
        this.xp = 0;
    };
}
class Ani {
    hp;
    atta;
    defend;
    name;
    xp;
    constructor(n, h, a, d) {
        this.xp;
        this.name = n;
        this.hp = h;
        this.atta = a;
        this.defend = d;
    };

}

function attack(target, attacker) {
    if (target.defend >= attacker.atta) {
        return target.hp;
    } else {
        if (target.hp + target.defend - attacker.atta <= 0) {
            target.hp = 0;
        } else {
            target.hp = target.hp + target.defend - attacker.atta;
        }
    }
    if (target.hp == 0) {
        die(target);
        if (attacker.name == "宙斯") {
            xp = attacker.level / 10;
            xpGet(attacker, 100);
        }
    }
    return target.hp;
}

function die(target) {
    if (target.hp <= 0) {
        console.log(target.name + "死亡");
    }
}

function xpGet(zous, xp) {
    need = zous.level * 100;
    zous.xp = zous.xp + xp;
    if (zous.xp >= need) {
        more = zous.xp - need;
        zous.level = zous.level + 1;
        zous.xp = more;
    }
}