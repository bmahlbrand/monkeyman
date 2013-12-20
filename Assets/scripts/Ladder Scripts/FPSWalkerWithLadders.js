var speed = 6.0;
var jumpSpeed = 8.0;
var gravity = 20.0;

var walkSpeed: float = 7; // regular speed
var crchSpeed: float = 3; // crouching speed
var runSpeed: float = 20; // run speed
var proneSpeed: float = 1; // prone speed

private var ch: CharacterController;
private var tr: Transform;
private var height: float; // initial height
private var moveDirection = Vector3.zero;
private var grounded : boolean = false;

// *** Added for UseLadder ***
private var mainCamera : GameObject = null;
private var controller : CharacterController = null;
private var onLadder = false;
var ladderHopSpeed = 6.0;

function Start () {
	mainCamera = GameObject.FindWithTag("MainCamera");
	controller = GetComponent(CharacterController);
	height = controller.height;
}

function FixedUpdate() {
	
	// *** Added for UseLadder ***
	// If we are on the ladder, let the ladder code take over and handle FixedUpdate calls.
	if(onLadder) {
		gameObject.SendMessage("LadderFixedUpdate", null, SendMessageOptions.RequireReceiver);
		return;
	}
	// ***
	
	if (grounded) {
		// We are grounded, so recalculate movedirection directly from axes
		moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
		
		if (Input.GetButton ("Jump")) {
			moveDirection.y = jumpSpeed;
		}
	}

	// Apply gravity
	moveDirection.y -= gravity * Time.deltaTime;
	
	// Move the controller
	var flags = controller.Move(moveDirection * Time.deltaTime);
	grounded = (flags & CollisionFlags.CollidedBelow) != 0;
	
	
}

function Update () {
var h = height;
    var speed = walkSpeed;
    Camera.main.fieldOfView=60;
    
    if (controller.isGrounded && Input.GetKey("left shift") || Input.GetKey("right shift")){
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
}
// *** Added for UseLadder ***
function OnLadder () {
	onLadder = true;
	moveDirection = Vector3.zero;
}

function OffLadder (ladderMovement) {
	onLadder = false;
	
	// perform off-ladder hop
	var hop : Vector3 = mainCamera.transform.forward;
	hop = transform.TransformDirection(hop);
	moveDirection = (ladderMovement.normalized + hop.normalized) * ladderHopSpeed;
}
// ***

@script RequireComponent(CharacterController)