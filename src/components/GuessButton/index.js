import './GuessButton.css';

const GuessButton = ({ onClick }) => {
    return (
        <button className="button" onClick={onClick}>Adivinar</button>
    );
}

export default GuessButton;