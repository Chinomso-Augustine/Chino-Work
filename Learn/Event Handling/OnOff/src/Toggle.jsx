
const Toggle = () => {

    let darkModeOn = true; //instead of manually changing this, used event onClick
    const darkMode = "Dark mode On";
    const lightMode = "Light mode On"

    const handleClick = () => {
        //Turn darkModeOn off / The opposite of its current state
        darkModeOn = !darkModeOn;

        //For checking if this works
        darkModeOn? console.log("Dark mode On"): console.log("Light mode off")
}

return (
    <div>
        {darkModeOn ? darkMode : lightMode}
            <button onClick={handleClick}> Click </button>
    </div>
)
}

export default Toggle; 