var ship = {}
ship.init = function(foreground, background) {
    ship.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1)
    background.add(ship.camera)
    foreground.add(ship.camera)

    ship.commands = {
        "(Do a barrel) roll": function() {
            ship.rolling = true
            ship.camera.rotation.z = -0.01
        }
    }

    if(annyang) {
        annyang.debug(true)
        annyang.init(ship.commands)
        annyang.start()
    }
}

ship.update = function() {
    ship.camera.position.z -= 1E11
    if(ship.rolling == true) {
        ship.camera.rotation.z -= 0.03
        if(ship.camera.rotation.z < -2*Math.PI) {
            ship.rolling = false
        }
    }
}