import './Flag.css';
import Image from 'next/image';

const Flag = ({ country }) => {
    return (
        <Image className="flag" src={country.flag} alt="Bandera" width={300} height={200}/>
    );
}

export default Flag;