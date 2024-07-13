import './Hint.css';

const Hint = ({ onHint, hintsUsed, maxHints }) => {
  return (
    <button className='hintButton' onClick={onHint} disabled={hintsUsed >= maxHints}>
        Pista ({maxHints - hintsUsed} restantes)
    </button>
    );
}

export default Hint;