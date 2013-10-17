var ship = {}
ship.init = function(foreground, background) {
    ship.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1)
    background.add(ship.camera)
    foreground.add(ship.camera)
    ship.camera.position.z = 300
    ship.controls = new THREE.OrbitControls(ship.camera);

    var red = new THREE.MeshBasicMaterial ({
        color: 0xCC0000
    })
    
    ship.cube = new THREE.Mesh(new THREE.CubeGeometry(50,50,100), red)
    foreground.add(ship.cube)
    
    ship.cube.position.z = -1
}