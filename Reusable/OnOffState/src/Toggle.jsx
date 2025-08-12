import { useState } from "react";

export default function ToggleLight() {
    const [lightMode, setLightMode] = useState(true);

    return (
        //if true, change bg to white, else black
        <div
            className={`min-h-screen transition-colors duration-900 flex justify-between ${lightMode ? "bg-white text-black" : "bg-black text-white"
                }`}
        >
            <p className="p-4">{lightMode ? "Light mode" : "Dark mode"}</p>
            <button
                onClick={() => setLightMode(!lightMode)}
                className="m-4 h-10 px-4 bg-purple-500 text-white rounded hover:bg-blue-600"
            >
                Change Mode
            </button>
        </div>
    );
}
