import React from 'react';

import 'whatwg-fetch'

import './Body2.scss';
import img1 from '../../../img/midi/food1.jpg';
import img2 from '../../../img/midi/food2.jpg';
import img3 from '../../../img/midi/food3.jpg';
import img4 from '../../../img/midi/food4.jpg';
import img5 from '../../../img/midi/food5.jpg';
import img6 from '../../../img/midi/food6.jpg';
import img7 from '../../../img/midi/food7.jpg';
import img8 from '../../../img/midi/food8.jpg';
import img9 from '../../../img/midi/food9.jpg';
import img10 from '../../../img/midi/food10.jpg';

const imgMiniBoard = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export default class Body2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tileCount: imgMiniBoard.length * 2,
            tiles: [],
            tilesChecked: [],
            currentClickedTile: 0,
            moveCount: 0,
            removedTiles: 0,
            tilesImg: imgMiniBoard,
            style: "active2",
            canClick: true
        }
    }

    shuffleImages(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    componentDidMount() {
        let doubledTitlesImg = [...this.state.tilesImg, ...this.state.tilesImg]
        let mixTitlesImg = this.shuffleImages(doubledTitlesImg);

        this.setState({
            tiles: mixTitlesImg,
            style: "hidden2"
        })
    }


    checkCards(clickedTiles) {
        const checked = clickedTiles[0].src === clickedTiles[1].src;

        setTimeout(() => {
            clickedTiles[0].className = checked ? 'removed2' : 'hidden2';
            clickedTiles[1].className = checked ? 'removed2' : 'hidden2';

            this.setState({
                moveCount: this.state.moveCount + 1,
                tilesChecked: [],
                canClick: true,
                removedTiles: checked ? this.state.removedTiles + 2 : this.state.removedTiles
            })
        }, checked ? 100 : 500);
    }


    handleClick = (event) => {
        event.target.className = 'active2';

        let clickedTiles = [...this.state.tilesChecked];

        if (event.target.dataset.id !== this.state.currentClickedTile) {
            clickedTiles.push(event.target);
        }

        if (clickedTiles.length === 2) {
            this.setState({
                canClick: false
            });

            this.checkCards(clickedTiles)
        }

        this.setState({
            tilesChecked: clickedTiles,
            currentClickedTile: event.target.dataset.id
        });
    };

    render() {

        const ArrToShow = this.state.tiles.map((item, index) => {
            return <div key={index} className="singleTitle2">
                <img onClick={this.state.canClick ? this.handleClick : null} data-id={index} className="hidden2" src={item}/>
            </div>
        });

        return (
            <div className="container">
                <div className="background">
                    <p>Sweet memory game</p>
                </div>
                <div className="tilescontainer2">
                    {ArrToShow}
                </div>
                <div className="footer">
                    <strong>Number of moves: {this.state.moveCount}</strong>
                    {
                        this.state.removedTiles === this.state.tileCount
                            ? alert("Wow! You've won :)")
                            : null
                    }
                </div>
            </div>
        )
    }
}
