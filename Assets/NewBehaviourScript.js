#pragma strict
var charController:CharacterController ;
/* Create a variable of type CharacterController to store
our component and call it in the script                */
var walkSpeed : float = 1 ;
var runSpeed : float = 1.8 ;
var rotationSpeed : float = 250 ;
var jumpForceDefault : float = 2 ;
var cooldown : float = 5 ;
 
private var jumpForce : float;
private var gravityPull : float = 1;
/* Jump action related costants                         */
 
 
private var isRunning : boolean ;
private var isWalking : boolean ;
private var isStrafing : boolean ;
private var isJumping : boolean ;
private var isAttacking : boolean ;
private var isIdle : boolean ;
/* Create boolean status variables to identify animation
status, e.g. what am i doing right now?               */
 
function Start (){
var cc : CharacterController;
cc = gameObject.AddComponent.<CharacterController>();
/*  Adds a Character Controller component to gameobject */
 
charController = GetComponent(CharacterController);
/*    Assigns it in the charController variable to use it */
 
// Set all animations to loop
GetComponent.<Animation>().wrapMode = WrapMode.Loop;
// except shooting
GetComponent.<Animation>()["attack"].wrapMode = WrapMode.Once;
 
// Put idle and walk into lower layers (The default layer is always 0)
// This will do two things
// - Since shoot and idle/walk are in different layers they will not affect
//   each other's plyback when calling CrossFade.
// - Since shoot is in a higher layer, the animation will replace idle/walk
//   animations when faded in.
GetComponent.<Animation>()["attack"].layer = 1;
 
// Stop animations that are already playing
//(In case user forgot to disable play automatically)
GetComponent.<Animation>().Stop();
 
 
}
 
 
 
function Update(){
 
charController.Move(transform.up * Time.deltaTime * -gravityPull * 1);
 
/* Gravity */
 
if(Input.GetAxis("Vertical") > 0){
/*    If the Vertical input axis is positive (by default by
pressing W or up arrow)                                */
if(Input.GetButton("Run")){
isRunning = true ;
GetComponent.<Animation>().CrossFade("run");
/*    While Run button is pressed play run animation, with
Crossfade try to blend nicely different animations )*/
charController.Move(transform.forward*Time.deltaTime*runSpeed)    ;
/*    While Run button is pressed move faster !)          */
/*    Use the Move function, Time.deltatime makes things go
equally fast on different hardware configurations,
by moving in the forward direction with walkspeed   */
isRunning = true ;
/* Set the isRunning flag as true since i am running    */
Debug.Log("isRunning value is" + " " + isRunning);
/*  Tell me what i am doing now                         */
}
else{
isWalking = true ;
/* Else if i am moving forward and not running i walk   */
GetComponent.<Animation>()["walk"].speed = 1;
GetComponent.<Animation>().CrossFade("walk");
/*    While walk button is pressed play walk animation ! */
charController.Move(transform.forward*Time.deltaTime*walkSpeed)    ;
Debug.Log("isWalking value is" + " " + isWalking);
/*  Tell me what i am doing now                         */
}
}
else if(Input.GetAxis("Vertical") < 0){
isWalking = true ;
/* Do the same for the back direction, no back run!    */
GetComponent.<Animation>()["walk"].speed = 0.5;
/* revert walk animation playback                        */
GetComponent.<Animation>().CrossFade("walk");
charController.Move(transform.forward*Time.deltaTime*-walkSpeed/2)    ;
/* Move function but in the opposite to forward
direction by using a negative (-) vector            */
Debug.Log("isWalking value is" + " " + isWalking);
/*  Tell me what i am doing now                        */
}
else{
isWalking = false ;
isRunning = false ;
/* if not running or walking set these states as false */
}
 
if(Input.GetButtonDown("Jump") && !isJumping){
jumpForce = jumpForceDefault ;
isJumping = true ;
GetComponent.<Animation>().Play("jump_pose") ;
/* Capture Jump input and prevent double air jump with
&& !isJumping, makes these lines working only while
not already in a Jump.                               */
}
 
if(isJumping){
charController.Move(transform.up * Time.deltaTime * jumpForce);
jumpForce -= gravityPull ;
Debug.Log("isJumping value is" + " " + isJumping);
/* If isJumping is true (i am in Jump state), move the
character up with jumpForce intensty, then gravityPull
kicks in and will take you on the ground.          */
if(charController.isGrounded){
isJumping = false ;
/* Check if the character is touching the ground with
Unity default isGrounded function, if its grounded
end the Jumping action by setting isJumping false  */
}
}
 
if(!isWalking && !isRunning && !isJumping){
GetComponent.<Animation>().CrossFade("idle");
/* If i am not doing any action , play the idle anim   */
 
}
 
if(Input.GetAxis("Horizontal") > 0){
charController.transform.Rotate(Vector3.up * Time.deltaTime * 20 *  rotationSpeed, Space.World);
}
if(Input.GetAxis("Horizontal") < 0){
charController.transform.Rotate(Vector3.up * Time.deltaTime * 20 * -rotationSpeed);
 
}
/* rotate the character with left and right    arrows */
 
 
charController.transform.rotation.y += Input.GetAxis("Mouse X") * Time.deltaTime * rotationSpeed ;
/* rotate the character with the mouse                 */
 
if(Input.GetButtonDown("Fire1")){
isAttacking = true ;
slash() ;
isAttacking = false ;
}
/* Play attack animation calling slash function */
 
/* If you wish to add STRAFE command just replicate the
code for the forward and back direction , i am not
doing this in this character controller tutorial
because the Constructor model is not provided
with the strafe animation. */
 
}
 
function slash(){
GetComponent.<Animation>().CrossFade("attack");
Debug.Log("isAttacking is" + isAttacking);
}