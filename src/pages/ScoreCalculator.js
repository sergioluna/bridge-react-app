import { useState } from 'react';

function calculateScore(bid, suit, double, vulnerable, tricks) {

    if (contractIsFulfilled(bid, tricks)) {
        const baseScore = determineBaseScore(bid, suit, double);
        const bonusScore = determineBonusScore(baseScore, bid, suit, double, vulnerable, tricks);
        return (baseScore + bonusScore);
    } else {
        //Caclulate negative score
        const decrementedScore = calculateDecrementedScore(bid, double, vulnerable, tricks);
        return decrementedScore;
    }
}

function contractIsFulfilled(bid, tricks) {
    return (tricks - 6 >= bid);
}

function determineBaseScore(bid, suit, double) {
    let score = 0;
    const increment = (suit === "min" ? 20 * (2 ** double) : 30 * (2 ** double));

    for (let i = 0; i < bid; i++) {
        if (i === 0 && suit === "nt") {
            score += 40 * (2 ** double);
        } else {
            score += increment
        }
    }
    return score;
}

function determineBonusScore(baseScore, bid, suit, double, vulnerable, tricks) {
    let score = 0

    const insultScore = 50 * double;
    score += insultScore;

    const partScoreBonus = (baseScore < 100 ? 50 : 0);
    score += partScoreBonus;

    const determineGameBonus = (base, vul) => {
        if (base >= 100) {
            return (vul ? 500 : 300)
        } 

        return 0;
    }
    const gameBonus = determineGameBonus(baseScore, vulnerable);
    score += gameBonus;

    const determineSlamBonus = (bid, vul) => {
        if (bid === 6) {
            return (vul ? 750 : 500);
        } else if (bid === 7) {
            return (vul ? 1500 : 1000);
        }
        
        return 0;
    }
    const slamBonus = determineSlamBonus(bid, vulnerable);
    score += slamBonus;

    const determineOvertrickBonus = (bid, suit, double, vul, tricks) => {
        let overtrick = 0;
        for(let i = 0; i < tricks - 6 - bid; i++) {
            if (double === 0) {
                overtrick += (suit === "min" ? 20 : 30);
            }
            else {
                overtrick += (vul ? 100 * (2 * double) : 50 * (2 * double));
            }
        }
        return overtrick;
    }
    const overtrickBonus = determineOvertrickBonus(bid, suit, double, vulnerable, tricks);
    score += overtrickBonus;

    return score;
}

function calculateDecrementedScore(bid, double, vulnerable, tricks) {
    let score = 0;
    
    for(let i = 0; i < 6 + bid - tricks; i++) {
        if (i === 0) {
            const cases = (vulnerable ? [100, 200, 400] : [50, 100, 200]);
            score -= cases[double];
        } else if (i === 1 || i === 2) {
            const cases = (vulnerable ? [100, 300, 600] : [50, 200, 400])
            score -= cases[double];
        } else {
            const cases = (vulnerable ? [100, 300, 600] : [50, 300, 600]);
            score -= cases[double];
        }
    }

    return score;
}


function ScoreCalculator() {
    const [formData, setFormData] = useState({
        suit: "none",
        bid: "none",
        double: "0",
        vulnerable: "0",
        tricks: "none"
    });
    const [score, setScore] = useState()

    const parseSuit = (suit) => {
        if (suit === "clubs" || suit === "diamonds") {
            return "min";
        } else if (suit === "hearts" || suit === "spades") {
            return "maj";
        } else if (suit === "notrump") {
            return "nt";
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (formIsValid()) {
            const newScore = calculateScore(
                        parseInt(formData.bid, 10), 
                        parseSuit(formData.suit), 
                        parseInt(formData.double, 10), 
                        parseInt(formData.vulnerable, 10),
                        parseInt(formData.tricks, 10)
                    );
            setScore(newScore);
        } else {
            setScore();
        }
    }

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
        setScore();
    }

    const formIsValid = () => {
        return (formData.suit !== "none" && formData.bid !== "none" && formData.tricks !== "none");
    }

    return (
        <div className="container p-5">

            <p className="fs-3">Score Calculator</p>

            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <select className="form-select" name="suit" aria-label="Select Suit" onChange={handleChange} value={formData.suit}>
                            <option value ="none">Trump Suit</option>
                            <option value="clubs">Clubs</option>
                            <option value="diamonds">Diamonds</option>
                            <option value="hearts">Hearts</option>
                            <option value="spades">Spades</option>
                            <option value="notrump">No Trump</option>
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-select" name="bid" aria-label="Select Bid" onChange={handleChange} value={formData.bid}>
                            <option value ="none">Bid</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <select className="form-select" name="double" aria-label="Select Double" onChange={handleChange} value={formData.double}>
                            <option value="0">No double</option>
                            <option value="1">Double</option>
                            <option value="2">Redoubled</option>
                        </select>
                    </div>
                    <div className="col">
                    <select className="form-select" name="vulnerable" aria-label="Select Vulnerable" onChange={handleChange} value={formData.vulnerable}>
                            <option value="0">Not Vulnerable</option>
                            <option value="1">Vulnerable</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <select className="form-select" name="tricks" aria-label="Select Tricks" onChange={handleChange} value={formData.tricks}>
                            <option value="none">Tricks</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                        </select>
                    </div>
                </div>

                <div className="d-grid">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>

            <div className="row my-3">
                <div className="col">
                    <p className="fs-1">Score: {score}</p>
                </div>
            </div>
        </div>
    )
}

export default ScoreCalculator;