using UnityEngine;
using System.Collections;

public class FPshoot : MonoBehaviour {
	
	public GameObject bullet_prefab;
	float bulletImpulse = 300f;
	
	// Use this for initialization
	void Start() {
		GameObject.FindGameObjectsWithTag("Enemy");
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetButton("Fire1")) {
			RaycastHit hit;

			if (Physics.SphereCast(transform.position, 1.0f, Camera.main.transform.forward, out hit, 300f)) {
				if(hit.collider.CompareTag("Enemy")){
					Debug.Log("HIT");
					Destroy(hit.collider.gameObject);
				}
			}
			//GameObject thebullet = (GameObject)Instantiate(bullet_prefab, cam.transform.position + cam.transform.forward, cam.transform.rotation);
			//thebullet.GetComponent<Rigidbody>().AddForce( cam.transform.forward * bulletImpulse, ForceMode.Impulse);
		}
	}
}
