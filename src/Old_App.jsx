import {useEffect, useState} from "react";

const Card = ({ title }) => {
    // Define a state
    
    const [count, setCount] = useState(0)

    const [hasLiked, setHasLiked] = useState(false);
    // Le false est attribuer a hasLiked par defaut

    // useEffect comes to handel the alert after liked the movie
    useEffect(() => {
        console.log(`${title} has been liked ${hasLiked}`);
        
    }, [hasLiked])  // Ajouter hasLiked a la fin permet d'afficher a la console 
                    // Si on clique seukement sur le button like pas sur la carte entier

    return(
        // <div className="card" onClick={() => setCount((preState) => prevState +1)}>  // This is the right way to do things in this case
        <div className="card" onClick={() => setCount(count + 1)}>
            <h2>{title} <br /> {count || null}</h2>

            {/* <button onClick={() => setHasLiked(true)}> */}
            {/* cette button elle permet de liké sans disliké */}
                
            <button onClick={() => setHasLiked(!hasLiked)}>
                {hasLiked ? 'Liked' : 'Like'}
            </button>
        </div>
    )
}

const App = () => {

    // Defining state
    // const [hasLiked, setHasLiked] = useState(initialState: false);

    return (
        <div className="card-container">
            <h2>Say something</h2>

            <Card title="Avatar"/>
            <Card title="Avengers"/>
            <Card title="Wakanada"/>
        </div>
    )
}

export default App
