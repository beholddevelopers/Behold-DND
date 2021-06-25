

export function rollDice(faces: number): number{
	return Math.ceil(Math.random() * faces);
}

export function calcBonus(stat: number): number{
	return Math.floor((stat - 10) / 2)
}

export function rollBaseStat(): number{
	return [rollDice(6),rollDice(6),rollDice(6),rollDice(6)] //roll 4 D6
		.sort() //order them from highest to lowest
		.slice(1,4) //take highest 3
		.reduce((acc,cur)=>acc+cur); //add the numbers up 
}

export function resolveImagePath(src:string):string{
	//fix for parcel issue where it puts a "/" in front of image files 
	return '.' + src;
}