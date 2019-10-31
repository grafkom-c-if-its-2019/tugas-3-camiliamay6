precision mediump float;

attribute vec2 vPosition;
varying vec3 fColor;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 perspectiveMatrix;

void main() {
   fColor = vec3(1.0, 1.0, 1.0);
  
  gl_Position = modelMatrix * vec4(vPosition, 0.0, 1.0);
}
