import React from "react";
import { Wrapper } from "../Styles/AnimatedCard";

const AnimatedCard = ({ children }) => {
    return (
        <Wrapper>
            <div className="volunteer-card">{children}</div>
        </Wrapper>
    );
};

export default AnimatedCard;
