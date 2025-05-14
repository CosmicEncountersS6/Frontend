import { Params, useParams } from "react-router";
import { Alien, RandomizerAliens } from "../API/AlienAPI";
import { useEffect, useState } from "react";
import AlienListComponent from "./AlienList";


const AlienShower = () => {
    const params: Params<string> = useParams();
    const easyAliens: number = parseInt(params.easy ?? "", 0);
    const mediumAliens: number = parseInt(params.medium ?? "", 0);
    const hardAliens: number = parseInt(params.hard ?? "", 0);

    const [alienList, SetAlienList] = useState<Alien[] | undefined>(undefined);

    useEffect(() => { generateNumbers() })

    const generateNumbers = async () => {
        SetAlienList(undefined)
        const res = await RandomizerAliens(easyAliens, mediumAliens, hardAliens);
        SetAlienList(res)
    }

  return (
      <div>
          { alienList != undefined &&
              <AlienListComponent aliens={alienList ?? []} />
          }          
      </div>
  );
}

export default AlienShower;