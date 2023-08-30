import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from 'three/addons/loaders/DDSLoader.js';

import { useLoader, useFrame } from "@react-three/fiber";
import { use, useRef } from "react";




export function Smith(props) {
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


export default function Smiths(props) {

    const materialcreator = useLoader(MTLLoader, "assets/obj/smith/Agent_Smith.mtl");
    const obj = useLoader(OBJLoader, "/assets/obj/smith/Agent_Smith.obj", loader => {
        loader.manager.addHandler(/\.dds$/i, new DDSLoader());

        materialcreator.preload();        

        loader.setMaterials(materialcreator);                   
    }
    );


    obj.scale.set(2, 2, 2);

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
        var end = [10, 0, 0];

    }

    // number of smiths
    if (props.number) {
        var number = props.number;
    }

    else {
        var number = 1;
    }

    var smiths_positions = [];

    for (var i = 0; i < number; i++) {
        var smith_position = [start[0] + (end[0] - start[0]) * i / number, start[1] + (end[1] - start[1]) * i / number, start[2] + (end[2] - start[2]) * i / number];
        smiths_positions.push(smith_position);       
    }

    if (props.rotation) {
        var rotation = props.rotation;
    }
    else {
        var rotation = [0, 0, 0];
    }


    return (
        <>
            {smiths_positions.map((position, index) => (
                <Smith key={index} obj={obj} position={position} rotation={rotation} />
            ))}
        </>
    );
}

  
