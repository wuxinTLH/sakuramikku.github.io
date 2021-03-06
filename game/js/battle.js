/**
 * @name 战斗框架
 * @description 宙斯之战的战斗系统,用于各种class以及战斗方法的储存
 * @author 桜
 * @bilibili https://space.bilibili.com/29058270
 * @version 0.1.0
 */


//#region 所有生成的class类
//宙斯
class Zous {
    hp;
    atta;
    defend;
    xp;
    level;
    name;
    maxHp;
    needXp;
    constructor(h, a, d) {
        this.name = "宙斯";
        this.level = 1;
        this.hp = h;
        this.atta = a;
        this.defend = d;
        this.xp = 0;
        this.maxHp = this.hp;
        this.needXp = levelXpNeed[this.level - 1];
    };
}

//怪物
class Ani {
    hp;
    atta;
    defend;
    name;
    xp;
    ifBoss;
    appear;
    constructor(zous) {
        this.ifBoss = false;
        this.xp;
        this.name = randomName();
        this.hp = randomAttrHp(zous, false);
        this.atta = randomAttrAtta(zous, false);
        this.defend = randomAttrDef(zous, false);
        this.appear = "怪物" + this.name + '出现了';
    };
}
//boss
class Boss {
    hp;
    atta;
    defend;
    name;
    xp;
    ifBoss;
    appear;
    constructor(zous) {
        this.ifBoss = true;
        this.xp;
        this.name = randomName();
        this.hp = randomAttrHp(zous, true);
        this.atta = randomAttrAtta(zous, true);
        this.defend = randomAttrDef(zous, true);
        this.appear = "Boss" + this.name + '出现了';
    }
}
//#endregion

//战斗设计主体
function attack(target, attacker) {
    var val;
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
    damage = attacker.name + '对' + target.name + '造成了' + damage + '点伤害';
    var leftBlood = target.name + '剩余' + target.hp + '血';
    if (target.hp == 0) {
        var die = targetDie(target);
        die = JSON.parse(die);
        if (attacker.name == "宙斯") {
            console.log('怪物是boss吗？' + target.ifBoss);
            xp = target.ifBoss ? attacker.level * 50 : attacker.level * 10;
            var xpget = attacker.name + '获得了' + xp + '点经验';
            var xpg = JSON.parse(xpGet(attacker, xp));
            val = {
                    damage: damage,
                    leftBlood: leftBlood,
                    die: die.die,
                    xpget: xpget,
                    llup: xpg.llup,
                }
                //console.log(val);
                // console.log(JSON.stringify(val));
            return JSON.stringify(val);
        }
    }
    val = {
            damage: damage,
            leftBlood: leftBlood
        }
        // console.log(val);
        // console.log(JSON.stringify(val));
    return JSON.stringify(val);


}

//单位死亡
function targetDie(target) {
    if (target.hp <= 0) {
        var die = {
            die: target.name + "死亡"
        };
        //console.log(die);
        return JSON.stringify(die);
    }
}
//#region 宙斯获得所有增益类
//宙斯升级所需经验 tip:考虑修改
var levelXpNeed = [100, 200, 300, 500, 700, 1000, 1500, 2000, 3000];

//经验获得
function xpGet(zous, xp) {
    need = levelXpNeed[zous.level - 1];
    zous.xp = zous.xp + xp;
    var llup
    if (zous.xp >= need) {
        llup = {
            llup: JSON.parse(levelUp(zous, need)).llUp
        };
        // console.log(llup);
        return JSON.stringify(llup);
    } else {
        llup = {
            llup: '还需要' + (need - zous.xp) + '点经验升级'
        }
        return JSON.stringify(llup);
    }
}

//升级
function levelUp(zous, n) {
    more = zous.xp - n;
    zous.level = zous.level + 1;
    zous.xp = more;
    var llUp = '宙斯从' + (zous.level - 1) + '升级到了' + zous.level + '级';
    zous.maxHp += MathRandom(80, 200);
    zous.hp = zous.maxHp;
    zous.atta += MathRandom(40, 100);
    zous.defend += MathRandom(20, 40);
    var treat = '宙斯回复到了满血';
    var val = {
        llUp: llUp,
        treat: treat
    };
    // console.log(val);
    return JSON.stringify(val);
}
//获取升级所需经验
function needZousXp(zous) {
    if (zous.level < 10) {
        return levelXpNeed[zous.level - 1];
    } else {
        return '*'
    }
}
//#endregion

//#region 随机产生的列表
//产生怪物随机名字
function randomName() {
    var ln = ['艾伦', '阿比', '艾贝', '安德鲁', '巴顿', '贝克', '鲍勃', '布鲁斯', '查尔斯', '科尔', '克拉克', '乔治', '亨特', '杰克', '约瑟夫', '乔斯达', '安格洛', '安哥拉', '盎格鲁'];
    var fn = ['阿尔文', '安迪', '	安德鲁', '乔纳森', '阿伯克龙比', '艾格尼丝', '阿诺德', '阿德金斯', '阿奇柏德', '亚伯拉罕斯', '阿曼达', '约瑟夫', '乔斯达', '安格洛', '安哥拉', '盎格鲁'];
    var firstName = fn[parseInt(Math.random() * fn.length)];
    var lastName = ln[parseInt(Math.random() * fn.length)];
    return firstName + ' · ' + lastName;
}

//怪物随机属性
function randomAttrHp(zous, boss) {
    level = zous.level;
    if (boss) {
        return (level + 1) * (parseInt(Math.random() * 50 + 50));
    } else {
        return level * (parseInt(Math.random() * 50 + 50));
    }

}

function randomAttrAtta(zous, boss) {
    lvel = zous.level;
    if (boss) {
        return (level + 1) * MathRandom(40, 95);
    } else {
        return level * MathRandom(40, 80);
    }

}

function randomAttrDef(zous, boss) {
    level = zous.level;
    if (boss) {
        return (level + 1) * MathRandom(30, 50);
    } else {
        return level * MathRandom(20, 40);
    }
}
//#endregion