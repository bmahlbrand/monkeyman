var walkSpeed: float = 7; // regular speed
var crchSpeed: float = 3; // crouching speed
var runSpeed: float = 20; // run speed
var proneSpeed: float = 1; // prone speed

private var chMotor: CharacterMotor;
private var ch: CharacterController;
private var tr: Transform;
private var height: float; // initial height
 
function Start(){
    chMotor = GetComponent(CharacterMotor);
    tr = transform;
    ch = GetComponent(CharacterController);
	height = ch.height;
}
 
function Update(){
 
    var h = height;
    var speed = walkSpeed;
    Camera.main.fieldOfView=60;
    if (ch.isGrounded && Input.GetKey("left shift") || Input.GetKey("right shift")){
        speed = runSpeed;
    }
    if (Input.GetKey("c")){ // press C to crouch
        h = 0.5 * height;
        speed = crchSpeed; // slow down when crouching
    }
    if (Input.GetKey("z")){ // press left-control to go prone
    	h= 0.2*height;
    	speed=proneSpeed; // slow down when prone
    }
    if (Input.GetKey("x")){
    	speed=proneSpeed;
    	Camera.main.fieldOfView=15;
    	
    }
    chMotor.movement.maxForwardSpeed = speed; // set max speed
    var lastHeight = ch.height; // crouch/stand up smoothly 
    ch.height = Mathf.Lerp(ch.height, h, 5*Time.deltaTime);
    tr.position.y += (ch.height-lastHeight)/2; // fix vertical position
}