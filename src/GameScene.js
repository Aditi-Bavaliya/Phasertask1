import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const GameScene = () => {
    const gameRef = useRef(null);


    useEffect(() => {
        const gameConfig = {
            type: Phaser.AUTO,
            parent: gameRef.current,
            width: 800,
            height: 600,
            scene: {
                preload: preload,
                create: create,
            },
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
        };

        new Phaser.Game(gameConfig);

        function preload() {
            this.load.setBaseURL('https://labs.phaser.io');
            this.load.image('sky', 'assets/skies/sky4.png');
            this.load.image('ball', 'assets/sprites/pangball.png');

        }

        function create() {

            this.add.image(400, 300, 'sky');
            const ball = this.physics.add.sprite(400, 300, 'ball');
            ball.setCollideWorldBounds(true);
            ball.setBounce(1);
            ball.setVelocity(Phaser.Math.Between(-500, 500), Phaser.Math.Between(-500, 500));

        }
    }, []);

    return <div ref={gameRef} id="phaser-game" />;
};

export default GameScene;

