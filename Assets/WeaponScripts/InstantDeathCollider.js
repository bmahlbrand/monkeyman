function OnTriggerEnter (col : Collider) {
	var player : FPSPlayer = col.GetComponent(FPSPlayer);
	
	if (player) {
		player.ApplyDamage(10000);
	} else if (col.GetComponent.<Rigidbody>()) {	
		Destroy(col.GetComponent.<Rigidbody>().gameObject);
	} else {
		Destroy(col.gameObject);
	}
}

function Reset () {
	if (GetComponent.<Collider>() == null)	
		gameObject.AddComponent(BoxCollider);
	GetComponent.<Collider>().isTrigger = true;
}