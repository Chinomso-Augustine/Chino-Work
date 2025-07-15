import React from "react";
import PromoHeading from "./PromoHeading"
import Footer from "./footer";


{/**Goal is to update multiple section with just one function
Promo = parent component
*/}


{/**We can create an object that contains the info we want to update and pass it as props */ }
const data = {
    heading: "60% off at Chino",
    action: "Buy today or they gone"
}

function Promo() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
            <div style={{ flex: 1 }}>
                <PromoHeading heading={data.heading} />
                <PromoHeading action={data.action} />
            </div>

            <Footer heading={data.heading} action={data.action} />
        </div>

    )
}
export default Promo; 