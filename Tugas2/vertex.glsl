precision mediump float;
attribute vec2 vPosition1;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;
uniform float scaleX;
uniform float scaleY;

void main() {
  fColor = vColor;

  mat4 rotate = mat4(
    cos(theta), sin(theta), 0.0, 0.0,
    -sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  
  mat4 scale = mat4(
    scaleX, 0.0, 0.0, 0.0,
    0.0, scaleY, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0 , 1.0
  );
  //hanya bisa dijalankan satu-satu, scale sendiri dan rotate sendiri
  //gl_Position = scale * vec4(vPosition1, 0.0, 1.0);
   gl_Position = rotate * vec4(vPosition1, 0.0, 1.0);
}