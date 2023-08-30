
import React, { useRef, useState, useEffect } from 'react';

import { useFrame} from '@react-three/fiber';

import { useTexture, Plane } from '@react-three/drei';

import * as THREE from 'three';

function Terrain(props) {

    const ref = useRef();

    if (props.position) {
        var position = props.position;
    } else {
        var position = [0,0,0];
    }

    if (props.size) {
        var size = props.size;
    } else {
        var size = [1,1];
    }

    if (props.scale) {
        var scale = props.scale;
    } else {
        var scale = [0.25,0.25];
    }

    if (props.image) {
        var image = props.image;
    } else {
        var image = 'pav1';
    }

    if (props.rotation) {
        var rotation = props.rotation;
    } else {
        var rotation = [-Math.PI / 2, 0, 0];
    }

    var scaleFactor = [scale[0] * size[0], scale[1] * size[1]];

    

    
    const [texture] = useTexture(['/images/terrain/' + image + '.png']);
    texture.repeat.set(scaleFactor[0], scaleFactor[1]);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    if (props.color) {
        var color = props.color;
    }
    


    useEffect(() => {

        
    }, []);

    useFrame(() => {
    });

    return (
        <>
            <Plane
                ref={ref}
                args={[size[0], size[1], 1, 1]}
                position={position}
                rotation={rotation}
                receiveShadow
            >
                <meshStandardMaterial map={!color ? texture : null} color={color ? color : null} />
            </Plane>
        </>
    );
}

Object.freeze(Terrain);

export default Terrain;



