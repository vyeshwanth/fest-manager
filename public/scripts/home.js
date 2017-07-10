function sassylogo() {
    svg = document.getElementById("LogoLayer");
   s = Snap(svg);
   var path = Snap.select('#line');

    function resetPath() {
       path.animate({ d: "M0,254.48c.49-.06.47-.46.5-.79a8.88,8.88,0,0,1,1.28-3.58C3,248,4.2,245.86,5.39,243.72c7-12.62,95.94-171.39,103.19-184.39a8.74,8.74,0,0,1,8.77-4.82c5.45.39,9.45,5.71,6.24,11.3-3.52,6.14-58.14,105.64-62.14,112.8a2.91,2.91,0,0,0,.12,3.38c10.14,16.81,35.9,59.81,38.67,64.49a2.23,2.23,0,0,0,2.3,1.3c.36,0,.73,0,1.09,0,45.61.14,153.76.22,162.22.22a7,7,0,0,0,1.2-.05q.83-.14.56-.94a4.42,4.42,0,0,0-.39-.78c-5.88-10.09-94.45-161.47-98.79-168.91-.9-1.54-1.79-3.1-2.71-4.62-.71-1.16-1-1.16-1.68,0-.11.19-.23.37-.34.56-2.92,5.22-50.06,88.61-56.35,99.76a2.6,2.6,0,0,0,0,3q8.87,14.65,17.63,29.37a2.61,2.61,0,0,0,2.55,1.44c8,0,50.68,0,66.59,0,.49,0,1.11.16,1.41-.35s-.13-.9-.38-1.29c-3.79-6.11-26-45.18-34.27-58.64a7.91,7.91,0,0,1-.15-8.35,8,8,0,0,1,7.18-4.45,8.4,8.4,0,0,1,7.58,4.19c4.15,6.48,37.82,63.26,42.94,71.92a8.81,8.81,0,0,1,1.31,4.69,8.93,8.93,0,0,1-9.09,8.76c-22.51.13-80.34.23-89.24.21a9.35,9.35,0,0,1-8.65-5c-7.5-13.11-15.11-26.15-22.64-39.25a9,9,0,0,1,0-9.47c3-5.32,80.47-145.6,84.21-152.49a13.2,13.2,0,0,1,14.77-7.06,12.71,12.71,0,0,1,8.63,6.21c5.62,9.26,112.5,187.23,116,193.08a8.35,8.35,0,0,1,1.08,6.71c-1,3.88-5.4,6.27-9.54,5.34-3-.67-4.93-2.54-6.47-5.12C278.92,183.26,194.16,42,188,31.78c-.82-1.36-1.14-1.39-1.79-.12-3.64,7.07-7.37,14.09-11,21.15a2.27,2.27,0,0,0,.05,2.45c2.33,4,133.73,229.44,135.86,233.31a8.55,8.55,0,0,1,.2,8c-2.42,5.36-6.64,8.16-12.5,8.16q-109.86,0-219.71,0a9.38,9.38,0,0,1-6.86-2.85c-3.35-3.27-3.13-10,1-13.14a10.65,10.65,0,0,1,6.69-2c5.14,0,143.87.2,208.09.2.33,0,.66,0,1,0,1-.08,1.1-.27.71-1.15s-.94-1.73-1.42-2.59c-3.17-5.79-6.4-11.55-9.55-17.35a2.46,2.46,0,0,0-2.45-1.4c-15.25-.1-255.95-.84-266.74-.6A9,9,0,0,1,.6,256.92c-.08-.34,0-.86-.58-.9m81.83-7.84c.7,0,1,0,.53-.85-3.81-6.41-27.93-47.32-30.33-51.39-.44-.74-.85-.7-1.28,0-.13.22-.28.42-.41.64-3.43,5.83-23.38,39.58-29.91,50.63-.18.3-.54.65-.39,1s.72.21,1.09.21C29.39,248.27,75.84,248.16,81.85,248.17Z" }, 1000, mina.backout);
    }
    window.setTimeout(function() {
        svg.classList.add("sassy");
       resetPath();
        window.setTimeout(function() {
            document.getElementById('atmos_titling').classList.add('sassy');
        }, 1000)
    }, 1000);
}

(function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('webGLwrapper').appendChild(renderer.domElement);
    warp = false;
    window.setTimeout(function(){
        warp = true;
    },2000);

    var light = new THREE.AmbientLight(0x4666FF, .75); // soft white light
    scene.add(light);

    var pointLight = new THREE.PointLight(0xffffff, 1, 50);
    pointLight.position.set(0, 10, 0);
    pointLight.castShadow = true;
    // pointLight.shadowCameraVisible = true;
    scene.add(pointLight);


    particleSystem = createParticleSystem();
    scene.add(particleSystem);
    var time = 0.0;
    var target = 10.0;
    let distance = 10;
    let assignedposition = 2;
    var frame;
    pendingBlow = {x: 0.0, y: 0.0};
    camera.up = new THREE.Vector3(0, 1, 0);
    var animate = function() {
        frame = requestAnimationFrame(animate);
        animating = false;
        if(warp) {
            animating = true;
            time += (target - time)/25;
        }
        particleSystem.material.uniforms.time.value = time;

        particleSystem.material.uniforms.mx.value += (pendingBlow.x - particleSystem.material.uniforms.mx.value)/100;
        particleSystem.material.uniforms.my.value += (pendingBlow.y - particleSystem.material.uniforms.my.value)/100;
        camera.position.z = distance;
        camera.lookAt(new THREE.Vector3(0,0,0));
        distance += (assignedposition - distance) / 100;
        renderer.render(scene, camera);
    };

    animate();
    document.onclick = function(e) {
        if(animating)
            target += 5.0;
        else {
            time = 0.0;
            target = 10.0;
        };
    }
    document.onmousemove = function(e) {
        pendingBlow.x = (e.pageX - window.innerWidth/2)/window.innerWidth;
        pendingBlow.y = (e.pageY - window.innerHeight/2)/window.innerHeight;
    }
})();

function createParticleSystem() {


    var icosa = new THREE.IcosahedronBufferGeometry(1, 7);


    var vertexShader = `
        varying vec3 v;
        varying vec3 pos;
        float posY;
        uniform float radius;
        uniform float time;
        uniform float mx;
        uniform float my;

        float rand(float n){
            return fract(sin(n) * 43758.5453123);
        }

        void main() {
            vec3 norm = normalize(normal);
            float phaseSin = 40.0*cos(mx*3.14)*cos((norm.x-norm.y/2.0+norm.z));
            float phaseCos = 40.0*sin(my*3.14)*cos((-norm.x/2.0+norm.y+norm.z));
            pos = (radius+0.1*rand(1.0)*sin(time + phaseSin)*cos(time + phaseCos)) * norm;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
        `;


    var fragmentShader = `#extension GL_OES_standard_derivatives : enable

        varying vec3 v;
        varying vec3 pos;
        uniform float time;
        uniform sampler2D texture;
        uniform float mx;
        uniform float my;
        float dProd;
        uniform vec3 highlight;
        uniform vec3 shadow;
        uniform vec3 light;
        float rand(float n)
        {
            return fract(sin(n) * 43758.5453123);
        }
        void main() {
            vec3 N = normalize( cross( dFdx( pos.xyz ), dFdy( pos.xyz ) ) );
            float level = max(0.0, pow(2.71,-0.1*distance(pos,light))*dot(normalize(N), normalize(light)));
            vec3 col = (highlight*level + (1.0-level)*shadow)/(level+1.0);
            gl_FragColor = vec4(col,1.0);
        }
        `;
    var fire = new THREE.TextureLoader().load("/images/texture.png");

    var uniforms = THREE.UniformsUtils.merge([
        THREE.UniformsLib["ambient"],
        THREE.UniformsLib["lights"], {
            time: { type: "f", value: 1.0 },
            texture: { type: "t", value: fire },
            radius: { type: "f", value: 1.0 },
            light: { type: "v3", value: [1.0,0.0,4.0]},
            highlight: { type: "v3", value: [1.0,0.0,0.0]},
            shadow: { type: "v3", value: [0.0,0.0,1.0]},
            mx: { type: "f", value: 0.0 },
            my: { type: "f", value: 0.0 }
        }
    ]);

    // Create the material that will be used to render each vertex of the geometry
    var particleMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    // Create the particle system
    particleSystem = new THREE.Mesh(icosa, particleMaterial);
    return particleSystem;
}
