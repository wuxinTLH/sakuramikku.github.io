/**
 * @description:宙斯之战的主方法
 * @author:桜
 * @bilibili:https://space.bilibili.com/29058270
 * @version:0.0.1a
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
            attack(anime, zous);
        } else {
            attack(zous, anime);
        }
    }
}