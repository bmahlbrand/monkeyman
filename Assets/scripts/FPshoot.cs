using UnityEngine;
using System.Collections;

public class FPshoot : MonoBehaviour {
	
	public GameObject bullet_prefab;
	float bulletImpulse = 300f;
	float shootCD;
	float FireRate = .5f;

	public int maxClipSize;
	public static int currentClip;

	public int maxClips;
	public static int numClips;

	float reloadCD;
	float reloadRate = 3f;

	void Start() {
		GameObject.FindGameObjectsWithTag("Enemy");
		currentClip = maxClipSize;
		numClips = maxClips;
	}

	void Update () {
		shootCD += Time.deltaTime;
		if(shootCD > FireRate) {

			if(Input.GetButton("Fire1") && currentClip > 0) {
				fire();
				//GameObject thebullet = (GameObject)Instantiate(bullet_prefab, cam.transform.position + cam.transform.forward, cam.transform.rotation);
				//thebullet.GetComponent<Rigidbody>().AddForce( cam.transform.forward * bulletImpulse, ForceMode.Impulse);
			}
		}

		reloadCD += Time.deltaTime;
		if (reloadCD > reloadRate) {

			if (Input.GetKey ("r") && numClips > 0 && currentClip != maxClipSize) {
				reload();
			}
		}
	}
	
	void fire() {
		RaycastHit hit;
		shootCD = 0;
		currentClip--;
		if (Physics.SphereCast(transform.position, 1.0f, Camera.main.transform.forward, out hit, 300f)) {
			if(hit.collider.CompareTag("Enemy")){
				Debug.Log("HIT");
				Destroy(hit.collider.gameObject);
			}
		}
	}

	void reload() {
		reloadCD = 0;
		currentClip = maxClipSize;
		numClips--;
	}
}
