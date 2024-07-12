import './Points.css';

const Points = ({ points }) => {
    return (
        <div className="pointsContainer">
            <h2>Puntos: {points}</h2>
        </div>
    );
}

export default Points;