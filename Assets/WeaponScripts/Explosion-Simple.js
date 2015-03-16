var explosionRadius = 5.0;
var explosionPower = 10.0;
var explosionDamage = 100.0;

var explosionTime = 1.0;

function Start () {
	
	var explosionPosition = transform.position;
	var colliders : Collider[] = Physics.OverlapSphere (explosionPosition, explosionRadius);
	
	for (var hit in colliders) {
		if (!hit)
			continue;
		
		if (hit.GetComponent.<Rigidbody>()) {
			hit.GetComponent.<Rigidbody>().AddExplosionForce(explosionPower, explosionPosition, explosionRadius, 3.0);
						
			var closestPoint = hit.GetComponent.<Rigidbody>().ClosestPointOnBounds(explosionPosition);
			var distance = Vector3.Distance(closestPoint, explosionPosition);

			// The hit points we apply fall decrease with distance from the hit point
    	    var hitPoints = 1.0 - Mathf.Clamp01(distance / explosionRadius);
			hitPoints *= explosionDamage;

			// Tell the rigidbody or any other script attached to the hit object 
			// how much damage is to be applied!
			hit.GetComponent.<Rigidbody>().SendMessageUpwards("ApplyDamage", hitPoints, SendMessageOptions.DontRequireReceiver);
		}
	}

    // stop emitting ?
    if (GetComponent.<ParticleEmitter>()) {
        GetComponent.<ParticleEmitter>().emit = true;
		yield WaitForSeconds(0.5);
		GetComponent.<ParticleEmitter>().emit = false;
    }
    
    // destroy the explosion
	Destroy (gameObject, explosionTime);
}