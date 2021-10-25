var ata = function (anime, zous) {
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