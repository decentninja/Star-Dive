var world = {}

world.init = function(foreground, background) {
    var particles = new THREE.Geometry()
    var material = new THREE.ParticleBasicMaterial({
        size: 10E12,
        vertexColors: true,
        map: THREE.ImageUtils.loadTexture(
          "res/star.png"
        ),
        blending: THREE.AdditiveBlending,
        transparent: true
    })
    var backgroundradation = new THREE.AmbientLight(0x404040)
    foreground, background.add(backgroundradation)
    
    stars[0].z -= 10000       // move sol just for now

    // lens flares
    var textureFlare0 = THREE.ImageUtils.loadTexture( "res/lensflare/lensflare0.png" )
    var textureFlare2 = THREE.ImageUtils.loadTexture( "res/lensflare/lensflare2.png" )
    var textureFlare3 = THREE.ImageUtils.loadTexture( "res/lensflare/lensflare3.png" )
    addLight( 0, 0, -9000, new THREE.Color(0xffffff))
    function addLight(x, y, z, color) {
        var lensFlare = new THREE.LensFlare( new THREE.Texture(), 700, 0.0, THREE.AdditiveBlending, new THREE.Color( 0xffffff ))
        lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending )
        lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending )
        lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending )
        lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending )
        lensFlare.position.set( x, y, z )
        foreground, background.add( lensFlare )
    }
    
    colorhelper(function(getColor) {
        stars.forEach(function(star) {
            particle = new THREE.Vector3(star.x, star.y, star.z)
            particles.vertices.push(particle)
            var index = Math.abs(Math.round((star.colorindex % 1)*100) / 100)
            var color = gradientCanvas.getColor(index)
            color = new THREE.Color().setRGB(color[0]/255, color[1]/255, color[2]/255)
            particles.colors.push(color)
            //addLight(star.x, star.y, star.z, color)
        })
        world.particleSystem = new THREE.ParticleSystem(particles, material)
        foreground, background.add(world.particleSystem)
    })
}


// src http://www.html5rocks.com/en/tutorials/casestudies/100000stars/
function colorhelper(callback) {
    gradientImage = document.createElement('img')
    gradientImage.onload = loaded
    gradientImage.src = 'res/starcolor.png'
        
    function loaded() {
        gradientCanvas = document.createElement('canvas')
        gradientCanvas.width = gradientImage.width
        gradientCanvas.height = gradientImage.height

        var ctx = gradientCanvas.getContext('2d')
        ctx.drawImage(gradientImage, 0, 0, gradientImage.width, gradientImage.height)

        gradientCanvas.getColor = function(percentage) {
            return ctx.getImageData(percentage * gradientImage.width, 0, 1, 1).data
        }
        callback(gradientCanvas)
    }
}