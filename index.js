(function() {

    glUtils.SL.init({ callback: function() { main(); } });
  
    function main() {
      
      var canvas = document.getElementById("canvas");
      var gl = glUtils.checkWebGL(canvas);
  
      var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
      var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
      var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
  
      gl.useProgram(program);
  
      var cubeVertices = [];
  
      
      var cubePoints = [
        -0.8, -0.8,  0.5, -0.8,
         0.8, -0.5, -0.5, -0.5,
        -0.8, -0.8, -0.8,  0.5,
         0.5,  0.5,  0.8,  0.8,
        -0.5,  0.8, -0.8,  0.5,
         0.5,  0.5,  0.5, -0.8,
         0.8, -0.5,  0.8,  0.8,
        -0.5,  0.8, -0.5, -0.5
      ];
      
      var name = [
        0.4, 0.0, 0.4, 0.3, 0.3, 0.0,
        0.4, 0.3, 0.3, 0.3, 0.3, 0.0,
        0.3, 0.3, 0.3, 0.25, 0.0, 0.2,
        0.0, 0.2, 0.0, 0.15, 0.3, 0.25,
        0.0, 0.2, 0.0, 0.15, -0.3, 0.3,
        -0.3, 0.3, -0.3, 0.25, 0.0, 0.15,
        -0.3, 0.3, -0.4, 0.3, -0.3, 0.0,
        -0.3, 0.0, -0.4, 0.0, -0.4, 0.3
      ];

    //   function quad(a, b, c, d) {
    //     var indices = [a, b, c, a, c, d];
    //     for (var i = 0; i < indices.length; i++) {
    //       for (var j = 0; j < 3; j++) {
    //         cubeVertices.push(cubePoints[indices[i]][j]);
    //       }
    //       for (var j = 0; j < 3; j++) {
    //         cubeVertices.push(cubeColors[a][j]);
    //       }
    //     }
    //   }
    //   quad(1, 0, 3, 2);
    //   quad(2, 3, 7, 6);
    //   quad(3, 0, 4, 7);
    //   quad(4, 5, 6, 7);
    //   quad(5, 4, 0, 1);
    //   quad(6, 5, 1, 2);
  

      var cubeVBO = gl.createBuffer();
      var nameBuf = gl.createBuffer();  
 
      var vPosition = gl.getAttribLocation(program, 'vPosition');
    //   var vColor = gl.getAttribLocation(program, 'vColor');
      
      
    //   gl.vertexAttribPointer(
    //     vColor,
    //     3,
    //     gl.FLOAT,
    //     false,
    //     6 * Float32Array.BYTES_PER_ELEMENT,
    //     3 * Float32Array.BYTES_PER_ELEMENT
    //   );
      gl.enableVertexAttribArray(vPosition);
    //   gl.enableVertexAttribArray(vColor);

    var mmLoc = gl.getUniformLocation(program, 'modelMatrix');

    var theta = [0.15, 0.0, 0.0];
    var xAxis = 0;
    var yAxis = 0;
    var zAxis = 0;
  
  
      function render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        var mm = glMatrix.mat4.create();
        gl.uniformMatrix4fv(mmLoc, false, mm);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubePoints), gl.STATIC_DRAW);
        gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,2 * Float32Array.BYTES_PER_ELEMENT,0);
        gl.drawArrays(gl.LINE_STRIP, 0, 16);

        theta[xAxis] += 0;
        theta[yAxis] += 0.03;
        theta[zAxis] += 0;

        gl.bindBuffer(gl.ARRAY_BUFFER, nameBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(name), gl.STATIC_DRAW);
        gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,2 * Float32Array.BYTES_PER_ELEMENT,0);
        
        glMatrix.mat4.translate(mm, mm, [0.1, 0.1, 0.1]);
        // glMatrix.mat4.rotateZ(mm, mm, theta[zAxis]);
        glMatrix.mat4.rotateY(mm, mm, theta[yAxis]);
        // glMatrix.mat4.rotateX(mm, mm, theta[xAxis]);
        gl.uniformMatrix4fv(mmLoc, false, mm);
        gl.drawArrays(gl.TRIANGLES, 0, 24);

        requestAnimationFrame(render);
      }
  
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
      gl.enable(gl.DEPTH_TEST);
      render();

      
      
    }
  })();
  