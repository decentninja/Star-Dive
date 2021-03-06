(function() {
    var renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector(".game"),
        antialias: true,
    })
    renderer.autoClear = false
    renderer.setSize(window.innerWidth, window.innerHeight)

    var background = new THREE.Scene()
    var foreground = new THREE.Scene()
    
    world.init(foreground, background)
    ship.init(foreground, background)

    var winResize = new THREEx.WindowResize(renderer, ship.camera)
    
    function update() {
        ship.update()

        renderer.clear()

        ship.camera.far = 10000000
        ship.camera.updateProjectionMatrix()
        renderer.render(background, ship.camera)
        ship.camera.far = 1000
        ship.camera.updateProjectionMatrix()
        renderer.render(foreground, ship.camera)

        requestAnimationFrame(update)
    }
    update();
})()