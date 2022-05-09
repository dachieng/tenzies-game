function Dice(props){
    const styles = {
        backgroundColor:props.isHeld ? "#59E391" : "#fff",

    }

    return (
    <div className="dice" style={styles} onClick={props.handleisHeld}>
        <h2>{props.value}</h2>
    </div>
    )
}

export default Dice;