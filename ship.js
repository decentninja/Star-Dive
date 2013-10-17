var ship = {}
ship.init = function(foreground, background) {
    ship.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1)
    background.add(ship.camera)
    foreground.add(ship.camera)
}