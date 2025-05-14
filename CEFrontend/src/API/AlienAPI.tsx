export async function RandomizerAliens(Easy: number, Medium: number, Hard: number): Promise<Alien[]> {
    return await fetch("http://localhost:5002/api/Ransomizer?Easy=" + Easy + "&Medium=" + Medium + "&Difficult=" + Hard, { headers: { 'Content-Type': 'application/json' }, method: 'GET' })
        .then((response) => {
            return response.json();
        });
}

export interface Alien {
    id: number;
    name: string,
    description: string,
    image: string,
    difficulty: Difficulty,
    publicReveal: true,
    extraSupplies: true
}

enum Difficulty {
    Easy,
    Medium,
    Hard
}
