(function(global) {

    var canvas1, canvas2, gl1, gl2,  program1, program2;
  
    glUtils.SL.init({ callback:function() { main(); } });
  
    function main() {
      
      //window.addEventListener('resize', resizer);
  
     
      canvas1 = document.getElementById("glcanvas1");
      canvas2 = document.getElementById("glcanvas2");
      gl1 = glUtils.checkWebGL(canvas1);
      gl2 = glUtils.checkWebGL(canvas2);
  
      
      var vertexShader1 = glUtils.getShader(gl1, gl1.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
      var vertexShader2 = glUtils.getShader(gl2, gl2.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
      var fragmentShader1 = glUtils.getShader(gl1, gl1.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
      var fragmentShader2 = glUtils.getShader(gl2, gl2.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
  
      program1 = glUtils.createProgram(gl1, vertexShader1, fragmentShader1);
      program2 = glUtils.createProgram(gl2, vertexShader2, fragmentShader2);
  
      gl1.useProgram(program1);
      gl2.useProgram(program2);

      var vertices1 = [
        0.8, 0.0, 0.8, 0.6, 0.6, 0.0,
        0.8, 0.6, 0.6, 0.6, 0.6, 0.0,
        0.6, 0.6, 0.6, 0.5, 0.0, 0.4,
        0.0, 0.4, 0.0, 0.3, 0.6, 0.5,
        0.0, 0.4, 0.0, 0.3, -0.6, 0.6,
        -0.6, 0.6, -0.6, 0.5, 0.0, 0.3,
        -0.6, 0.6, -0.8, 0.6, -0.6, 0.0,
        -0.6, 0.0, -0.8, 0.0, -0.8, 0.6
        // -0.8, 0.0,  
        // -0.8, 0.6,
        // -0.7, 0.6,
        // -0.6, 0.3,
        // -0.4, 0.6,
        // -0.3, 0.6,
        // -0.3, 0.0,
        // -0.4, 0.0,
        // -0.4, 0.5,
        // -0.6, 0.2,
        // -0.7, 0.5,
        // -0.7, 0.0,
        // -0.8, 0.0
      ];

      var vertices2 = [
        0.8, 0.0, 0.8, 0.6, 0.6, 0.0,
        0.8, 0.6, 0.6, 0.6, 0.6, 0.0,
        0.6, 0.6, 0.6, 0.5, 0.0, 0.4,
        0.0, 0.4, 0.0, 0.3, 0.6, 0.5,
        0.0, 0.4, 0.0, 0.3, -0.6, 0.6,
        -0.6, 0.6, -0.6, 0.5, 0.0, 0.3,
        -0.6, 0.6, -0.8, 0.6, -0.6, 0.0,
        -0.6, 0.0, -0.8, 0.0, -0.8, 0.6
      ];

      var vertexBufferObject1 = gl1.createBuffer();
      var vertexBufferObject2 = gl2.createBuffer();
      gl1.bindBuffer(gl1.ARRAY_BUFFER, vertexBufferObject1);
      gl2.bindBuffer(gl2.ARRAY_BUFFER, vertexBufferObject2);
      gl1.bufferData(gl1.ARRAY_BUFFER, new Float32Array(vertices1), gl1.STATIC_DRAW);
      gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(vertices2), gl2.STATIC_DRAW); 

      var vPosition1 = gl1.getAttribLocation(program1, 'vPosition1');
      var vPosition2 = gl2.getAttribLocation(program2, 'vPosition1');
      var vColor1 = gl1.getAttribLocation(program1, 'vColor');
      var vColor2 = gl2.getAttribLocation(program2, 'vColor');
      gl1.vertexAttribPointer(vPosition1, 2, gl1.FLOAT, gl1.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl2.vertexAttribPointer(vPosition2, 2, gl2.FLOAT, gl2.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl1.vertexAttribPointer(vColor1, 2, gl1.FLOAT, gl1.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 4 * Float32Array.BYTES_PER_ELEMENT);
      gl2.vertexAttribPointer(vColor2, 2, gl2.FLOAT, gl2.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 4 * Float32Array.BYTES_PER_ELEMENT);
      gl1.enableVertexAttribArray(vPosition1);
      gl2.enableVertexAttribArray(vPosition2);
      gl1.enableVertexAttribArray(vColor1);
      gl2.enableVertexAttribArray(vColor2);

      var thetaLocation = gl1.getUniformLocation(program1, 'theta');
      var theta = 0.0;

      var scaleXLocation = gl2.getUniformLocation(program2, 'scaleX');
      var scaleYLocation = gl2.getUniformLocation(program2, 'scaleY');
      var scaleX = 1.0;
      var scaleY = 1.0;
      var melebar = 1.0;
      
      function render(){
        gl1.clearColor(0.0, 0.0, 1.0, 1.0);
        gl2.clearColor(0.0, 1.0, 1.0, 1.0);
        gl1.clear(gl1.COLOR_BUFFER_BIT);
        gl2.clear(gl2.COLOR_BUFFER_BIT);

        theta += 0.0189;
        gl1.uniform1f(thetaLocation,theta);

        if(scaleX >= 1) melebar = -1;
        else if(scaleX <= -1) melebar = 1;
        scaleX += 0.0189 * melebar;
        gl2.uniform1f(scaleXLocation, scaleX);
        gl2.uniform1f(scaleYLocation, scaleY);

        gl1.drawArrays(gl1.TRIANGLES, 0, 24);
        gl2.drawArrays(gl2.TRIANGLES, 0, 24);
        requestAnimationFrame(render);
      }
      render();
    }
  
    
    // function draw() {
      
    //   var n1 = initBuffers1(gl1);
    //   var n2 = initBuffers2(gl2);
    //   if (n1 < 0 || n2 < 0) {
    //     console.log('Failed to set the positions of the vertices');
    //     return;
    //   }
      
    //   gl1.clearColor(0, 0, 1, 1);
    //   gl2.clearColor(0, 1, 1, 1);
    //   gl1.clear(gl1.COLOR_BUFFER_BIT);
    //   gl2.clear(gl2.COLOR_BUFFER_BIT);
  
    //   gl1.drawArrays(gl1.LINE_STRIP, 0, n1);
    //   gl2.drawArrays(gl2.TRIANGLES, 0, n2);
    // }
  
    // function initBuffers1() {
    //   // var vertices1 = new Float32Array([
    //   //   -0.8, 0.0,  
    //   //   -0.8, 0.6,
    //   //   -0.7, 0.6,
    //   //   -0.6, 0.3,
    //   //   -0.4, 0.6,
    //   //   -0.3, 0.6,
    //   //   -0.3, 0.0,
    //   //   -0.4, 0.0,
    //   //   -0.4, 0.5,
    //   //   -0.6, 0.2,
    //   //   -0.7, 0.5,
    //   //   -0.7, 0.0,
    //   //   -0.8, 0.0
    //   // ]);
      
    //   var n1 = 13;

    //   var vertexBuffer1 = gl1.createBuffer();
    //   if (!vertexBuffer1) {
    //     console.log('Failed to create the buffer object');
    //     return -1;
    //   }
  
    //   gl1.bindBuffer(gl1.ARRAY_BUFFER, vertexBuffer1);
      
    //   //if()
    //   gl1.bufferData(gl1.ARRAY_BUFFER, vertices1, gl1.STATIC_DRAW);
    //   //gl1.bufferData(gl1.ARRAY_BUFFER, vertices2, gl1.STATIC_DRAW);
    //   var aPosition1 = gl1.getAttribLocation(program1, 'aPosition1');

    //   gl1.vertexAttribPointer(aPosition1, 2, gl1.FLOAT, false, 0, 0);
      
    //   gl1.enableVertexAttribArray(aPosition1);

    //   return n1;
    // }

    // function initBuffers2() {

    //   // var vertices2 = new Float32Array([
    //   //   0.8, 0.0, 0.8, 0.6, 0.6, 0.0,
    //   //   0.8, 0.6, 0.6, 0.6, 0.6, 0.0,
    //   //   0.6, 0.6, 0.6, 0.5, 0.0, 0.4,
    //   //   0.0, 0.4, 0.0, 0.3, 0.6, 0.5,
    //   //   0.0, 0.4, 0.0, 0.3, -0.6, 0.6,
    //   //   -0.6, 0.6, -0.6, 0.5, 0.0, 0.3,
    //   //   -0.6, 0.6, -0.8, 0.6, -0.6, 0.0,
    //   //   -0.6, 0.0, -0.8, 0.0, -0.8, 0.6
    //   // ])

    //   var n2 = 24;

    //   var vertexBuffer = gl2.createBuffer();
    //   if (!vertexBuffer) {
    //     console.log('Failed to create the buffer object');
    //     return -1;
    //   }
  
    //   gl2.bindBuffer(gl2.ARRAY_BUFFER, vertexBuffer);
      
    //   //if()
    //   gl2.bufferData(gl2.ARRAY_BUFFER, vertices2, gl2.STATIC_DRAW);
    //   //gl1.bufferData(gl1.ARRAY_BUFFER, vertices2, gl1.STATIC_DRAW);
    //   var aPosition1 = gl2.getAttribLocation(program2, 'aPosition1');

    //   gl2.vertexAttribPointer(aPosition1, 2, gl2.FLOAT, false, 0, 0);
      
    //   gl2.enableVertexAttribArray(aPosition1);

    //   return n2;
    // }
    // /*function resizer() {
    //   canvas1.width = window.innerWidth;
    //   canvas1.height = window.innerHeight;
    //   gl1.viewport(0, 0, gl1.canvas.width, gl1.canvas.height);
    //   draw();
    // }*/
  
  })(window || this);