using UnityEngine;
using System.Collections;

public class FPSWalkerWithLadders : MonoBehaviour {
	double speed;
	double jumpSpeed;
	double gravity;

	double walkSpeed;
	double crouchSpeed;
	double runSpeed;
	double proneSpeed;

	bool dead;

	private CharacterController ch;
	private Transform trans;
	private float height;
	private Vector3 moveDirection;
	bool grounded;

	private GameObject mainCamera;
	private CharacterController controller;
	private bool onLadder;

	float ladderHopSpeed;

	void Awake () {
		mainCamera = GameObject.FindWithTag ("MainCamera");
		controller = GetComponent<CharacterController>();
		height = controller.height;
	}

	void Update() {

		var speed = walkSpeed;
		Camera.main.fieldOfView=60;

		if (controller.isGrounded && Input.GetKey("left shift") || Input.GetKey("right shift")){
			speed = runSpeed;
		}

		if (Input.GetKey("c")){ // press C to crouch
			height = 0.5 * height;
			speed = crouchSpeed; // slow down when crouching
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

	void FixedUpdate() {

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

	void OnLadder () {
		onLadder = true;
		moveDirection = Vector3.zero;
	}

	void OffLadder (ladderMovement) {
		onLadder = false;

		// perform off-ladder hop
		var hop : Vector3 = mainCamera.transform.forward;
		hop = transform.TransformDirection(hop);
		moveDirection = (ladderMovement.normalized + hop.normalized) * ladderHopSpeed;
	}
	// ***

	@script RequireComponent(CharacterController)
}