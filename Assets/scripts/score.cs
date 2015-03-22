using UnityEngine;
using System.Collections;

public class score : MonoBehaviour {
    public GUISkin guiSkin = null;
    public static int points = 0;
  	//public Spawner script;
   // void Example() {
   //     script = GetComponent("MasterSpawnScript") as ScriptName;
   //     script.waveNumber();
  //  }
	PlayerHealth playerHealth;                          // Reference to the player GameObject.
	GameObject player;

	void Awake() {
		player = GameObject.FindGameObjectWithTag ("Player");
		playerHealth = player.GetComponent <PlayerHealth> ();
	}

    void OnGUI() {
        GUI.skin = guiSkin;
        GUI.Label(new Rect(25, 25, 200f, 38.0f), points.ToString());
		//GUI.Label(new Rect(0.0f, 0.0f, 550.0f, 32.0f), MasterSpawnScript.ToString());
		
        GUI.skin = null;
		GUI.Label(new Rect(5, 5, 200f, 38.0f), "rounds: " + FPshoot.currentClip.ToString());
		GUI.Label(new Rect(5, 15, 200f, 38.0f), "clips: " +FPshoot.numClips.ToString());
		GUI.Label(new Rect(5, 25, 200f, 38.0f), playerHealth.currentHealth.ToString());
    }
}