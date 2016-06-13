using UnityEngine;
using System.Collections;


public class EnemyAttack : MonoBehaviour {
	public float timeBetweenAttacks = 0.5f;     // The time in seconds between each attack.
	public int attackDamage = 10;               // The amount of health taken away per attack.
	
	//Animator anim;                              // Reference to the animator component.
	GameObject player;                          // Reference to the player GameObject.
	PlayerHealth playerHealth;                  // Reference to the player's health.
	EnemyHealth enemyHealth;                    // Reference to this enemy's health.
	bool playerInRange;                         // Whether player is within the trigger collider and can be attacked.
	float timer;                                // Timer for counting up to the next attack.
	int MaxDist = 10;
	int MinDist = 0;
	private LineRenderer laserShotLine;
	private Light laserShotLight; 
	public float flashIntensity = 3f;

	void Awake () {
		// Setting up the references.
		player = GameObject.FindGameObjectWithTag ("Player");
		playerHealth = player.GetComponent <PlayerHealth> ();
		enemyHealth = GetComponent<EnemyHealth>();
		//anim = GetComponent <Animator> ();
		laserShotLine = GetComponentInChildren<LineRenderer>();
		laserShotLine.enabled = false;
		laserShotLight = GetComponent<Light>();
		laserShotLight.intensity = 0f;

	}

	void OnTriggerEnter (Collider other) {
		// If the entering collider is the player...
		if(other.gameObject == player) {
			// ... the player is in range.
			playerInRange = true;
		}
	}

	void OnTriggerExit (Collider other) {
		// If the exiting collider is the player...
		if(other.gameObject == player) {
			// ... the player is no longer in range.
			playerInRange = false;
			laserShotLight.intensity = 0.0f;
			laserShotLine.enabled = false;
		}
	}
	
	void Update () {
		// Add the time since Update was last called to the timer.
		timer += Time.deltaTime;
		
		// If the timer exceeds the time between attacks, the player is in range and this enemy is alive...
		if(timer >= timeBetweenAttacks && inRange() && enemyHealth.currentHealth > 0) {
			// ... attack.
			Attack();
		}
		
		// If the player has zero or less health...
		if(playerHealth.currentHealth <= 0)	{
			// ... tell the animator the player is dead.
			//anim.SetTrigger ("PlayerDead");
		}
	}
	
	
	void Attack () {
		timer = 0f;

		if(playerHealth.currentHealth > 0) {
			playerHealth.TakeDamage (attackDamage);
		}

		// Set the initial position of the line renderer to the position of the muzzle.
		laserShotLine.SetPosition(0, laserShotLine.transform.position);
		
		// Set the end position of the player's centre of mass.
		laserShotLine.SetPosition(1, player.transform.position + Vector3.up * 1.5f);
		
		// Turn on the line renderer.
		laserShotLine.enabled = true;

		// Make the light flash.
		laserShotLight.intensity = flashIntensity;
	}

	bool inRange() {
		if(Vector3.Distance(transform.position,player.transform.position) >= MinDist){
			if(Vector3.Distance(transform.position,player.transform.position) <= MaxDist) {
				return true;
			}
		}
		return false;
	}
}