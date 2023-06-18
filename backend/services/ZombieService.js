const getNextPosition = (payload) => {
    const {creature, zombie, gridSize, commands} = payload;

    const zombieList = [zombie];
    let creatureList = creature.filter(() => true)

    const commandsArr = commands.split('');

    let zombieIndex = 0;
    let thisZombie = zombieList[zombieIndex];
    // while there is are new zombie in the list, then keep looping
    while (true) {
        // interate the cammand to move zombie
        for (let i = 0; i < commandsArr.length; i ++) {
            const command = commandsArr[i];
            switch(command) {
                case ('L'): 
                    thisZombie.x --;
                    if (thisZombie.x < 0) {
                        thisZombie.x = gridSize - 1;
                    }
                    break;
                case ('R'):
                    thisZombie.x ++;
                    if (thisZombie.x >= gridSize) {
                        thisZombie.x = 0;
                    }
                    break;
                case ('U'):
                    thisZombie.y --;
                    if (thisZombie.y < 0) {
                        thisZombie.y = gridSize -1;
                    }
                    break;
                case ('D'):
                    thisZombie.y ++;
                    if (thisZombie.y >= gridSize) {
                        thisZombie.y = 0;
                    }
                    break;
                default:
                    break;
            }
            zombieMoveLog(thisZombie, zombieIndex);
            
            // check if creature is becoming zombie
            for (let j = 0; j < creatureList.length; j ++) {
                const {x, y} = creatureList[j];
                if (x === thisZombie.x && y === thisZombie.y) {
                    console.log('zombie ' + zombieIndex + ' infected creature at ('+ x + ',' + y + ')');
                    zombieList.push({
                        x: x, y: y});
                }
            }
            creatureList = creatureList.filter((curr) => {
                return (curr.x != thisZombie.x || curr.y != thisZombie.y);
            })
        }

        // check if there is any new zombie exist
        if (zombieIndex < zombieList.length - 1) {
            thisZombie = zombieList[++ zombieIndex];
        } else {
            break;
        }
    }

    return {
        zombies: zombieList,
        creatures: creatureList
    }
};

const zombieMoveLog = (thisZombie, zombieIndex) => {
    console.log(
        'zombie ' + zombieIndex + ' moved to (' + thisZombie.x + ',' + thisZombie.y + ')'
    )
}

module.exports = {
    getNextPosition,
};