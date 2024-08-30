import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2
export const query1 = await Human.findByPk(2);

// Get the first animal whose species is "fish"
export const query2 = await Animal.findOne({
    where: { species: 'fish' }
});

// Get all animals belonging to the human with primary key 5
export const query3 = await Animal.findAll({
    where: { humanId: 5 }
});

// Get all animals born in a year greater than (but not equal to) 2015.
// [Op.gt] is the operator for > within sequelize
export const query4 = await Animal.findAll({
    where: { birthYear: { [Op.gt]: 2015} }
});

// Get all the humans with first names that start with "J"
// [Op.like] is the operator for LIKE within sequelize
export const query5 = await Human.findAll({
    where: { fname: { [Op.like]: 'J%' } }
});

// Get all the animals who don't have a birth year
// [Op.is] is the operator for IS (with NULL) within sequelize
export const query6 = await Animal.findAll({
    where: { birthYear: { [Op.is]: null } }
});

// Get all the animals with species "fish" OR "rabbit"
// [Op.or] is the operator for OR within sequelize
export const query7 = await Animal.findAll({
    where: { species: { [Op.or]: ['fish', 'rabbit'] } }
});

// Get all the humans who DON'T have an email address that contains "gmail"
// [Op.notLike] is the operator for NOT LIKE within sequelize
export const query8 = await Human.findAll({
    where: { email: { [Op.notLike]: '%@gmail.com' } }
});

// Continue reading the instructions before you move on!


// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
    // Get the list of all humans
    const humanList = await Human.findAll()
    // Pull the list of the animals for each human
    const animalList = await Promise.all(humanList.map( async (human) => {
        return Animal.findAll({
            where: { humanId: human.humanId}
        })
    }))
    // Loop for pulling out human names
    for (let i = 0; i < humanList.length; i++) {
        console.log(humanList[i].getFullName())
        // Loop for formating the animals
        for (let j = 0; j < animalList[i].length; j++) {
            console.log(`- ${animalList[i][j].name}, ${animalList[i][j].species}`)
        }
    }
}

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
    // Get the list of all animals by species, include human data
    const aniBySpecies = await Animal.findAll({
        where: { 
            species: species
        },
        include: Human
    })

    // Create the set using the list we've generated
    const humans = new Set()
    for (const animal of aniBySpecies) {
        humans.add(animal.human.getFullName())
    }
    return humans    
}

getHumansByAnimalSpecies('dog')