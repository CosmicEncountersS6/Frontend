import React from "react";

interface CardProps {
    name: string;
    imageUrl: string;
    description: string;
}

const InfoCard: React.FC<CardProps> = ({ name, imageUrl, description }) => {
    return (
        <div>
            <img src={imageUrl} alt={name}/>
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    );
};


export default InfoCard;
