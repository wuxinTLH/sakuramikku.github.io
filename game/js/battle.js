//宙斯升级所需经验
var levelXpNeed = [100, 200, 300, 500, 700, 1000, 1500, 2000, 3000];
//宙斯类
class Zous {
    hp;
    atta;
    defend;
    xp;
    level;
    name;
    maxHp;
    constructor(h, a, d) {
        this.name = "宙斯";
        this.level = 1;
        this.hp = h;
        this.atta = a;
        this.defend = d;
        this.xp = 0;
        this.maxHp = this.hp;
    };
}

//怪物类
class Ani {
    hp;
    atta;
    defend;
    name;
    xp;
    constructor(zous) {
        this.xp;
        this.name = randomName();
        this.hp = randomAttrHp(zous, false);
        this.atta = randomAttrAtta(zous, false);
        this.defend = randomAttrDef(zous, false);
    };
}
//boss类
class Boss {
    hp;
    atta;
    defend;
    name;
    xp;
    constructor(zous) {
        this.xp;
        this.name = randomName();
        this.hp = randomAttrHp(zous, true);
        this.atta = randomAttrAtta(zous, true);
        this.defend = randomAttrDef(zous, true);
        console.log("Boss" + this.name + '出现了');
    }
}
//战斗
function attack(target, attacker) {
    var damage;
    if (target.defend >= attacker.atta) {
        target.hp;
        damage = 0;
    } else {
        if (target.hp + target.defend - attacker.atta <= 0) {
            target.hp = 0;
            damage = attacker.atta - target.defend;
        } else {
            target.hp = target.hp + target.defend - attacker.atta;
            damage = attacker.atta - target.defend;
        }
    }
    console.log(attacker.name + '对' + target.name + '造成了' + damage + '点伤害');
    console.log(target.name + '剩余' + target.hp + '血');
    if (target.hp == 0) {
        die(target);
        if (attacker.name == "宙斯") {
            // xp = attacker.level * 10;
            xp = 100;
            console.log(attacker.name + '获得了' + xp + '点经验');
            xpGet(attacker, 100);
        }
    }
    return target.hp;
}

//单位死亡
function die(target) {
    if (target.hp <= 0) {
        console.log(target.name + "死亡");
    }
}
//经验获得
function xpGet(zous, xp) {
    need = levelXpNeed[zous.level - 1];
    zous.xp = zous.xp + xp;
    if (zous.xp >= need) {
        levelUp(zous, need);
    }
}
//升级
function levelUp(zous, n) {
    more = zous.xp - n;
    zous.level = zous.level + 1;
    zous.xp = more;
    console.log('宙斯从' + (zous.level - 1) + '升级到了' + zous.level + '级');
    zous.maxHp += 100;
    zous.hp = zous.maxHp;
    zous.atta += 50;
    zous.defend += 20;
    console.log('宙斯回复到了满血');
}
//产生怪物随机名字
function randomName() {
    var ln = ['艾伦', '阿比', '艾贝', '安德鲁', '巴顿', '贝克', '鲍勃', '布鲁斯', '查尔斯', '科尔', '克拉克', '乔治', '亨特', '杰克', '约瑟夫', '乔斯达'];
    var fn = ['阿尔文', '安迪', '	安德鲁', '乔纳森', '阿伯克龙比', '艾格尼丝', '阿诺德', '阿德金斯', '阿奇柏德', '亚伯拉罕斯', '阿曼达'];
    var firstName = fn[parseInt(Math.random() * fn.length)];
    var lastName = ln[parseInt(Math.random() * fn.length)];
    return firstName + ' · ' + lastName;
}

//怪物随机属性
function randomAttrHp(zous, boss) {
    level = zous.level;
    if (boss) {
        return (level + 2) * (parseInt(Math.random() * 50 + 50));
    } else {
        return level * (parseInt(Math.random() * 50 + 50));
    }

}

function randomAttrAtta(zous, boss) {
    lvel = zous.level;
    if (boss) {
        return (level + 2) * (parseInt(Math.random() * 80 + 20));
    } else {
        return level * (parseInt(Math.random() * 80 + 20));
    }

}

function randomAttrDef(zous, boss) {
    level = zous.level;
    if (boss) {
        return (level + 2) * (parseInt(Math.random() * 20 + 30));
    } else {
        return level * (parseInt(Math.random() * 20 + 30));
    }
}