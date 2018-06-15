import React from 'react';

import 'whatwg-fetch'

import './Body1.scss';


import img1 from '../../../img/mini/plant1.jpg';
import img2 from '../../../img/mini/plant2.jpg';
import img3 from '../../../img/mini/plant3.jpg';
import img4 from '../../../img/mini/plant4.jpg';
import img5 from '../../../img/mini/plant5.jpg';
import img6 from '../../../img/mini/plant6.jpg';

const imgMiniBoard = [img1, img2, img3, img4, img5, img6];

export default class Body1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tileCount: imgMiniBoard.length * 2, //liczba kart - to bede podstawiac przez props
            tiles: [], // wymieszana tablica kart
            tilesChecked: [], //zaznaczone klocki
            currentClickedTile: 0,
            moveCount: 0, //liczba ruchów
            removedTiles: 0,
            tilesImg: imgMiniBoard, //fotki dla klocków
            style: "active",
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
            style: "hidden"
        })
    }


    checkCards(clickedTiles) {
        const checked = clickedTiles[0].src === clickedTiles[1].src;

        setTimeout(() => {
            clickedTiles[0].className = checked ? 'removed' : 'hidden';
            clickedTiles[1].className = checked ? 'removed' : 'hidden';

            this.setState({
                moveCount: this.state.moveCount + 1,
                tilesChecked: [],
                canClick: true,
                removedTiles: checked ? this.state.removedTiles + 2 : this.state.removedTiles
            })
        }, checked ? 100 : 500);
    }


    handleClick = (event) => {
            event.target.className = 'active';

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
            return <div key={index} className="singleTitle">
                <img onClick={this.state.canClick ? this.handleClick : null} data-id={index} className="hidden" src={item}/>
            </div>
        });

        return (
            <div className="container">
                <div className="background">
                    <p>Sweet memory game</p>
                </div>
                <div className="tilescontainer">
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
