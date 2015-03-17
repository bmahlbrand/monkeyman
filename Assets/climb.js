 function OnTriggerEnter (other : Collider) { 
    if(other.gameObject.CompareTag("Ladder")) {
    	print("getting on ladder");	
        transform.GetComponent(CharacterController).slopeLimit = 100; 
        transform.GetComponent("CharacterMotor").sliding.enabled = false;
    }
} 
 
function OnTriggerExit (other : Collider) { 
    if(other.gameObject.CompareTag("Ladder")) {
        print("leaving ladder");
        transform.GetComponent(CharacterController).slopeLimit = 45; 
        transform.GetComponent("CharacterMotor").sliding.enabled = true;
    }
}