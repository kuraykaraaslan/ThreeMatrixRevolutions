import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useTexture, Sphere, LineBasicMaterial, Line } from '@react-three/drei';

import * as THREE from 'three';

function RainDrop(props) {

    const shape = new THREE.Shape();

    const { camera } = useThree();

    const selfRef = useRef();
    // drop height
    var height = '50';

    var position = props.position;

    const extrudeSettings = {
        steps: 1,
        depth: 1,
        bevelEnabled: false,
    };


    var line_height = 1;

    // randomize line height 0.2 - 1.2
    line_height = Math.random() + 0.2;

    // randomize line width 0.2 - 1.2
    var line_width = Math.random() + 0.2;

    // randomize line color white to grey
    var line_color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255);

    // random y offset 0.2 - 1.2
    var y_offset = Math.random() + 0.2;

    // randomize x offset -0.5 - 0.5
    var x_offset = Math.random() - 0.5;

    // randomize z offset -0.5 - 0.5
    var z_offset = Math.random() - 0.5;

    var start_position = [position[0] + x_offset, position[1] + y_offset, position[2] + z_offset];

    var current_position = [position[0] + x_offset, position[1] + y_offset, position[2] + z_offset];

    // randomize speed 0.1 - 0.5
    var speed = Math.random() * 0.4 + 0.1;

    var line_material_props = {
        color: line_color,
        linewidth: line_width, //ignored by WebGLRenderer
        linecap: 'round', //ignored by WebGLRenderer
        linejoin: 'round' //ignored by WebGLRenderer
    };

    useFrame(() => {

        // if drop 15 far away from camera don't render
        if (Math.abs(selfRef.current.position.x - camera.position.x) > 15) {
            selfRef.current.visible = false;
        } else {
            selfRef.current.visible = true;
        }

        // if drop 15 far away from camera don't render
        if (Math.abs(selfRef.current.position.y - camera.position.y) > 15) {
            selfRef.current.visible = false;
        } else {
            selfRef.current.visible = true;
        }

        current_position[1] -= speed;
        if (current_position[1] < -height) {
            current_position[1] = height;
        }

        selfRef.current.position.set(current_position[0], current_position[1], current_position[2]);

    });



    return (
        <>
            <Line
                points={[[current_position[0], current_position[1] + y_offset, current_position[2]], [current_position[0], current_position[1] + line_height, current_position[2]]]}
                color="black"
                lineWidth={1}                   // In pixels (default)
                segments                        // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
                dashed={false}                  // Default         // Default
                ref={selfRef}
                {...line_material_props}
            />
        </>
    )

}


export default function Rain(props) {
    // area of rain
    if (props.area) {
        var area = props.area;
    } else {
        var area = [100, 100];
    }
    // number of drops
    if (props.steps) {
        var xysteps = props.xysteps;
    }
    else {
        var xysteps = 10;
    }
    // speed of drops
    if (props.speed) {
        var speed = props.speed;
    } else {
        var speed = 1;
    }
    // size of drops
    if (props.size) {
        var size = props.size;
    } else {
        var size = 0.001;
    }
    // color of drops
    if (props.color) {
        var color = props.color;
    } else {
        var color = 'blue';
    }
    // opacity of drops
    if (props.opacity) {
        var opacity = props.opacity;
    } else {
        var opacity = 0.5;
    }
    // rain height
    if (props.height) {
        var height = props.height;
    } else {
        var height = 50;
    }
    // center of rain
    if (props.center) {
        var center = props.center;
    } else {
        var center = [0, 0];
    }

    // rain heavy
    if (props.heavy) {
        var heavy = props.heavy;
    } else {
        var heavy = 10;
    }


    var xStart = center[0] - area[0] / 2;
    var xEnd = center[0] + area[0] / 2;
    var yStart = center[1] - area[1] / 2;
    var yEnd = center[1] + area[1] / 2;

    var drops = [];

    var zStep = (xEnd - xStart) / heavy;


    for (var z = zStep; z < height; z += zStep) {
        for (var x = xStart; x < xEnd; x += 1) {
            for (var y = yStart; y < yEnd; y += 1) {
                drops.push([x, z, y]);
            }
        }
        if (drops.length > 7000) {
            console.log('break at ' + drops.length);
            break;

        }
    }

    var jump = [];

    for (var x = xStart; x < xEnd; x += 1) {
        for (var y = yStart; y < yEnd; y += 1) {
            jump.push([x, 0, y]);
        }
    }



    return (
        <>

            {drops.map((drop, index) => (
                <RainDrop key={index} height={height} position={[drop[0], drop[1], drop[2]]} size={size} />
            ))}

        </>
    )
}



