import { Alien } from '../api/AlienAPI'
import InfoCard from './AlienCard';

interface AlienListProps {
    aliens: Alien[]
}

const AlienListComponent: React.FC<AlienListProps> = ({ aliens }) => {
  return (
      <div>
          {aliens.map((alien: Alien) => {
              return (
                  <InfoCard name={alien.name} imageUrl={alien.image} description={alien.description} />
              )
          })
          }
      </div>
  );
}

export default AlienListComponent;