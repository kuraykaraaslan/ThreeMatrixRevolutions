import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useTexture, Sphere, LineBasicMaterial, Line, Plane } from '@react-three/drei';

import * as THREE from 'three';
import { redirect } from 'next/dist/server/api-utils';

function WaterJump(props) {

    const shape = new THREE.Shape();

    const { camera } = useThree();

    const selfRef = useRef();
    // drop height
    var height = '50';

    const extrudeSettings = {
        steps: 1,
        depth: 1,
        bevelEnabled: false,
    };

    // randomize max height 0.2 - 0.5
    var max_height = Math.random() * 0.3 + 0.2;
    
    // randomize y velocity 0.5 - 1.5
    var y_velocity = 0.03 * (max_height);

    // randomize x velocity -0.5 - 0.5
    var x_velocity = 0.03 * (Math.random() - 0.5);

    // randomize z velocity -0.5 - 0.5
    var z_velocity = 0.03 * (Math.random() - 0.5);
    


    // set start position at 0,0,0
    var start_position = [0, 2, 0];
    
    // randomize line height 0.05 - 0.1
    var line_height = (Math.random() * 0.05 + 0.05) * 0.8;

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

    // get prop position

    var prop_position = props.position;

    // set start position
    start_position = [prop_position[0] + x_offset, 0 , prop_position[2] + z_offset];

    // set current position

    var current_position = start_position;

    var line_material_props = {
        color: line_color,
        linewidth: line_width, //ignored by WebGLRenderer
        linecap: 'round', //ignored by WebGLRenderer
        linejoin: 'round', //ignored by WebGLRenderer
        opacity: 0.1,

    };


    useFrame(() => {

        // if hit ground
        if (current_position[1] < 0) {
            // set current position to start position
            current_position = start_position;
        } else {
            // update current position
            current_position = [current_position[0] + x_velocity, current_position[1] + y_velocity, current_position[2] + z_velocity];
        }

        if (current_position[1] > max_height) {
            y_velocity = y_velocity * -1;
        } else if (current_position[1] < 0) {
            y_velocity = y_velocity * -1;
        }




        
        selfRef.current.position.set(current_position[0], current_position[1], current_position[2]);

    });



    return (
        <>
            <Line
                points={[[current_position[0], current_position[1], current_position[2]], [current_position[0], current_position[1] + line_height, current_position[2]]]}
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


function WaterGlide(props) {

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

    size = [30,100];

    if (props.scale) {
        var scale = props.scale;
    } else {
        var scale = [0.25,0.25];
    }


    if (props.rotation) {
        var rotation = props.rotation;
    } else {
        var rotation = [-Math.PI / 2, 0, 0];
    }

    var scaleFactor = [scale[0] * size[0], scale[1] * size[1]];

    // raise water level 0.1
    position[1] = position[1] + 0.1;

    

    
    const [texture] = useTexture(['/images/terrain/' + 'water' + '.png']);
    texture.repeat.set(scaleFactor[0], scaleFactor[1]);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    if (props.color) {
        var color = props.color;
    }
    


    useEffect(() => {

        
    }, []);

    useFrame(() => {
        //move the texture
        texture.offset.x += 0.0001;
        texture.offset.y += 0.0001;

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
                <meshStandardMaterial map={!color ? texture : null} transparent={true} opacity={0.6} />
            </Plane>
        </>
    );
}


export default function Water(props) {
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


    for (var x = xStart; x < xEnd; x += 1) {
        for (var y = yStart; y < yEnd; y += 1) {
            drops.push([x, 0, y]);
        }
    }
    if (drops.length > 7000) {
        console.log('break at ' + drops.length);

    }
    



    return (
        <>
            {drops.map((drop, index) => (
            <WaterJump key={index} height={height} position={drop} size={size} color={color} opacity={opacity} speed={speed} />
            ))}
            <WaterGlide position={props.position} size={props.area} />

        </>
    )
}



