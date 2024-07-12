import './Flag.css';
import Image from 'next/image';

const Flag = ({ country }) => {
    return (
        <Image className="flag" src={country.flag} alt="Bandera"/>
    );
}

export default Flag;