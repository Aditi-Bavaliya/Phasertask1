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
            this.load.image('bg', 'assets/skies/sky4.png');
            this.load.image('ball', 'assets/particles/red.png');

        }

        function create() {

            this.add.image(400, 300, 'bg');

            const ball = this.physics.add.sprite(200, 150, 'ball')
                .setVelocity(300, -200)
                .setCollideWorldBounds(true, 1, 1, true);

            ball.body.acceleration.x = 500; // increase acceleration in x direction
            ball.body.acceleration.y = 500; // increase acceleration in y direction

            this.physics.world.on('worldbounds', (body, up, down, left, right) => {
                const { gameObject } = body;

                if (up) { gameObject.setAngle(90); }
                else if (down) { gameObject.setAngle(-90); }
                else if (left) { gameObject.setAngle(0); }
                else if (right) { gameObject.setAngle(180); }
            });

        }
    }, []);

    return <div ref={gameRef} id="phaser-game" />;
};

export default GameScene;