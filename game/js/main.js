/**
 * @name 主体框架
 * @description 宙斯之战的主方法
 * @author 桜
 * @bilibili https://space.bilibili.com/29058270
 * @version 0.1.0
 */


function main() {
    return false;
}

function ata(anime, zous) {
    if (anime.ifBoss) {
        attackChoice = 60;
    } else {
        attackChoice = 40;
    }
    while (anime.hp > 0 && zous.hp > 0) {
        whoAttack = parseInt(Math.random() * 99 + 1);
        if (whoAttack > attackChoice) {
            vm.dataList.push(JSON.parse(attack(anime, zous)));
            vm.vmZous.needXp = needZousXp(vm.vmZous);
        } else {
            vm.dataList.push(JSON.parse(attack(zous, anime)));
            vm.vmZous.needXp = needZousXp(vm.vmZous);
        }
    }
}

function MathRandom(l, r) {
    return parseInt(Math.random() * (r - l) + l);
}