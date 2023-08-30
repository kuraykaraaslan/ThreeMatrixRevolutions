import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from 'three/addons/loaders/DDSLoader.js';

import { useLoader, useFrame } from "@react-three/fiber";
import { use, useRef } from "react";
import SpotLight from "@react-three/drei";



function Window(props) {

    const ref = useRef();

    const obj = props.obj.clone();

    if (props.position) {
        var position = props.position;
    } else {
        var position = [0,0,0];
    }

    if (props.rotation) {
        var rotation = props.rotation;
    } else {
        var rotation = [0,0,0];
    }


    useFrame(() => {
    });

    return (
        <>
        <primitive object={obj} ref={ref} position={position} rotation={rotation} />
        </>
    );
}

export default function Windows(props) {

    const materialcreator = useLoader(MTLLoader, "/assets/obj/window/4.mtl");
    const obj = useLoader(OBJLoader, "/assets/obj/window/4.obj", loader => {
        materialcreator.preload();        
        loader.setMaterials(materialcreator);                   
    }
    );

    obj.scale.set(0.005, 0.005, 0.005);

    // line start

    if (props.start) {
        var start = props.start;
    }

    else {
        var start = [0, 0, 0];
    }

    // line end

    if (props.end) {
        var end = props.end;
    }

    else {
        var end = [0, 0, 0];
    }


    // number of windows

    if (props.number) {
        var number = props.number;
    }

    if (props.rotation) {
        var rotation = props.rotation;
    }

    else {
        var number = 1;
    }

    var window_positions = [];

    for (var i = 0; i < number; i++) {
        var window_position = [start[0] + (end[0] - start[0]) * i / number, start[1] + (end[1] - start[1]) * i / number, start[2] + (end[2] - start[2]) * i / number];
        window_positions.push(window_position);
    }

    return (
        <>
        {window_positions.map((window_position, index) => (
            <Window key={index} obj={obj} position={window_position} rotation={rotation} />
        ))}
        </>
    );
}








