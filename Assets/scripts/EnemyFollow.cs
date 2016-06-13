using UnityEngine;
using System.Collections;




public class EnemyFollow : MonoBehaviour
{
	GameObject player;

	static int MoveSpeed = 4;
	
	int MaxDist = 10;
	int MinDist = 0;

	void Awake () {
		// Setting up the references.
		player = GameObject.FindGameObjectWithTag ("Player");
		//anim = GetComponent <Animator> ();
	}

	// Use this for initialization
	void Start ()
	{
	
	}
	
	// Update is called once per frame
	void Update ()
	{
		transform.LookAt(player.transform);
		
		if(Vector3.Distance(transform.position, player.transform.position) >= MinDist) {
			transform.position += transform.forward * MoveSpeed * Time.deltaTime;
			if(Vector3.Distance(transform.position, player.transform.position) <= MaxDist) {
				//Debug.Log("MoveSpeed");
			}
		}
	}
}

