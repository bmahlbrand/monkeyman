#pragma strict
var spawnPoints : Transform[];
var enemyPrefabs : GameObject[];

var yieldTimeMin = 2;
var yieldTimeMax = 5;

static var enemyCounter = 0;

var spawnXOffsetMin = 0;
var spawnXOffsetMax = 0;

var spawnZOffsetMin = 0;
var spawnZOffsetMax = 0;

var defaultSpawnNumber = 5;

var waveNumber = 1; 

var isSpawning = false;
//var other : enemyfollow;

function SpawnEnemies(wave: int){
	var spawnNum = (defaultSpawnNumber + 5*(wave-1));

	isSpawning = true;
		
	for(var i = 0; i < spawnNum;i++) {
		yield WaitForSeconds(Random.Range(yieldTimeMin, yieldTimeMax));
	
		var object : GameObject = enemyPrefabs[Random.Range(0, enemyPrefabs.Length)];
		var position : Transform = spawnPoints[Random.Range(0, spawnPoints.length)];
	
	Instantiate(object, position.position +
		Vector3(Random.Range(spawnXOffsetMin, spawnXOffsetMax), 0,
			Random.Range(spawnZOffsetMin, spawnZOffsetMax)), position.rotation);
			
		enemyCounter++;
	}
	
	isSpawning = false;
}

function UpdateWave() {
	waveNumber++;
	SpawnEnemies(waveNumber);

	//other.MoveSpeed = waveNumber * other.MoveSpeed;

}

function Start() {
	SpawnEnemies(waveNumber);
		GetComponent("enemyfollow") ;

//	other = gameObject.GetComponent("enemyfollow");
}

public function Update() {
	var enemyCounter : int = GameObject.FindGameObjectsWithTag("Enemy").Length;
	if(enemyCounter == 0 && !isSpawning) {
		UpdateWave();
	}
}

function OnGUI () {

    GUI.Label (Rect (25, 50, 200, 30), "Wave: "+ waveNumber.ToString());
	
}
