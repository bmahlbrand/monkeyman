using UnityEngine;
using System.Collections;


public class killenemy : MonoBehaviour {
	public GameObject enemy;
	
	// Use this for initialization
	void Start () {
		GameObject.FindGameObjectsWithTag("Enemy");
	}
	
	// Update is called once per frame
	void Update (){
	
	}	
	void OnCollisionEnter(Collision collision) {
        
        if(collision.gameObject.tag == "Enemy")
					Destroy(collision.transform.parent.gameObject);
	
    }
}

//Destroy(hit.transform.parent.gameObject)