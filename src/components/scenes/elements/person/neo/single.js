import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from 'three/addons/loaders/DDSLoader.js';

import { useLoader, useFrame } from "@react-three/fiber";
import { use, useRef } from "react";
import * as THREE from 'three';


export default function SingleNeo(props) {
    const ref = useRef();


    const materialcreator = useLoader(MTLLoader, "assets/obj/neo/Neo.mtl");
    const obj = useLoader(OBJLoader, "/assets/obj/neo/Neo.obj", loader => {
       
        //print keys

        loader.manager.addHandler(/\.dds$/i, new DDSLoader());  
        //consolo log keys of materialcreator.materials object


        materialcreator.preload();      

        loader.setMaterials(materialcreator);
    }
    );

    obj.scale.set(2, 2, 2);


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
        <primitive object={obj} ref={ref} position={position} rotation={rotation}/>
        <ambientLight intensity={1} />
        </>
    );
}

