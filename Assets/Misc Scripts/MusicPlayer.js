// Plays back one of the audio choosing randomly between them.
var clips : AudioClip[] = new AudioClip[1];

function Start ()
{
	DontDestroyOnLoad(this);
	GetComponent.<AudioSource>().loop = false;
	while (true)
	{
		GetComponent.<AudioSource>().clip = clips[Random.Range(0, clips.length)];
		GetComponent.<AudioSource>().Play();	
		if (GetComponent.<AudioSource>().clip)
			yield WaitForSeconds(GetComponent.<AudioSource>().clip.length);
		else
			yield;
	}
}

@script RequireComponent(AudioSource)