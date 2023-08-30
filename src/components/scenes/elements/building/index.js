import React, { useRef, useState } from 'react'
import Terrain from '../terrain';


export default function Building(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Return the view, these are regular Threejs elements expressed in JSX
    if (props.position) {
        var position = props.position;
    } else {
        var position = [0, 0, 0];
    }

    if (props.size) {
        var size = props.size;
    }
    else {
        var size = [1, 1, 1];
    }

    if (props.rotation) {
        var rotation = props.rotation;
    }
    else {
        var rotation = [0, 0, 0];
    }

    var final_position = [position[0], position[1] + (size[1] / 2), position[2]];

    var texture_offset = [0, size[1] / 2 - 0.01, 0];

    var texture_position = [final_position[0] - (size[0] / 2) - 0.01, (size[1] / 2), 0];

    var texture_rotation = [0, -Math.PI / 2, 0];

    if (props.rotation) {
        if (props.rotation[1] == Math.PI) {
            //texture_position = [2, texture_position[1], 0];
            texture_rotation = [0, Math.PI / 2, 0];
            texture_position = [final_position[0] + (size[0] / 2) + 0.01, (size[1] / 2), 0];

        }

    }
            

    var texture_size = [size[2] + 0.02, size[1] + 0.02];
    return (
        <>
        <mesh ref={ref} position={final_position}>
            <boxGeometry args={size} />
            <meshStandardMaterial color={'grey'} />
        </mesh>
        <Terrain position={texture_position} size={texture_size} scale={[0.25,0.25]} image={'wall'} rotation={texture_rotation} />
        </>

    )
}

